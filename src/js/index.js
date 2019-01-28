import { fetchUser, fetchRepo, fetchLang} from './api'
import { langSum, langArray, numberSort, letterSort, teamData} from './aux'
import { shortByte, langAcronym, drm, legendFix } from './aux'
import { tk } from '../../token'
import '../css/main.css'
import '../css/reset.css'
import '../css/media_queries.css'
import { parse } from 'path';

teamData()
/*drm().then(drm => {
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
                    <h2 class="row__title">
                        ${legend}<br>
                        <span>${drm[group].length} technologies</span><br>
                        <span class="row__category">${drm[group][0].category}</span>
                    </h2> 
                    <div class="row__circle"></div>
                </div>`)
        }

        else if(count < 10) {
            $('.fieldset__legends2').append(`
                <div class="legends__row legends__${group}">
                    <h2 class="row__title">
                        ${legend}<br>
                        <span>${drm[group].length} technologies</span><br>
                        <span class="row__category">${drm[group][0].category}</span>
                    </h2> 
                    <div class="row__circle"></div>
                </div>`)
        }

        else {
            $('.fieldset__legends3').append(`
                <div class="legends__row legends__${group}">
                    <h2 class="row__title">
                        ${legend}<br>
                        <span>${drm[group].length} technologies</span><br>
                        <span class="row__category">${drm[group][0].category}</span>
                    </h2>                    
                    <div class="row__circle"></div>
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
})*/

const showData = () => {
    let token = '' // necessário para fazer mais de 60 requisições/hora 
    if (typeof tk == 'function')
        token = tk()
    
    $('.loader').css('display', 'flex')
    
    fetchUser($('.search__name').val(), token).then(user => { // usuário

        if (user.login != null){
            $('.row__avatar').remove()
            $('.row__value').html(user.name)
            $('.expanded__location').html(`${user.location} <i class="fas fa-map-marker-alt"></i>`)
            $('.expanded__company').html(`${user.company} <i class="fas fa-building"></i>`)
            $('.expanded__email').html(`${user.email} <i class="fas fa-envelope"></i>`)
            $('.expanded__github').html(`${user.html_url} <i class="fab fa-github"></i>`)
            console.log(user)
            $('.img__alt').hide(0)
            $('.user__img').append(`
                <img class="row__avatar" src="${user.avatar_url}" alt="git-img">`
            ) // imagem do usuário            
        }
        else{
            $('.row__value').html('username')
            $('.row__avatar').remove()
            $('.img__alt').show(0)
            $('.loader').hide(0)
        }
        
        fetchRepo(user.repos_url, user.public_repos, token).then(repos => { // respositórios
            //paul > 130 repos
            console.log(repos.length)
            const noForkeds = repos.filter(repo => repo.fork != true)            
            const forkeds = repos.length - noForkeds.length      
            const validsRepos = noForkeds.filter(repo => repo.language !== null)

            let totalRepos = '0'

            if (repos.length < 10)
                totalRepos += repos.length
            else
                totalRepos = repos.length
            
            $('.repos__area').html(`
                <div class="area__img">
                    <img src="dist/img/circle1.svg" alt="">
                </div>

                <div class="area__total">
                    <h2 class="total__title">${totalRepos}</h2>
                    <h2 class="total__txt">In total</h2>
                </div>

                <div class="area__numbers">
                    <div class="nrow">
                        <span class="numbers__circle nc"></span>
                        <h2 class="numbers__text nt">Own: ${noForkeds.length}</h2>
                    </div>

                    <div class="nrow">
                        <span class="numbers__circle2 nc"></span>
                        <h2 class="numbers__text2 nt">Forkeds: ${forkeds}</h2>
                    </div>
                </div>`
            )
            
            fetchLang(validsRepos, token).then(langsJsons => { // linguagens
                langSum(langsJsons).then(langResult => { // retorna o total de bytes escritos em cada linguagem                    
                    
                    const langSortLetter = langResult.slice(0).sort(letterSort)
                    const langSortNumber = langResult.slice(0).sort(numberSort)
                    const la = langArray(langSortLetter)
                    const la2 = langArray(langSortNumber)
                    
                    let sb = 0
                    let sb2 = 0
                    let totalBytes = 0
                    let divId = ''
                    let graphDataWidth = document.getElementById('lang__graph').offsetWidth
                    let langPosition = 0
                    let marginAdjust = 0
                    let sizeId = ''
                    let rankCount = 1
                    
                    //console.log(graphDataWidth)
                    la.map(langIndex => {
                        if (langIndex[2] > 0) {
                            sb = shortByte(langIndex[1])

                            let acro = langAcronym(langIndex[0])

                            divId = `lang__size-${langIndex[0]}`
 
                            langPosition = (graphDataWidth * langIndex[2] / 104)                            
                            
                            //marginAdjust = graphDataWidth - langPosition
                            //console.log(langPosition + ' - ' + marginAdjust)
                            if (langPosition > (graphDataWidth * 80) / 100){
                                $('.lang__graph').append(
                                    `<div class="graph__item">
                                        <h2 class="item__name" title="${langIndex[0]}" id="${divId}">${acro}</h2>
                                        <div class="item__circle item__circle2" ></div>
                                    </div>`
                                )
                            }      
                            else{
                                $('.lang__graph').append(
                                    `<div class="graph__item">
                                        <div class="item__circle"  id="${divId}"></div>
                                        <h2 class="item__name" title="${langIndex[0]}">${acro}</h2>
                                    </div>`
                                    )
                            }                                            
                            sizeId = document.getElementById(divId)
                            sizeId.style.marginLeft = langPosition + "px"     
                        }
                    })
                    
                    la2.map(langIndex => {
                        if (langIndex[2] > 0) {
                            sb = shortByte(langIndex[1])
                            totalBytes += langIndex[1]
                            //let acro = langAcronym(langIndex[0])
                            
                            $('.area__content').append(
                                `<div class="area__list">
                                    <h1 class="lang__ranks2 list__item">${rankCount}</h1>
                                    <h2 class="lang__name2 list__item" title="${langIndex[0]}">${langIndex[0]}</h2>
                                    <h2 class="lang__bytes list__item">${sb}</h2>
                                    <h2 class="lang__percent list__item2">${langIndex[2]}%</h2>                                    
                                </div>`
                            )

                            rankCount++
                        }
                    })

                    sb2 = shortByte(totalBytes)

                    let rank = '0'

                    if (rankCount < 10)
                        rank += (rankCount - 1)
                    else
                        rank = rankCount - 1

                    $('.lang__area2').append(
                        `<div class="area2__number area2">
                            <h4 class="number__text area2__text">${rank}</h4><br>
                            <h3 class="number__title area2__title">Languages</h3>
                        </div>
                    
                        <div class="area2__dash"></div>
                    
                        <div class="area2__bytes area2">
                            <h4 class="bytes__text area2__text">${sb2}</h4><br>
                            <h3 class="bytes__title area2__title">Written in total</h3>
                        </div>`
                    )
                    
                })                
            })
            
        })   
    })           
}   

