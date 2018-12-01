let css = 0 
let html = 0
let js = 0

// fetchers: fazendo requisiçoes a api e retornando .json dos endpoints

// pegando as informações do perfil do usuário. ex: nome, email, avatar
const fetchUser = user => {
    let endpoint = `https://api.github.com/users/${user}` // chamando a api
    let data = fetch(endpoint).then(res => res.json()) // guardando a informação em um json         
    return data                  
}
// informações sobre os repositórios do usuário. ex: nome, url das linguagens usadas nele
const fetchRepo = user => {
    let endpoint = `https://api.github.com/users/${user}/repos`
    let data = fetch(endpoint).then(res => res.json()) 
    return data
}
// linguagens usadas no repositórios
const fetchLang = async endpoints => { // endpoints é um array com as urls das linguagens, obtido na fetchRepo()
    let data = [] // array que conterá os JSONs obitidos com as urls
    let tempFetch
    for (url of endpoints) {
        tempFetch = await fetch(url).then(res => res.json())
        data.push(tempFetch)
    }
    return data
}
// Somando a quantidade de linhas/palavras escritas em cada linguagem
const langCalc = res => {
    /* python
    let pyFilter = res.filter(value => value.Python != undefined)
    let pyMap = pyFilter.map(value => value.Python)
    let pyReduce = pyMap.reduce((total, value) => total + value)
    console.log(pyMap, pyReduce) */

    // css
    let cssFilter = res.filter(value => value.CSS != undefined)
    let cssMap = cssFilter.map(value => value.CSS)
    let cssReduce = cssMap.reduce((total, value) => total + value)
    let cssTotal = 'Css: ' + cssReduce
    console.log(cssTotal)
    //console.log(cssFilter, cssMap, cssReduce)

    // html
    let htmlFilter = res.filter(value => value.HTML != undefined)
    let htmlMap = htmlFilter.map(value => value.HTML)
    let htmlReduce = htmlMap.reduce((total, value) => total + value)
    let htmlTotal = 'Html: ' + htmlReduce
    console.log(htmlTotal)
    //console.log(htmlFilter, htmlMap, htmlReduce)

    // js
    let jsFilter = res.filter(value => value.JavaScript != undefined)
    let jsMap = jsFilter.map(value => value.JavaScript)
    let jsReduce = jsMap.reduce((total, value) => total + value)
    let jsTotal = 'Js: ' + jsReduce
    console.log(jsTotal)
    //console.log(jsFilter, jsMap, jsReduce)

}