import { fetchUser, fetchRepo, fetchLang, drm } from './api'
import { langSum, langArray, numberSort, letterSort, shortByte, langAcronym } from './aux'
import { tk } from '../../token'
import '../css/main.css'
import '../css/reset.css'
import '../css/media_queries.css'

drm().then(drm => {
    //console.log(drm[0]['basic css'][1].name)
    let a = drm.map(r => {
        for (let p in r){
            r[p].map(r2 => {
                console.log(p + ': ' + r2.name + '\n')
            })
        }
    })
    
  
})


const showData = () => {
    let token = '' // necessário para fazer mais de 60 requisições/hora 
    if (typeof tk == 'function')
        token = tk()
   
    fetchUser($('.search__name').val(), token).then(user => { // usuário
        $('.row__avatar').attr('src', user.avatar_url)  // imagem do usuário

        if (user.name != null)
            $('.row__value').html(user.name)
        else
            $('.row__value').html(user.login)
        
        fetchRepo(user.repos_url, token).then(repos => { // respositórios
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)

            $('.git-nav__repos .item-number').html(`[${repos.length}]`)
            
            fetchLang(validsRepos, token).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem                    
                    $('.graph__item').remove()
                    //$('.rank__percent').remove()
                    
                    const langSortLetter = langResult.slice(0).sort(letterSort)
                    const la = langArray(langSortLetter)

                    let sb = 0
                    let divId = ''
                    //let graphDataWidth = document.getElementById('graph__data').offsetWidth
                    let graphDataWidth = document.getElementById('lang__graph').offsetWidth
                    let langPosition = 0
                    let marginAdjust = 0
                    let sizeId = ''
                    let rankCount = 1

                    la.map(langIndex => {
                        if (langIndex[2] > 0) {
                            sb = shortByte(langIndex[1])

                            let acro = langAcronym(langIndex[0])

                            divId = `lang__size-${langIndex[0]}`
                            
                           

                            $('.lang__graph').append(
                                `<div class="graph__item">
                                <div class="item__circle"  id="${divId}"></div>
                                    <h2 class="item__name" title="${langIndex[0]}">${acro}</h2>
                                </div>`
                            )
                            
                            
                            langPosition = (graphDataWidth * langIndex[2] / 90)                            
                            sizeId = document.getElementById(divId)
                            marginAdjust = graphDataWidth - langPosition

                            /*if (marginAdjust < (graphDataWidth * 10) / 100)
                                sizeId.style.marginLeft = (langPosition - marginAdjust) + "px"
                            else*/
                                sizeId.style.marginLeft = langPosition + "px"
                                
                            /*
                            $('.graph__rank').append(
                                `<div class="rank__percent">
                                    <h2 class="percent__circle">${rankCount}.</h2>
                                    <h2 class="percent_lang" title="${langIndex[0]}">${acro}:</h2>
                                    <h2 class="percent__number">${sb}</h2>
                                </div>`
                            )*/
                            rankCount++
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

for (let i = 0; i < 0; i++){
    $('.stats__separator').append(`<div class="graph__separator" id="separator${i}"></div>`)
}

for (let i = 0; i < 350; i++){
    $('.pattern').append(`<div class="pattern__block" id="block${i}">.</div>`)
}

if ($('.content__intro').css('display') != 'none'){
    $(document).bind('wheel', () => {
        $('.content__home').hide(0)
        $('.header').css('display', 'grid')
        //$('.content__repositories').css('display', 'flex')
        $('.content__lang,.content__roadmap').css('display', 'grid')
        //$('.footer').css('display', 'grid')
        //$('.nav').css('display', 'flex')
        $('.corner,.pat,.home__scrolltip').hide()
    });
}


/*


*/
 

/*
https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
Make like a tree and leave
*/