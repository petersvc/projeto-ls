const apiUrl = "https://api.github.com/users/"
const token = "?access_token=28e1b122e11bf388b06cb2f1de48ef08a35ad4ed"

// fetchers: fazendo requisiçoes a api e retornando .json dos endpoints

// pegando as informações do perfil do usuário. ex: nome, email, avatar
const fetchUser = user => {
    let endpoint = `${apiUrl}${user}${token}` // chamando a api
    let json = fetch(endpoint).then(user => user.json()) // guardando a informação em um json         
    return json                  
}
// informações sobre os repositórios do usuário. ex: nome, url das linguagens usadas nele
const fetchRepo = user => {
    let endpoint = `${apiUrl}${user}/repos${token}`
    let json = fetch(endpoint).then(repos => repos.json())
    return json
}
// linguagens usadas no repositórios
const fetchLang = async langsUrls => { // endpoints é um array com as urls das linguagens, obtido na fetchRepo()
    let jsons = [] // array que conterá os JSONs obitidos com as urls
    for (url of langsUrls) {
        let json = await fetch(url).then(langs => langs.json())
        jsons.push(json)
    }
    return jsons
}
// Somando a quantidade de linhas/palavras escritas em cada linguagem
const langCalc = async langs => {    
    let langsNames = []
    let langFilter = []
    let langMap = []
    let langReduce = 0
    let langResult = ''

    langs.map(lang => {
        for (langName in lang){            
            if (langsNames.join('').includes(langName) == false)
                langsNames.push(langName)              
        }        
    })
     
    langsNames.map(langName => {
        langFilter = langs.filter(value => value[langName] != undefined)
        if (langFilter.length > 0){
            langMap =  langFilter.map(value => value[langName])
            langReduce =  langMap.reduce((total, value) => total + value, 0)
            langResult += `<li class="list-inline-item">${langName}<span class="badge ml-1">${langReduce}</span></li>`
        }
        //console.log(langName, langReduce)
    })
    return langResult
}