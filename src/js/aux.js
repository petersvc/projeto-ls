export { langSum, langArray, numberSort, stringSort, shortByte, langAcronym }


const langSum = async langsJsons => { // funçao que soma a quantidade de linhas/palavras escritas em cada linguagem
    let langsNames = []
    let langFilter = []
    let langMap = []
    let langReduce = 0
    let langTotal = 0
    let langResult = []

    langsJsons.map(lang => { // percorre o array de jsons das linguagens
        for (let langName in lang){ // percorre os nomes (propriedade) das linguagens deles           
            if (langsNames.join('').includes(langName) == false){
                langsNames.push(langName)
                
            } // transforma o array dos nomes das linguagens... -> 
                                        // ...em uma string, checa se o nome não existe nela e o insere       
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

const langArray = langResult => { // Calcula a porcentagem de cada linguagem
    let la = [] // guarda [linguagem, porcentagem]
    let calcPercent = 0
    langResult.map(langIndex => {
        calcPercent = percentCalc(langIndex[1], langResult[langResult.length - 1])
        la.push([langIndex[0], langIndex[1], Math.round(calcPercent)]) // insere [linguagem, porcentagem] e arredonda        
    })
    la.pop() // remove o indice que guarda os bytes totais
    let la2 = la.slice(0)
    console.log(la)
    console.log(la2)
    let a = langAcronym(la2)
    return la
}

const percentCalc = (langByte, total) => {
    let calc = 0
    calc = langByte * 100 / total // [bytes] *100 / [ultimo indice]
    return calc
}

const langAcronym = laArray => {
    let newArray = []
    newArray = laArray.map(laIndex => {

        if (laIndex[0] === 'JavaScript')
            laIndex[0] = 'JS'

        else if (laIndex[0] === 'Python')
            laIndex[0] = 'Py'

        else if (laIndex[0] === 'PostScript')
            laIndex[0] = 'PS'

        else if (laIndex[0] === 'CoffeeScript')
            laIndex[0] = 'CS'

        else if (laIndex[0] === 'Processing')
            laIndex[0] = 'Proc.'
        
        else
            laIndex[0] = laIndex[0]

    })
}

 const numberSort = (a, b) => {
    if (a[1] > b[1])
        return -1;
    if (a[1] < b[1])
        return 1;
    return 0;
}

const stringSort = (a, b) => {
    if (a[0] < b[0])
        return -1;
    if (a[0] > b[0])
        return 1;
    return 0;
}

const shortByte = bytes => {
    let shortBytes = 0

    if (bytes > 99999){
        shortBytes = (bytes / 1048576).toFixed(2)
        shortBytes += 'mb'
    }
    else if (bytes > 999){
        shortBytes = Math.round(bytes / 1024)
        shortBytes += 'kb'
    }
    else {
        shortBytes = Math.round(bytes)
        shortBytes += 'B'
    }

    return shortBytes
}
