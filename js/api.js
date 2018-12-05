const apiUrl = "https://api.github.com/users/" // url da api do github
const token = "" // necessário para fazer mais de 60 requisições/hora

// fetchers: fazem requisiçoes a api e retornam jsons

const fetchUser = async user => { // função que extrai os dados do ${user}. Ex: user.name
    const endpoint = apiUrl + user + token // guarda a url que contém os dados. Ex: ...github.com/users/${user}          
    return await fetch(endpoint).then(user => user.json()) // requisita os dados e os retorna extraídos em um .json                 
}

const fetchRepo = async repos_url => { // ...extrai os dados dos repositórios (repos) do ${user}
    const endpoint = repos_url + token // ...Ex: ...com/users/user/${repos_url}
    return await fetch(endpoint).then(repos => repos.json()) 
}

const fetchLang = async validsRepos => { // ... extrai as informações das urls das linguagens
    let jsons = [] // guarda os jsons extraídos das urls
    let langsUrls = validsRepos.map(repo => repo.languages_url) // guarda as urls que contém os dados
    for (url of langsUrls) { // percorre as urls
        let json = await fetch(url + token).then(langs => langs.json()) // requista os dados, extrai em um .json e o guarda  
        jsons.push(json) // insere o .json no array de jsons
    }
    return jsons
}

const langSum = async langsJsons => { // funçao que soma a quantidade de linhas/palavras escritas em cada linguagem
    let langsNames = []
    let langFilter = []
    let langMap = []
    let langReduce = 0
    let langResult = '' // armazenas <li>s com o nome e o total de bytes escritos de cada linguagem

    langsJsons.map(lang => { // percorre o array de jsons das linguagens
        for (langName in lang){ // percorre os nomes (propriedade) das linguagens deles           
            if (langsNames.join('').includes(langName) == false) // transforma o array dos nomes das linguagens... -> 
                langsNames.push(langName)                        // ...em uma string, checa se o nome não existe nela e o insere       
        }        
    })

    langsNames.map(langName => { // percorre o array dos nomes das linguagens encontradas
        langFilter = langsJsons.filter(value => value[langName] != undefined) // filtra os jsons que contém a linguagem
         
        if (langFilter.length > 0){ // checa se existe mais que um array que contém a linguagem
            langMap =  langFilter.map(value => value[langName]) // percorre os filtrados e retorna a qtde de bytes escritos na linguagem
            langReduce =  langMap.reduce((total, value) => total + value, 0) // soma os bytes de todos os filtrados
            langResult += `<li class="list-inline-item">${langName}<span class="badge ml-1">${langReduce}</span></li>`
        }
    })
    return langResult // retorna as <li>
}