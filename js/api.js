const apiUrl = "https://api.github.com/users/"
const token = "?access_token=28e1b122e11bf388b06cb2f1de48ef08a35ad4ed"
const clientId = "?client_id=Iv1.36a8efb3d3ac27e4"
const clientSecret = "&client_secret=d15717f5df744d208a63c31bf174f16e580978a4"
const clientAuth = clientId + clientSecret
// fetchers: fazendo requisiçoes a api e retornando .json dos endpoints

// pegando as informações do perfil do usuário. ex: nome, email, avatar
const fetchUser = user => {
    let endpoint = `${apiUrl}${user}${token}` // chamando a api
    let data = fetch(endpoint).then(res => res.json()) // guardando a informação em um json         
    return data                  
}
// informações sobre os repositórios do usuário. ex: nome, url das linguagens usadas nele
const fetchRepo = user => {
    let endpoint = `${apiUrl}${user}/repos${token}`
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
    // css
    const cssFilter = res.filter(value => value.CSS != undefined)
    let cssReduce = 0
    if (cssFilter.length > 0) {
        const cssMap = cssFilter.map(value => value.CSS)
        cssReduce = cssMap.reduce((total, value) => total + value, 0)
        //console.log(cssFilter, cssMap, cssReduce)
    }
    else
        console.log('nada em Css')        
    // html
    const htmlFilter = res.filter(value => value.HTML != undefined)
    let htmlReduce = 0
    if(htmlFilter.length > 0) {
        const htmlMap = htmlFilter.map(value => value.HTML)
        htmlReduce = htmlMap.reduce((total, value) => total + value, 0)
        //console.log(htmlFilter, htmlMap, htmlReduce)
    }
    else
        console.log('nada em html')
    // js
    const jsFilter = res.filter(value => value.JavaScript != undefined)
    let jsReduce = 0
    if(cssFilter.length > 0) {
        const jsMap = jsFilter.map(value => value.JavaScript)
        jsReduce = jsMap.reduce((total, value) => total + value, 0)
        //console.log(jsFilter, jsMap, jsReduce)        
    }
    else
        console.log('nada em Js')
    // python    
    const pyFilter = res.filter(value => value.Python != undefined)
    let pyReduce = 0
    if(pyFilter.length > 0) {        
        const pyMap = pyFilter.map(value => value.Python)
        pyReduce = pyMap.reduce((total, value) => total + value, 0)
        //console.log(pythonFilter, pythonMap, pythonR
    }
    else
        console.log('nada em python')
    // php
    const phpFilter = res.filter(value => value.PHP != undefined)
    let phpReduce = 0
    if(phpFilter.length > 0) {    
        const phpMap = phpFilter.map(value => value.PHP)
        phpReduce = phpMap.reduce((total, value) => total + value, 0)
        //console.log(phpFilter, phpMap, phpReduce)    
    }
    else
        console.log('nada em Php')
    // c
    const cFilter = res.filter(value => value.C != undefined)
    let cReduce = 0
    if(cFilter.length > 0) {        
        const cMap = cFilter.map(value => value.C)
        cReduce = cMap.reduce((total, value) => total + value, 0)
        //console.log(cFilter, cMap, cReduce)
    }
    else
        console.log('nada em C')
    // java
    const javaFilter = res.filter(value => value.java != undefined)
    let javaReduce = 0
    console.log(javaFilter)
    if (javaFilter.length > 0) {
        const javaMap =  javaFilter.map(value => value.java)
        javaReduce =  javaMap.reduce((total, value) => total + value, 0)
    }
    else
        console.log('nada em java')
    // exibindo os resultados    
    console.log(`${cssReduce}\n${htmlReduce}\n${jsReduce}\n${pyReduce}\n${phpReduce}\n${cReduce}\n${javaReduce}`)    
}