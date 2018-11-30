const searchInput = document.querySelector("#name")
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".git-name")
const companyContainer = document.querySelector(".git-company")
const locationContainer = document.querySelector(".git-location")
const avatarContainer = document.querySelector(".avatar")

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
const fetchLang = async lang => {
    let endpoint = await lang // array com as urls das linguagens, obtido na fetchRepo()
    let data = await [] // array que conterá as linguaguens de cada repositório
    for (let url of endpoint) {
        fetch(url)
            .then(res => res.json())
            .then(res => data.push(res)) // inserindo o json de cada url de linguagens em um indice do array                           
    }
    return data
}
// callbacks de usuário, repositórios e linguagens
const showData = () => {
    fetchUser(searchInput.value).then(res => { // usuário
        let need = res.name + res.bio + res.company
        avatarContainer.src = `${res.avatar_url}`
        nameContainer.innerHTML = `${res.name}`

        if (res.bio == null) 
            companyContainer.innerHTML = res.company
        else
            companyContainer.innerHTML = res.bio

        locationContainer.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${res.location}`        
    })
    // repositórios e linguagens
    fetchRepo(searchInput.value) // repositórios
        .then(res => {
            let repo_name = res.map(repo => repo.name)
            let lang = res.map(names => names.languages_url)
            // linguagens 
            fetchLang(lang).then(res => {
                console.log(lang, res)
            })             
        })
        
        
    }   

document.addEventListener("keyup", (event) => {
    if (event.key == 'Enter')
        showData()
})
/*searchBtn.addEventListener("click", () => {
    showData()
})*/

//https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
//Make like a tree, leaves