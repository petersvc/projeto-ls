const searchInput = document.querySelector(".name")
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".git-name")
const companyContainer = document.querySelector(".git-company")
const locationContainer = document.querySelector(".git-location")
const avatarContainer = document.querySelector(".avatar")
const langsContainer = document.querySelector('.lang-ul')
const menuImg = document.querySelector(".fa-bars")
const menuUl = document.querySelector(".nav-dev")

// callbacks de usuário, repositórios e linguagens
const showData = () => {
    fetchUser(searchInput.value).then(user => { // usuário
        avatarContainer.src = `${user.avatar_url}`
        nameContainer.innerHTML = `${user.name}`

        if (user.bio == null) 
            companyContainer.innerHTML = user.company
        else
            companyContainer.innerHTML = user.bio

        locationContainer.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${user.location}`        
    })
    // repositórios e linguagens
    fetchRepo(searchInput.value).then(repos => { // respositórios
        const totalRepos = repos.length;
        const noForkeds = repos.filter(repo => repo.fork != true)
        const forkeds = totalRepos - noForkeds.length      
        const langsUrls = noForkeds
                            .filter(lang => lang.language !== null)
                            .map(repo => repo.languages_url + token)
        const valids = langsUrls.length
        console.log(`Repos: ${totalRepos}\nOwns ${noForkeds.length}\nForkeds: ${forkeds}\nValids: ${valids}`)

        fetchLang(langsUrls).then(langs => { // linguagens
            langCalc(langs).then(langResult => { // calcula quantos bytes forom escrito em cada linguagem 
                langsContainer.insertAdjacentHTML("beforeend", `${langResult}`) 
                    
            })                
        })
    })        
}   

document.addEventListener("keyup", (event) => {
    if (event.key == 'Enter'){
        showData()
        langsContainer.innerHTML = ''
        langResult = ''
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