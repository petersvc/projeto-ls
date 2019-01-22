import { fetchUser, fetchRepo, fetchLang} from './api'
import { langSum, langArray, numberSort, letterSort} from './aux'
import { shortByte, langAcronym, drm, legendFix } from './aux'
import { tk } from '../../token'
import '../css/main.css'
import '../css/reset.css'
import '../css/media_queries.css'

drm().then(drm => {
    //console.log(drm['basic-html'])
    let count = 0
    let fieldsetClass = ''
    let checkMarkClass = ''
    let legend = ''
    let propName = ''
    
    for (let group in drm){
        //console.log(group)
        legend = legendFix(group)

        console.log(legend + ':')

        if (count < 5) {
            $('.fieldset__legends1').append(`
                <div class="legends__row legends__${group}">
                    <div class="row__circle"></div>
                    <h2 class="row__title">${legend}<br><span>${drm[group].length} technologies</span></h2>
                    <h2 class="row__category">${drm[group][0].category}</h2>
                </div>`)
        }

        else if(count < 10) {
            $('.fieldset__legends2').append(`
                <div class="legends__row legends__${group}">
                    <div class="row__circle"></div>
                    <h2 class="row__title">${legend}<br><span>${drm[group].length} technologies</span></h2>
                    <h2 class="row__category">${drm[group][0].category}</h2>
                </div>`)
        }

        else {
            $('.fieldset__legends3').append(`
                <div class="legends__row legends__${group}">
                    <div class="row__circle"></div>
                    <h2 class="row__title">${legend}<br><span>${drm[group].length} technologies</span></h2>
                    <h2 class="row__category">${drm[group][0].category}</h2>
                </div>`)
        }

        fieldsetClass = `.fieldset__${group}`    
    
        $('.roadmap__form').prepend(`
            <fieldset class="form__fieldset fieldset__${group}"></fieldset>`)
        
        drm[group].map(prop => {
            propName = legendFix(prop.name)
            checkMarkClass = `.cm__${prop.name}`

            $(fieldsetClass).append(`
            <label class="fieldset__label label__${prop.name}">
                <input class="cb__${prop.name}" type="checkbox" name="${prop.status}">
                <span class="checkmark cm__${prop.name}"></span>
                <h2 class="label__title">${propName}</h2>
            </label>`)

            if (prop.status == 'recommended')
                $(checkMarkClass).addClass('recommended')
            else
                $(checkMarkClass).addClass('available')

        })

        count ++
    }
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