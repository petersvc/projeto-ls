import { fetchUser, fetchRepo, fetchLang } from './api'
import { langSum, langArray, numberSort, stringSort, shortByte, langAcronym } from './aux'
import '../css/main.css'
import '../css/reset.css'

const showData = () => {    
    fetchUser( $('.search__name').val() ).then(user => { // usuário
        $('.user__avatar').attr('src', user.avatar_url)  // imagem do usuário
        $('.user__name').html(user.name)
        $('.info__bio').html(user.bio)
        $('.info__local').html(user.location)
        $('.info__company').html(user.company)
        $('.info__email').html(user.email)

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
                    $('.data__lang').remove()
                    $('.rank__percent').remove()
                    
                    const langSortNumber = langResult.slice(0).sort(numberSort)
                    const langSortString = langResult.slice(0).sort(stringSort)

                    const la = langArray(langSortNumber)

                    let sb = 0
                    let divId = ''
                    let graphDataWidth = document.getElementById('graph__data').offsetWidth
                    let sizeWidth = 0
                    let sizeId = ''

                    la.map(langIndex => {
                        if (langIndex[2] > 0) {
                            sb = shortByte(langIndex[1])
                            divId = `lang__size-${langIndex[0]}`
                            $('.graph__data').append(
                                `<div class="data__lang"">
                                    <h2 class="lang__name" title="${langIndex[0]}">${langIndex[0]}</h2>
                                    <div class="lang__start"></div>
                                    <div class="lang__size" id="${divId}"></div>
                                    <h3 class="lang__byte">${sb}kb</h3>
                                </div>`
                            )
                            sizeWidth = graphDataWidth * langIndex[2] / 100
                            
                            sizeId = document.getElementById(divId)
                            sizeId.style.width = sizeWidth + "px"

                            $('.graph__rank').append(
                                `<div class="rank__percent">
                                    <div class="percent__circle"></div>
                                    <h3 class="percent_lang">${langIndex[0]}:</h3>
                                    <h3 class="percent__number">${langIndex[2]}%</h3>
                                </div>`
                            )
                        }
                    })                               
                })                
            })
            
        })   
    })           
}   

$('.search__name').keyup( (event) => {
    if (event.key == 'Enter'){
        showData()
    }
})

//searchBtn.addEventListener("click", () => { showData() })

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

for (let i = 0; i < 5; i++){
    $('.stats__separator').append(`<div class="graph__separator" id="separator${i}"></div>`)
}

/*
for (let i = 0; i < 64; i++) {
    if (i % 6 == 0)
        $('.first__dots').append(`<div class="dots__dot dot-green" id="dot${i}"><i class="fas fa-square"></i></div>`)
    else if (i % 5 == 0)
        $('.first__dots').append(`<div class="dots__dot" id="dot${i}"><i class="fas fa-square"></i></div>`)
    else if (i % 4 == 0)
        $('.first__dots').append(`<div class="dots__dot" id="dot${i}"><i class="fas fa-square"></i></div>`)
    else
        $('.first__dots').append(`<div class="dots__dot dot-red" id="dot${i}"><i class="fas fa-circle"></i></div>`)

}
*/

var mouse = {'x': 0, 'y': 0};

let homex
let homey
let forcex
let forcey
let magnet
let position
let x0 
let y0 
let x1 
let y1 
let distancex
let distancey
let distance
let powerx 
let powery
        

homex = 0;
homey = 0;
forcex = 0;
forcey = 0;
magnet = 500;

$(document).bind('mousemove', function(e) {
    mouse = {'x': e.pageX, 'y': e.pageY};
});


$('.dots__dot').each(function(index, el){
    $(el).data('homex', parseInt($(el).position().left));
    $(el).data('homey', parseInt($(el).position().top));
});

$('.dots__dot').css('position','absolute');

setInterval(function () {
    $('.dots__dot').each(function(index, el){
        el = $(el);
        position = el.position();
        x0 = el.offset().left;
        y0 = el.offset().top;
        x1 = mouse.x;
        y1 = mouse.y;
        distancex = x1-x0;
        distancey = y1-y0;

        distance = Math.sqrt((distancex * distancex) + (distancey * distancey));
        
        
        magnet = 2600 - distance*20;
        if(distance>130) {
           magnet=0; 
        }
        
        
        powerx = x0 - (distancex / distance) * magnet / distance;
        powery = y0 - (distancey / distance) * magnet / distance;
        
        forcex = (forcex + (el.data('homex') - x0) / 2) / 2.1;
        forcey = (forcey + (el.data('homey') - y0) / 2) / 2.1;
                    

        el.css('left', powerx + forcex);
        el.css('top',  powery + forcey);
    });
}, 15);

/*
https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
Make like a tree and leave
*/