export { fetchUser, fetchRepo, fetchLang }

const apiUrl = 'https://api.github.com/users/' // url da api do github

// fetchers: fazem requisiçoes a api e retornam jsons

const fetchUser = async (user, token) => { // função que extrai os dados do ${user}. Ex: user.name
    const endpoint = apiUrl + user + '?' // guarda a url que contém os dados. Ex: ...github.com/users/${user}          
    return await fetch(endpoint  + token).then(user => user.json()) // requisita os dados e os retorna extraídos em um .json                 
}

const fetchRepo = async (repos_url, public_repos, token) => { // ...extrai os dados dos repositórios (repos) do ${user}
    let endpoints = []
    let repoJsonsTemp = []
    let repoJsons = []
    let count = 0
    let loaderCalc = 0 

    if (public_repos > 100){
        for (let i = 0; i < public_repos/100; i++) {
            endpoints.push(repos_url + `?per_page=100&page=${1+i}&`)
        }
    }
    else {
        endpoints.push(repos_url + '?per_page=100&page=1&')
    }

    for (let endpoint of endpoints) {
        let repoJson = await fetch(endpoint + token).then(repos => repos.json())
        repoJsonsTemp.push(repoJson)
        loaderCalc = (count * 100) / (endpoints.length - 1)
        $('.bottom__repos .loader__number').html(loaderCalc.toFixed(0))
        count++
    }

    for (let array of repoJsonsTemp){
        for (let index of array){
            repoJsons.push(index)
        }
    }
    //console.log(repoJsonsTemp)
    //console.log(repoJsons)
    $('bottom__repos .loader').hide(0)
    return repoJsons 
}

const fetchLang = async (validsRepos, token) => { // ... extrai as informações das urls das linguagens
    let jsons = [] // guarda os jsons extraídos das urls
    let langsUrls = validsRepos.map(repo => repo.languages_url) // guarda as urls que contém os dados
    let count = 0
    let loaderCalc = 0
    for (let url of langsUrls) { // percorre as urls
        let json = await fetch(url + '?' + token).then(langs => langs.json()) // requista os dados, extrai em um .json e o guarda  
        jsons.push(json) // insere o .json no array de jsons
        loaderCalc = (count * 100) / (langsUrls.length - 1)
        $('.loader__number').html(loaderCalc.toFixed(0))
        count++
    }

    $('.loader').hide(0)
    return jsons
}





//<br>Quais tecnologias o web developer<br> deve dominar em 2018?