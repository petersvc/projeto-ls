export { fetchUser, fetchRepo, fetchLang, langSum, langPercent }

const apiUrl = 'https://api.github.com/users/' // url da api do github
const token = '?access_token=28e1b122e11bf388b06cb2f1de48ef08a35ad4ed' // necessário para fazer mais de 60 requisições/hora

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
    for (let url of langsUrls) { // percorre as urls
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
    let langTotal = 0
    //let langResult = '' // armazenas <li>s com o nome e o total de bytes escritos de cada linguagem
    let langResult = []

    langsJsons.map(lang => { // percorre o array de jsons das linguagens
        for (let langName in lang){ // percorre os nomes (propriedade) das linguagens deles           
            if (langsNames.join('').includes(langName) == false) // transforma o array dos nomes das linguagens... -> 
                langsNames.push(langName)                        // ...em uma string, checa se o nome não existe nela e o insere       
        }        
    })
    
    langsNames.map(langName => { // percorre o array dos nomes das linguagens encontradas
        langFilter = langsJsons.filter(value => value[langName] != undefined) // filtra os jsons que contém a linguagem 
        if (langFilter.length > 0){ // checa se existe um ou mais arrays que contém a linguagem
            langMap =  langFilter.map(value => value[langName]) // percorre os filtrados e retorna a qtde de bytes escritos na linguagem
            langReduce =  langMap.reduce((total, value) => total + value, 0) // soma os bytes da lang filtrada
            langTotal += langReduce // acumula os bytes de todas as langs
            langResult.push([langName, langReduce]) // insere no array [linguagem, bytes]           
        }        
    })
    langResult.push(langTotal)
    return langResult // retorna [linguagem, bytes] e o total de bytes no ultimo indice
}

const langPercent = langResult => { // Calcula a porcentagem de cada linguagem
    let percent = [] // guarda [linguagem, porcentagem]
    let calc = 0
    langResult.map(langArray => {
        calc = langArray[1] * 100 / langResult[langResult.length - 1] // [bytes] *100 / [ultimo indice]
        percent.push([langArray[0], Math.round(calc)]) // insere [linguagem, porcentagem] e arredonda
    })
    percent.pop() // remove o indce que guarda os bytes totais
    return percent
}