import { fetchUser, fetchRepo, fetchLang, langSum, langPercent } from './api'
import '../css/main.css'
import '../css/reset.css'

const showData = () => {    
    fetchUser( $('.search__user').val() ).then(user => { // usuário
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
                    console.log(langResult)
                    console.log(langPercent(langResult))                                          
                })                
            })
            
        })   
    })           
}   

$('.search__user').keyup( (event) => {
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

if ($('.first').css('display') != 'none')
    $('.s1').toggleClass('toggler-focus')
    $('.c1').css('background-color', 'rgba(34,34,51,1)')

//searchBtn.addEventListener("click", () => { showData() })

$('.fa-bars').click( () => {
    $('.nav-dev').toggleClass('nav-dev-toggle')
})

$('.header__logotype h5').click( () => {
    $('.first').show()
    $('.second').hide()
})

$('.header__menu').click( () => {
    $('.first').hide()
    $('.second').show()
})

$('.yes').click( () => {
    $('.second__check').hide()
    $('.second__search').show()
})

$('.check__toggler').click( () => {
    let a = $('.toggler__circle').css('margin-left')
    let b = a.length
    let c = b - 2
    let d = a.slice(0, c)
    /*console.log(b, c, d)
    console.log($('.toggler__circle').css('animation-play-state'))

    if ($('.toggler__circle').css('animation-play-state') == 'paused'){
        $('.toggler__circle').removeClass('fluid__two')
        $('.toggler__circle').css('animation-play-state', 'running')
        $('.fluid__two').css('animation-play-state', 'paused')
    }
    else {
        $('.toggler__circle').toggleClass('fluid__two')
        $('.fluid__two').css('animation-play-state', 'running')
        $('.fluid__two').removeClass('toggler__circle')
    }*/

    if (d < 0) {
        $('.toggler__circle').removeClass('fluid__two')
        $('.toggler__circle').css('animation-play-state', 'running')
        $('.fluid__two').css('animation-play-state', 'paused')
        $('.check__circle').css('border-color', 'rgba(83, 223, 144, 0.2)')
        $('.fa-check').css('color', 'rgba(83, 223, 144, 0.2)')
        $('.fa-times').css('color', 'rgba(13,13,13,1)')
    }
    else {
        $('.fluid__two').removeClass('.toggler__circle')
        $('.toggler__circle').toggleClass('fluid__two')
        $('.fluid__two').css('animation-play-state', 'running')
        $('.check__circle').css('border-color', 'rgba(194, 10, 17, 0.2)')
        $('.fa-times').css('color', 'rgba(194, 10, 17, 1)')
        $('.fa-check').css('color', 'rgba(13,13,13,1)')        
    }
    //alert($('.toggler__circle').css('margin-left'))
    //$('.toggler__circle').toggleClass('fluid__two')*/
})

/*for (let i = 1; i < 9; i++)
    $('.container').append(`<span class="bg-dash d${i}"></span>`)

/*for (let i = 0; i < 13; i++){
    if (i % 4 == 0)
        $('.footer__dashes').append(`<li class="dashes__long"></li>`)
    else
        $('.footer__dashes').append(`<li class="dashes__short"></li>`)
}


https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
Make like a tree, leaves

<button class="check__toggler">
    <i class="fas fa-times"></i>
    <i class="fas fa-check"></i>
    <div class="toggler__circle"></div>
</button>
<i class="fas fa-check-double"></i>
}


*/