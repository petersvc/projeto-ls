import { fetchUser, fetchRepo, fetchLang, langSum } from './api'
import '../css/main.css'
import '../css/bootstrap.min.css'

const userInput = $('.user-input')
//const searchBtn = document.querySelector(".searchButton")
const homeRow = $('.home-row')
const homeFooter = $('.home-footer')
const midRow = $('.mid-row')
const navBottom = $('.nav-bottom')
const footerView = $('.footer-view')
const footer = $('.footer')
const nameContainer = $('.git-name')
const companyContainer = $('.git-company')
const locationContainer = $('.git-location')
const avatarContainer = $('.avatar')
const langsContainer = $('.lang-ul')
const menuImg = $('.fa-bars')
const menuUl = $('.nav-dev')


const showData = () => {
    fetchUser( userInput.val() ).then(user => { // usuário
        avatarContainer.attr('src', user.avatar_url)  // imagem do usuário
        nameContainer.html(user.name)

        if (user.bio == null) 
            companyContainer.html('Garoto(a) de Programa') 
        else
            companyContainer.html(user.bio)
         
        if (user.location == null)
            locationContainer.html(`<i class="fas fa-map-marker-alt mr-1"></i>Nárnia`)
        else        
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

/*const midRow = $('.mid-row')
const navBottom = $('.nav-bottom')
const footerView = $('.footer-view')
const footer = $('.footer')*/

$(userInput).keyup( (event) => {
    if (event.key == 'Enter'){
        $(homeRow).hide()
        $(homeFooter).hide()
        $(midRow).show()
        $(navBottom).show()
        $(footerView).show()
        $(footer).show()
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
