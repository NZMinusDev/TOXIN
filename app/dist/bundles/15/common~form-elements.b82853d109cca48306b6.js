(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"+TQFRc3V":function(n,t,o){},"+ipEgK5Z":function(n,t,o){},"/LPvS2aF":function(n,t,o){},"0N/t4sn9":function(n,t,o){},"1iHZvS2D":function(n,t,o){},"1sS5WcB+":function(n,t,o){},"4tFdgavu":function(n,t,o){},"7Hfnl815":function(n,t,o){},"8u/fh3aL":function(n,t,o){"use strict";o.r(t);var e=o("wgY5hGF4"),i=o.n(e);i.a.locale("ru"),document.querySelectorAll(".comments__date-item time").forEach(n=>{n.textContent=i()(n.getAttribute("datetime")).fromNow()})},"9pbERDWc":function(n,t,o){},"C8MelD+z":function(n,t,o){},CPGcuNhI:function(n,t,o){"use strict";o.r(t),o.d(t,"paginations",(function(){return e}));o("0N/t4sn9"),o("qJOoaxKI");const e=document.querySelectorAll(".pagination")},DSMlyqnJ:function(n,t,o){},ECQRmgqN:function(n,t){document.querySelectorAll(".form-like-button__button").forEach(n=>{n.addEventListener("change",n=>{const t=n.target;t.dataset.counter=t.checked?parseInt(t.dataset.counter)+1+"":parseInt(t.dataset.counter)-1+""})})},I0T7F8SY:function(n,t,o){},JEIgjVSw:function(n,t,o){},Jvdxn3aA:function(n,t,o){},O4fxYxxJ:function(n,t,o){},URZPvw8d:function(n,t,o){},UynhbhqX:function(n,t,o){},aqb0M1b0:function(n,t,o){},dguL7TJk:function(n,t,o){},"f/4JK/3+":function(n,t,o){},i0m36dXr:function(n,t,o){},im0hgfYX:function(n,t,o){},koeUrfMK:function(n,t,o){},leb2rPga:function(n,t,o){},mlsznvmT:function(n,t,o){},p6tRQjPz:function(n,t,o){},pjTuV6nA:function(n,t,o){},pkKGIviK:function(n,t,o){},qJOoaxKI:function(n,t,o){},qLY9r977:function(n,t,o){"use strict";o.r(t),o("Q/2PVe0v").dropdownsWithIQList.forEach(n=>{n.toxinIQDropdown.dom.openingButton.classList.contains("form-dropdown__item-quantity-list_output-plural")&&(n.toxinIQDropdown.dom.openingButton.setSelectionText=(n,t)=>{let o="";if(t>0)for(const t in n)n[t]>0&&(""!==o&&(o+=", "),o+=n[t]+" "+t);else o="";return o},n.toxinIQDropdown.dom.selection.textContent=n.toxinIQDropdown.dom.openingButton.setSelectionText(n.toxinIQDropdown.lastChangedItem,n.toxinIQDropdown.totalItems))})},qYxh200W:function(n,t,o){},svO7QMJp:function(n,t,o){},tTIi7Bjg:function(n,t,o){},"wso4uZX+":function(n,t,o){"use strict";o.r(t),o.d(t,"sliderContainers",(function(){return u}));var e=o("fDAillBz"),i=o("biajt+cN"),r=o.n(i);const u=document.querySelectorAll(".form-range-slider");u.forEach(n=>{const t=n.querySelector(".form-range-slider__slider"),o=n.querySelector(".form-range-slider__result"),i=n.querySelector(`[name=${o.name}-from]`),u=n.querySelector(`[name=${o.name}-to]`);r.a.create(t,{start:[parseFloat(i.value),parseFloat(u.value)],range:{min:parseFloat(i.min),max:parseFloat(i.max)},connect:!0,step:parseFloat(i.step)}),t.noUiSlider.on("update",n=>{i.value=n[0],u.value=n[n.length-1],o.value=parseInt(n[0]).toLocaleString()+(o.dataset.suffix?o.dataset.suffix:"")+" - "+parseInt(n[n.length-1]).toLocaleString()+(o.dataset.suffix?o.dataset.suffix:"")}),n.getAttribute("isFilter")&&t.noUiSlider.on("change",n=>{e.c.addValues({name:i.getAttribute("name"),value:i.value},{name:u.getAttribute("name"),value:u.value})})})},xDxjod1A:function(n,t,o){},xFnvT1F2:function(n,t,o){},xj3JTs1C:function(n,t,o){"use strict";o.r(t),o.d(t,"ToxinIQDropdownFoldOpenModModifier",(function(){return i}));var e=o("Q/2PVe0v");class i extends e.ToxinIQDropdownOpenModModifier{constructor(n){super(n,[{currentTarget:document,eventType:"mouseup",listener:t=>{n.dom.openingButton.contains(t.target)?n.open():n.close()}}])}}e.dropdownsWithIQList.forEach((n,t)=>{n.toxinIQDropdown.dom.openingButton.classList.contains("form-dropdown__item-quantity-list_openMod-fold")&&new i(n.toxinIQDropdown)})}}]);