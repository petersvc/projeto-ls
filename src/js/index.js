import { fetchUser, fetchRepo, fetchLang, langSum } from './api'
import '../css/main.css'
import '../css/bootstrap.min.css'

//const searchBtn = document.querySelector(".searchButton")

const showData = () => {
    fetchUser( $('.user-input').val() ).then(user => { // usuário
        $('.avatar').attr('src', user.avatar_url)  // imagem do usuário
        $('.git-name').html(user.name)

        if (user.bio == null) 
            $('.git-company').html('Garoto(a) de Programa') 
        else
            $('.git-company').html(user.bio)
         
        if (user.location == null)
            $('.git-location').html(`<i class="fas fa-map-marker-alt mr-1"></i>Nárnia`)
        else        
            $('.git-location').html(`<i class="fas fa-map-marker-alt mr-1"></i>${user.location}`)
        
        fetchRepo(user.repos_url).then(repos => { // respositórios
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)
            console.log(`Repos: ${repos.length}\nNo forkeds: ${noForkeds.length}`)
            console.log(`Forkeds: ${forkeds}\nValids: ${validsRepos.length}`)
            
            fetchLang(validsRepos).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem 
                    $('.lang-ul').append(langResult) // insere as <li>s no html                       
                })                
            })
        })   
    })           
}   

/*const midRow = $('.mid-row')
const navBottom = $('.nav-bottom')
const footerView = $('.footer-view')
const footer = $('.footer')*/

$('.user-input').keyup( (event) => {
    if (event.key == 'Enter'){
        $('.home-row').hide()
        $('.home-footer').hide()
        $('.mid-row').show()
        $('.nav-bottom').show()
        $('.footer-view').show()
        $('.footer').show()
        $('.lang-ul').html('')
        showData()
    }
})
//searchBtn.addEventListener("click", () => { showData() })

$('.fa-bars').click( () => {
    $('.nav-dev').toggleClass('nav-dev-toggle')
})


//https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
//Make like a tree, leaves