$('.search__name').keyup( (event) => {
    if (event.key == 'Enter'){
        $('.graph__item').remove()
        $('.area__list').remove()
        $('.area2__number,.area2__dash,.area2__bytes').remove()
        $('.repos__area div').remove()

        showData()
    }
})

$('.user__search').click( () => {
    $('.graph__item').remove()
    $('.area__list').remove()
    $('.area2__number,.area2__dash,.area2__bytes').remove()
    $('.repos__area div').remove()

    showData()
})

$('.team').click( () => {
    $('.section__team').css('display', 'flex')
})

$('.close__team').click( () => {
    $('.section__team').css('display', 'none')
})

/*for (let i = 0; i < 0; i++){
    $('.lang__area').append(`<div class="graph__separator" id="separator${i}"></div>`)
}*/

/*
for (let i = 0; i < 350; i++){
    $('.pattern').append(`<div class="pattern__block" id="block${i}">.</div>`)
}*/

if ($('.content__intro').css('display') != 'none'){
    $(document).bind('wheel', () => {
        $('.content__home').hide(0)
        $('.header').css('display', 'grid')
        //$('.content__repositories').css('display', 'flex')
        //$('.content__lang,.content__roadmap').css('display', 'grid')
        //$('.footer').css('display', 'grid')
        //$('.nav').css('display', 'flex')
        $('.corner,.pat,.home__scrolltip').hide()
    });
}

/*
https://www.youtube.com/watch?v=sJspH620ZsU&t=1408s
Make like a tree and leave
*/