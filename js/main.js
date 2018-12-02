const searchInput = document.querySelector(".name")
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".git-name")
const companyContainer = document.querySelector(".git-company")
const locationContainer = document.querySelector(".git-location")
const avatarContainer = document.querySelector(".avatar")
const menuImg = document.querySelector(".fa-bars")
const menuUl = document.querySelector(".nav-dev")

// callbacks de usuário, repositórios e linguagens
const showData = () => {
    fetchUser(searchInput.value).then(res => { // usuário
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
            let langs = res.map(names => names.languages_url + token)
            //console.log(langs)
            // linguagens 
            fetchLang(langs)
                .then(res => {
                    langCalc(res)                
            })
        })        
    }   

document.addEventListener("keyup", (event) => {
    if (event.key == 'Enter'){
        showData()
        //searchInput.style.display = "none"
    }
})
/*searchBtn.addEventListener("click", () => {
    showData()
})*/

menuImg.addEventListener("click", () => {
    menuUl.classList.toggle("nav-dev-toggle")
})



//https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
//Make like a tree, leaves