import { fetchUser, fetchRepo, fetchLang, langSum } from './api'
import '../css/main.css'
import '../css/bootstrap.min.css'

const searchInput = $('.name')
//const searchBtn = document.querySelector(".searchButton")
const nameContainer = $('.git-name')
const companyContainer = $('.git-company')
const locationContainer = $('.git-location')
const avatarContainer = $('.avatar')
const langsContainer = $('.lang-ul')
const menuImg = $('.fa-bars')
const menuUl = $('.nav-dev')


const showData = () => {
    fetchUser( searchInput.val() ).then(user => { // usuário
        avatarContainer.attr('src', user.avatar_url)  // imagem do usuário
        nameContainer.html(user.name)

        if (user.bio == null) 
            companyContainer.html(user.company) 
        else
            companyContainer.html(user.bio) 

        locationContainer.html(`<i class="fas fa-map-marker-alt mr-1"></i>${user.location}`)
        
        fetchRepo(user.repos_url).then(repos => { // respositórios
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)
            console.log(`Repos: ${repos.length}\nNo forkeds: ${noForkeds.length}`)
            console.log(`Forkeds: ${forkeds}\nValids: ${validsRepos.length}`)
            
            fetchLang(validsRepos).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem 
                    langsContainer.append(langResult) // insere as <li>s no html                       
                })                
            })
        })   
    })           
}   

$(document).keyup( (event) => {
    if (event.key == 'Enter'){
        langsContainer.html('')
        showData()
    }
})
//searchBtn.addEventListener("click", () => { showData() })

$(menuImg).click( () => {
    $(menuUl).toggleClass('nav-dev-toggle')
})


//https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
//Make like a tree, leaves