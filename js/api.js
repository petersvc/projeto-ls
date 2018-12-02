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
    if(cssFilter.length > 0) {
        const cssMap = cssFilter.map(value => value.CSS)
        const cssReduce = cssMap.reduce((total, value) => total + value, 0)
        const cssTotal = 'Css: ' + cssReduce
        console.log(cssTotal)
        //console.log(cssFilter, cssMap, cssReduce)
    }
    else
        console.log('nada em Css')
    
    // html
    const htmlFilter = res.filter(value => value.HTML != undefined)
    if(htmlFilter.length > 0) {
        const htmlMap = htmlFilter.map(value => value.HTML)
        const htmlReduce = htmlMap.reduce((total, value) => total + value, 0)
        const htmlTotal = 'Html: ' + htmlReduce
        console.log(htmlTotal)
        //console.log(htmlFilter, htmlMap, htmlReduce)
    }
    else
        console.log('nada em html')

    // js
    const jsFilter = res.filter(value => value.JavaScript != undefined)
    if(cssFilter.length > 0) {
        const jsMap = jsFilter.map(value => value.JavaScript)
        const jsReduce = jsMap.reduce((total, value) => total + value, 0)
        const jsTotal = 'Js: ' + jsReduce
        console.log(jsTotal)
        //console.log(jsFilter, jsMap, jsReduce)        
    }
    else
        console.log('nada em Js')// python
    
    const pythonFilter = res.filter(value => value.Python != undefined)
    if(pythonFilter.length > 0) {        
        const pythonMap = pythonFilter.map(value => value.Python)
        const pythonReduce = pythonMap.reduce((total, value) => total + value, 0)
        const pythonTotal = 'python: ' + pythonReduce
        console.log(pythonTotal)
        //console.log(pythonFilter, pythonMap, pythonR
    }
    else
        console.log('nada em python')

    // php
    const phpFilter = res.filter(value => value.PHP != undefined)
    if(phpFilter.length > 0) {    
        const phpMap = phpFilter.map(value => value.PHP)
        const phpReduce = phpMap.reduce((total, value) => total + value, 0)
        const phpTotal = 'php: ' + phpReduce
        console.log(phpTotal)
        //console.log(phpFilter, phpMap, phpReduce)    
    }
    else
        console.log('nada em Php')   // c
    // c
    const cFilter = res.filter(value => value.C != undefined)
    if(cFilter.length > 0) {        
        const cMap = cFilter.map(value => value.C)
        const cReduce = cMap.reduce((total, value) => total + value, 0)
        const cTotal = 'c: ' + cReduce
        console.log(cTotal)
        //console.log(cFilter, cMap, cReduce)
    }
    else
        console.log('nada em C')
    // java
    const javaFilter = res.filter(value => value.java != undefined)
    console.log(javaFilter)
    if (javaFilter.length > 0) {
        const javaMap =  javaFilter.map(value => value.java)
        const javaReduce =  javaMap.reduce((total, value) => total + value, 0)
        const javaTotal = 'java: ' +  javaReduce
        console.log(javaTotal)
    }
    else
        console.log('nada em java')
    // exibindo os resultados    
    //console.log(`${cssTotal}\n${htmlTotal}\n${jsTotal}\n${pythonTotal}\n${phpTotal}\n${cTotal}`)
    
}