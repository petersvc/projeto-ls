const searchInput = document.querySelector("#name")
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".git-name")
const companyContainer = document.querySelector(".git-company")
const locationContainer = document.querySelector(".git-location")
const avatarContainer = document.querySelector(".avatar")


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
            //let repos = res.map(repo => repo.name)
            let langs = res.map(names => names.languages_url)
            // linguagens 
            fetchLang(langs)
                .then(res => {
                    langCalc(res)
                
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