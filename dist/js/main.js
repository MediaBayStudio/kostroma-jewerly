(function(a){a.matches=a.matches||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector,a.closest=a.closest||function(a){return this?this.matches(a)?this:this.parentElement?this.parentElement.closest(a):null:null}})(Element.prototype);var menu,tryingPopup,thanksPopup,overlay,hdr;document.addEventListener("DOMContentLoaded",function(){(function(){hdr=document.querySelector(".hdr"),menu=new SimpleMenu({mediaQuery:"(max-width: 992px)",menu:".mobile-menu",openBtn:{selector:".burger-btn",class:"active"},overlay:{zi:3,css:"background:rgba(64,54,55,.85);"},closeBtn:{selector:".burger-btn",class:"active"},toRight:!0}),menu.style&&(menu.addEventListener("beforeopen",function(){hdr.classList.add("active")}),menu.addEventListener("beforeclose",function(){hdr.classList.remove("active")}))})();(function(){for(var a=document.querySelectorAll("a:not(.disabled)[href^=\"#\"]"),b=document.querySelectorAll("#start, #catalog, #delivery, #contacts"),c=.25,d=0;d<a.length;d++)a[d].addEventListener("click",function(){function a(g){null===f&&(f=g);var h=g-f,i=0>e?Math.max(b-h/c,b+e):Math.min(b+h/c,b+e);window.scrollTo(0,i),i==b+e?location.hash=d:requestAnimationFrame(a)}event.preventDefault();var b=window.pageYOffset,d=this.href.replace(/[^#]*(.*)/,"$1"),e=document.querySelector(d).getBoundingClientRect().top,f=null;requestAnimationFrame(a)})})();(function(){tryingPopup=new SimplePopup({popup:".trying-popup",openBtn:".catalog-block__catalog-card",closeBtn:".trying-popup__close",overlay:".overlay",popupAnimation:"fadeOut 0.5s",overlayAnimation:"fadeOut 0.5s",popupAnimationName:"fadeOut",overlayAnimationName:"fadeOut"});for(var a=tryingPopup.querySelector(".catalog-card__img"),b=tryingPopup.querySelector(".catalog-card__title"),c=tryingPopup.querySelector(".catalog-card__desc"),d=document.querySelectorAll(".check-inp-block__inp"),e=0;e<d.length;e++)d[e].addEventListener("focus",function(){this.parentElement.classList.add("focus")}),d[e].addEventListener("blur",function(){this.parentElement.classList.remove("focus")});tryingPopup.addEventListener("beforeopen",function(){var d=this.caller.closest(".catalog-card"),e=d.querySelector(".catalog-card__img"),f=e.src,g=e.alt,h=d.querySelector(".catalog-card__title").textContent,i=d.querySelector(".catalog-card__desc").textContent;d.classList.add("active"),document.body.classList.add("blur"),a.src=f,a.alt=g,b.textContent=h,c.textContent=i}),tryingPopup.addEventListener("beforeclose",function(){document.body.classList.remove("blur")}),tryingPopup.addEventListener("close",function(){for(var a=document.querySelectorAll(".catalog-block__catalog-card"),b=0;b<a.length;b++)a[b].classList.remove("active")})})();(function(){function a(){if(pageYOffset>e){if(menu.style&&menu.classList.contains("active"))return;d.appendChild(d.replaceChild(c,hdr)),hdr.classList.add("fixed"),window.removeEventListener("scroll",a),window.addEventListener("scroll",b)}}function b(){pageYOffset<=e&&(d.replaceChild(hdr,c),hdr.classList.remove("fixed"),window.removeEventListener("scroll",b),window.addEventListener("scroll",a))}var c=hdr.cloneNode(!0),d=hdr.parentElement,e=hdr.getBoundingClientRect().bottom+pageYOffset;c.style.opacity=0,c.style.pointerEvents="none",window.addEventListener("scroll",a),a()})();(function(){for(var a=document.querySelectorAll(".delivery-card__guarantee"),b=function(){if(!this.classList.contains("active"))for(var b=0;b<a.length;b++)a[b].classList.remove("active");this.classList.toggle("active")},c=0;c<a.length;c++)a[c].addEventListener("click",b)})();(function(){function a(a,b){if(b.focus(),b.setSelectionRange)b.setSelectionRange(a,a);else if(b.createTextRange){var c=b.createTextRange();c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select()}}function b(b){var c=0,d="+7(___)___-__-__".replace(/\D/g,""),e=this.value.replace(/\D/g,"");d.length>=e.length&&(e=d),this.value="+7(___)___-__-__".replace(/./g,function(b){return /[_\d]/.test(b)&&c<e.length?e.charAt(c++):c>=e.length?"":b}),"blur"==b.type?2==this.value.length&&(this.value=""):a(this.value.length,this)}for(var c=document.querySelectorAll("[name=user-tel]"),d=0;d<c.length;d++)c[d].addEventListener("input",b,!1),c[d].addEventListener("focus",b,!1),c[d].addEventListener("blur",b,!1)})();(function(){var a,b,c,d,e,f={1230:!0,992:!0,768:!0,576:!0},g=document.querySelector(".catalog-block"),h=document.querySelector(".catalog-block__more-btn"),i=g.querySelector(".loader-bg"),j=function(a,b){for(var c=a;c<b;c++){if(!d[c])return void l(a,b);d[c].classList.remove("hide")}},k=function(a,b){for(var c=a;c>b;c--){if(!d[c])return;d[c].classList.add("hide")}},l=function(a,b){0===b&&(b=e.length);for(var c,f=a;f<b&&!!e[f];f++)c="<div class=\"catalog-card catalog-block__catalog-card\"><img src=\""+e[f].img+"\" alt=\""+e[f].title+"\" class=\"catalog-card__img\"><strong class=\"catalog-card__title\">"+e[f].article+" "+e[f].title+"</strong><b class=\"catalog-card__desc\">"+e[f].gems+"</b><div class=\"catalog-card__bottom flex\"><b class=\"catalog-card__price\">"+e[f].price+".-</b><button type=\"button\" class=\"catalog-card__btn btn-ol\"><span class=\"catalog-card__btn-text\">\u041F\u0440\u0438\u043C\u0435\u0440\u0438\u0442\u044C</span></button></div>",g.insertAdjacentHTML("beforeend",c);d=g.querySelectorAll(".catalog-card"),tryingPopup.openBtn.refresh()},m=function(){if(matchMedia("(min-width:1229.98px)").matches){if(!f[1230])return;c=8,b=8,f[1230]=!1,f[992]=!0,f[768]=!0,f[576]=!0}else if(matchMedia("(min-width:991.98px)").matches){if(!f[992])return;c=6,b=6,f[1230]=!0,f[992]=!1,f[768]=!0,f[576]=!0}else if(matchMedia("(min-width:767.98px)").matches){if(!f[768])return;c=4,b=4,f[1230]=!0,f[992]=!0,f[768]=!1,f[576]=!0}else{if(!f[576])return;c=0,f[1230]=!0,f[992]=!0,f[768]=!0,f[576]=!1,0===c&&c<d.length&&j(a,e.length),buildCatalogSlider()}0!==c&&(0===a?(k(d.length-1,c-1),a=b):c>a?(j(a,c),a=b):c<a&&(k(a-1,c-1),a=b)),h.classList.remove("hide"),d.length===e.length?h.classList.add("hide"):h.classList.remove("hide")};if(h.addEventListener("click",function(){j(a,a+c),a+=c,a>=e.length&&this.classList.add("hide")}),window.addEventListener("resize",m),function(){matchMedia("(min-width:1229.98px)").matches?(c=8,a=8,f[1230]=!1):matchMedia("(min-width:991.98px)").matches?(c=6,a=6,f[992]=!1):matchMedia("(min-width:767.98px)").matches?(c=4,a=4,f[768]=!1):(c=0,a=0,f[576]=!1)}(),!e){var n=new XMLHttpRequest;n.open("GET","db.json"),n.setRequestHeader("Content-type","application/json; charset=utf-8"),n.send(),i.classList.add("active"),n.addEventListener("readystatechange",function(){4===n.readyState&&200===n.status&&(e=JSON.parse(n.response).goods,l(0,a),0===a&&buildCatalogSlider(),i.classList.remove("active"))})}})();(function(){var a=document.querySelector(".about-sect__desc-block"),b=document.querySelector(".desc-block__more-btn");b.addEventListener("click",function(){a.classList.remove("elipsis")})})();(function(){var a=new SimplePopup({popup:".gallery-popup",openBtn:".gallery-slider__img",closeBtn:".gallery-popup__close",overlay:".overlay",popupAnimation:"fadeOut 0.5s",overlayAnimation:"fadeOut 0.5s",popupAnimationName:"fadeOut",overlayAnimationName:"fadeOut"}),b=document.querySelectorAll(".gallery-slider__img"),c=document.querySelector(".gallery-popup-slider");a.addEventListener("beforeopen",function(){for(var a,d=0;d<b.length;d++){if(!c.classList.contains("slick-slider")){var e="".concat(b[d].src.slice(0,-3),"big.jpg"),f="<figure class=\"gallery-popup-slider__slide-wrap\"><img src=\"".concat(e,"\" alt=\"#\" class=\"gallery-popup-slider__slide\"></figure>");c.insertAdjacentHTML("beforeend",f)}this.caller===b[d]&&(a=d)}c.classList.contains("slick-slider")||buildGallerySlider(),$(".gallery-popup-slider").slick("slickGoTo",a,!0)})})()});