const searchInput = document.querySelector('.name')
const searchBtn = document.querySelector(".searchButton")
const nameContainer = document.querySelector(".git-name")
const companyContainer = document.querySelector(".git-company")
const locationContainer = document.querySelector(".git-location")
const avatarContainer = document.querySelector(".avatar")
const langsContainer = document.querySelector('.lang-ul')
const menuImg = document.querySelector(".fa-bars")
const menuUl = document.querySelector(".nav-dev")
import { fetchUser, fetchRepo, fetchLang, langSum } from './api'

const showData = () => {
    fetchUser(searchInput.value).then(user => { // usuário
        avatarContainer.src = user.avatar_url // imagem do usuário
        nameContainer.innerHTML = user.name

        if (user.bio == null) 
            companyContainer.innerHTML = user.company
        else
            companyContainer.innerHTML = user.bio

        locationContainer.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${user.location}`
        
        fetchRepo(user.repos_url).then(repos => { // respositórios
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)
            console.log(`Repos: ${repos.length}\nNo forkeds: ${noForkeds.length}`)
            console.log(`Forkeds: ${forkeds}\nValids: ${validsRepos.length}`)
            
            fetchLang(validsRepos).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem 
                    langsContainer.insertAdjacentHTML("beforeend", langResult) // insere as <li>s no html                       
                })                
            })
        })   
    })           
}   

document.addEventListener("keyup", (event) => {
    if (event.key == 'Enter'){
        langsContainer.innerHTML = ''
        showData()
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