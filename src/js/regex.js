//Placa de carro que reconheça: abc 1234, abc1234, ABC1234, 
//e rejeite 1234, 1234abc;

// [0-9] = \d

let regex = /^[a-z]{3}\s?[0-9]{4}$/i
let test = 'abc 1219'

let regex2 = /abc\s?1234/i
let test2 = 'ABC 1234'

let regexOctal = /^0o?[0-7]{1,3}$/i
let testOctal = '0999'

let regexBinary = /^[0-1]b?[0-1]{3,4}$/i
let testBinary = 'b1010'

let regexHex = /^#[f0]{3,8}$/i
let testHex = '#FF00FF'

let regexCnpj = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/i
let regexCnpj2 = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{2}\d{3}\d{3}\d{4}\d{2}$/i
let testCnpj = '00000000000100'
console.log(testCnpj.search(regexCnpj2))

let text = '58310-000'

let count = {}

count.values = 2
count.count = 5

console.log(count)