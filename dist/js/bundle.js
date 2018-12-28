!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{let n=0;return n=100*e/t},a=e=>{let t=[];t=e.map(e=>{"JavaScript"===e[0]?e[0]="JS":"Python"===e[0]?e[0]="Py":"PostScript"===e[0]?e[0]="PS":"CoffeeScript"===e[0]?e[0]="CS":"Processing"===e[0]?e[0]="Proc.":e[0]=e[0]})},r=(e,t)=>e[1]>t[1]?-1:e[1]<t[1]?1:0,l=(e,t)=>e[0]<t[0]?-1:e[0]>t[0]?1:0;n(0),n(1);const s=()=>{(async e=>{const t="https://api.github.com/users/"+e;return await fetch(t).then(e=>e.json())})($(".search__name").val()).then(e=>{$(".user__avatar").attr("src",e.avatar_url),$(".user__name").html(e.name),$(".info__bio").html(e.bio),$(".info__local").html(e.location),$(".info__company").html(e.company),$(".info__email").html(e.email),null==e.bio?$(".git-company").html("Garoto(a) de Programa"):$(".git-company").html(e.bio),null==e.location?$(".git-location").html('<i class="fas fa-map-marker-alt mr-1"></i>Nárnia'):$(".git-location").html(`<i class="fas fa-map-marker-alt mr-1"></i>${e.location}`),(async e=>{const t=e+"";return await fetch(t).then(e=>e.json())})(e.repos_url).then(e=>{const t=e.filter(e=>1!=e.fork),n=e.length-t.length,s=t.filter(e=>null!==e.language);console.log(`Repos: ${e.length}\nNo forkeds: ${t.length}`),console.log(`Forkeds: ${n}\nValids: ${s.length}`),(async e=>{let t=[],n=e.map(e=>e.languages_url);for(let e of n){let n=await fetch(e+"").then(e=>e.json());t.push(n)}return t})(s).then(e=>{(async e=>{let t=[],n=[],o=[],a=0,r=0,l=[];return e.map(e=>{for(let n in e)0==t.join("").includes(n)&&t.push(n)}),t.map(t=>{(n=e.filter(e=>null!=e[t])).length>0&&(o=n.map(e=>e[t]),a=o.reduce((e,t)=>e+t,0),r+=a,l.push([t,a]))}),l.push(r),l})(e).then(e=>{$(".data__lang").remove(),$(".rank__percent").remove();const t=e.slice(0).sort(r),n=(e.slice(0).sort(l),(e=>{let t=[],n=0;e.map(a=>{n=o(a[1],e[e.length-1]),t.push([a[0],a[1],Math.round(n)])}),t.pop();let r=t.slice(0);console.log(t),console.log(r);a(r);return t})(t));let s=0,i="",c=document.getElementById("graph__data").offsetWidth,u=0,p="";n.map(e=>{e[2]>0&&(s=(e=>{let t=0;return e>99999?(t=(e/1048576).toFixed(2),t+="mb"):e>999?(t=Math.round(e/1024),t+="kb"):(t=Math.round(e),t+="B"),t})(e[1]),i=`lang__size-${e[0]}`,$(".graph__data").append(`<div class="data__lang"">\n                                    <h2 class="lang__name" title="${e[0]}">${e[0]}</h2>\n                                    <div class="lang__start"></div>\n                                    <div class="lang__size" id="${i}"></div>\n                                    <h3 class="lang__byte">${s}</h3>\n                                </div>`),u=c*e[2]/100,(p=document.getElementById(i)).style.width=u+"px",$(".graph__rank").append(`<div class="rank__percent">\n                                    <div class="percent__circle"></div>\n                                    <h3 class="percent_lang">${e[0]}:</h3>\n                                    <h3 class="percent__number">${e[2]}%</h3>\n                                </div>`))})})})})})};$(".search__name").keyup(e=>{"Enter"==e.key&&s()}),$(".header__logotype h5").click(()=>{$(".first").show(),$(".second").hide()}),$(".header__menu").click(()=>{$(".first").hide(),$(".second").show()}),$(".yes").click(()=>{$(".second__check").hide(),$(".second__search").show()});for(let e=0;e<5;e++)$(".stats__separator").append(`<div class="graph__separator" id="separator${e}"></div>`);var i={x:0,y:0};let c,u,p,d,h,_,f,m,g,y,v,b,k,x,P;c=0,u=0,p=0,d=0,h=500,$(document).bind("mousemove",function(e){i={x:e.pageX,y:e.pageY}}),$(".dots__dot").each(function(e,t){$(t).data("homex",parseInt($(t).position().left)),$(t).data("homey",parseInt($(t).position().top))}),$(".dots__dot").css("position","absolute"),setInterval(function(){$(".dots__dot").each(function(e,t){t=$(t),_=t.position(),f=t.offset().left,m=t.offset().top,g=i.x,y=i.y,v=g-f,b=y-m,k=Math.sqrt(v*v+b*b),h=2600-20*k,k>130&&(h=0),x=f-v/k*h/k,P=m-b/k*h/k,p=(p+(t.data("homex")-f)/2)/2.1,d=(d+(t.data("homey")-m)/2)/2.1,t.css("left",x+p),t.css("top",P+d)})},15)}]);