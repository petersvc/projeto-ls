import { fetchUser, fetchRepo, fetchLang } from './api'
import { langSum, langArray, numberSort, stringSort, shortByte, langAcronym } from './aux'
import { tk } from '../../token'
import '../css/main.css'
import '../css/reset.css'
import '../css/media_queries.css'

const showData = () => {
    let token = '' // necessário para fazer mais de 60 requisições/hora 
    if (typeof tk == 'function')
        token = tk()
   
    fetchUser($('.search__name').val(), token).then(user => { // usuário
        $('.user__avatar').attr('src', user.avatar_url)  // imagem do usuário

        if (user.name != null)
            $('.user__name').html(user.name)
        else
            $('.user__name').html(user.login)
        
        fetchRepo(user.repos_url, token).then(repos => { // respositórios
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)
            
            fetchLang(validsRepos, token).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem                    
                    $('.data__lang').remove()
                    $('.rank__percent').remove()
                    
                    const langSortNumber = langResult.slice(0).sort(numberSort)
                    const la = langArray(langSortNumber)

                    let sb = 0
                    let divId = ''
                    let graphDataWidth = document.getElementById('graph__data').offsetWidth
                    let sizeWidth = 0
                    let sizeId = ''
                    let rankCount = 1

                    la.map(langIndex => {
                        if (langIndex[2] > 0) {
                            sb = shortByte(langIndex[1])

                            let acro = langAcronym(langIndex[0])

                            divId = `lang__size-${langIndex[0]}`

                            $('.graph__data').append(
                                `<div class="data__lang"">
                                    <h2 class="lang__name" title="${langIndex[0]}">${acro}</h2>
                                    <div class="lang__start"></div>
                                    <div class="lang__size" id="${divId}"></div>
                                    <h2 class="lang__byte">${langIndex[2]}%</h2>
                                </div>`
                            )

                            sizeWidth = graphDataWidth * langIndex[2] / 100                            
                            sizeId = document.getElementById(divId)
                            sizeId.style.width = sizeWidth + "px"

                            $('.graph__rank').append(
                                `<div class="rank__percent">
                                    <h2 class="percent__circle">${rankCount}.</h2>
                                    <h2 class="percent_lang" title="${langIndex[0]}">${acro}:</h2>
                                    <h2 class="percent__number">${sb}</h2>
                                </div>`
                            )
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

$('.nav-area').append(`<div class="nav-corner n-top-left"></div>  
<div class="nav-corner n-top-right"></div>  
<div class="nav-corner n-bottom-left"></div>  
<div class="nav-corner n-bottom-right"></div>
<h1 class="item-number">[00x]</h1>`)

if ($('.content__intro').css('display') != 'none'){
    $(document).bind('wheel', () => {
        $('.content__intro').hide(0)
        $('.header').css('display', 'grid')
        //$('.content__search').css('display', 'flex')
        $('.content__stats').css('display', 'grid')
        //$('.footer').css('display', 'grid')
        $('.corner,.pat').hide()
    });
}


/*


*/
 

/*
https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
Make like a tree and leave
*/