export { fetchUser, fetchRepo, fetchLang }

const apiUrl = 'https://api.github.com/users/' // url da api do github

// fetchers: fazem requisiçoes a api e retornam jsons

const fetchUser = async (user, token) => { // função que extrai os dados do ${user}. Ex: user.name
    const endpoint = apiUrl + user + token // guarda a url que contém os dados. Ex: ...github.com/users/${user}          
    return await fetch(endpoint).then(user => user.json()) // requisita os dados e os retorna extraídos em um .json                 
}

const fetchRepo = async (repos_url, token) => { // ...extrai os dados dos repositórios (repos) do ${user}
    const endpoint = repos_url + token // ...Ex: ...com/users/user/${repos_url}
    return await fetch(endpoint).then(repos => repos.json()) 
}

const fetchLang = async (validsRepos, token) => { // ... extrai as informações das urls das linguagens
    let jsons = [] // guarda os jsons extraídos das urls
    let langsUrls = validsRepos.map(repo => repo.languages_url) // guarda as urls que contém os dados
    for (let url of langsUrls) { // percorre as urls
        let json = await fetch(url + token).then(langs => langs.json()) // requista os dados, extrai em um .json e o guarda  
        jsons.push(json) // insere o .json no array de jsons
    }
    $('.loader').hide(0)
    return jsons
}





//<br>Quais tecnologias o web developer<br> deve dominar em 2018?