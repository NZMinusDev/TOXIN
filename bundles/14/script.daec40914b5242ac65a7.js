(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"Tzpav+o3":function(t,i,s){"use strict";s.r(i),s.d(i,"default",(function(){return c}));var e=s("R9eNA/BL");const n=document.querySelectorAll(".js-picture");function o(t,i,s){return i in t?Object.defineProperty(t,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[i]=s,t}class r extends e.a{constructor(t){super(t),o(this,"_DOM",void 0),o(this,"_options",void 0),o(this,"_state",void 0),o(this,"_windowEventListenerObject",{handleWindowScroll:()=>{!this.isShown()&&this._isVisible()&&this.show()}}),this._DOM=this._initDOM(),this._options=this._initOptionsFromHTML(),this._state=r._initState(),this._bindWindowListeners(),this._initDisplay()}show(){const{sources:t,img:i}=this._DOM;return i.src=this._options.src,t.forEach((t,i)=>{t.srcset=this._options.srcsets[i]}),this._state.isShown=!0,this}isShown(){return this._state.isShown}_initDOM(){return{sources:[...this.element.querySelectorAll(".js-picture__source")],img:this.element.querySelector(".js-picture__img")}}_initOptionsFromHTML(){const{sources:t,img:i}=this._DOM;return{src:i.dataset.src||"",srcsets:t.map(t=>t.dataset.srcset||"")}}static _initState(){return{isShown:!1}}_bindWindowListeners(){return window.addEventListener("scroll",this._windowEventListenerObject.handleWindowScroll),this}_initDisplay(){return this._isVisible()&&this.show(),this}_isVisible(){const t=this.element.getBoundingClientRect(),i=document.documentElement.clientHeight,s=t.top>0&&t.top<i,e=t.bottom<i&&t.bottom>0;return s||e}}const c=Array.from(n,t=>new r(t))},ZEcuHxfp:function(t,i,s){}}]);