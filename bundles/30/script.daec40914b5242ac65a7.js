(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"0iLYhKzI":function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return _}));var a=i("CPGcuNhI"),n=i("0sVb95bv");class s extends n.a{constructor(t){super(t,"paginationAddressingMethodModifier")}}function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class r extends s{constructor(t){super(t),o(this,"_options",void 0),o(this,"_state",void 0),o(this,"_paginationItemEventListenerObject",{handlePaginationItemClick:t=>{const e=t.currentTarget;this._state.activePage=e.pageNumber,this._renderPaginationItems()._renderPaginationCounter(),this.component.element.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}}),this._options=this._initOptionsFromHTML(),this._state=this._initState(),this._renderPaginationItems()}getActivePage(){return this._state.activePage}_initOptionsFromHTML(){var t,e,i,a;const n=parseInt(null!==(t=this.component.element.dataset.page)&&void 0!==t?t:"",10),s=parseInt(null!==(e=this.component.element.dataset.displayed)&&void 0!==e?e:"",10),o=parseInt(null!==(i=this.component.element.dataset.total)&&void 0!==i?i:"",10);return{page:n,displayed:s,total:o,pages:Math.ceil(o/s),text:null!==(a=this.component.element.dataset.text)&&void 0!==a?a:""}}_initState(){return{activePage:this._options.page}}_renderPaginationItems(){const t=document.createDocumentFragment();return this._state.activePage>1&&this._insertPreviousButtonPaginationItem(t),this._options.pages<6?this._insertAllPaginationItems(t):(this._state.activePage>2&&(this._insertTheFirstPagePaginationItem(t),this._state.activePage>3&&this._insertSeparatorPaginationItem(t,2)),this._insertPaginationItemsBeforeTheLastSeparator(t),this._state.activePage<this._options.pages-1&&(this._state.activePage<this._options.pages-2&&this._insertSeparatorPaginationItem(t,this._options.pages-1),this._insertTheLastPagePaginationItem(t))),this._state.activePage<this._options.pages&&this._insertNextButtonPaginationItem(t),this.component._DOM.list.innerHTML="",this.component._DOM.list.append(t),this}static _createPaginationItem(t,e,i,a,n={}){const s=document.createElement("li");return s.pageNumber=t,s.textContent=e,s.classList.add(...a),s.addEventListener("click",i),Object.entries(n).forEach(([t,e])=>{s[t]=e}),s}_insertPreviousButtonPaginationItem(t){return t.append(r._createPaginationItem(this._state.activePage-1,"arrow_back",this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item","pagination__item_previous"],{title:"на предыдущую страницу"})),this}_insertAllPaginationItems(t){for(let e=1;e<=this._options.pages;e+=1){const i=this._state.activePage===e?"pagination__item_active":"",a=this._state.activePage===e?"текущая страница":"на страницу "+e;t.append(r._createPaginationItem(e,""+e,this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item",i].filter(t=>""!==t),{title:a}))}return this}_insertTheFirstPagePaginationItem(t){return t.append(r._createPaginationItem(1,"1",this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item"],{title:"на страницу 1"})),this}_insertSeparatorPaginationItem(t,e){const i="на страницу "+e;return t.append(r._createPaginationItem(e,"...",this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item","pagination__item_out-of-range"],{title:i})),this}_insertPaginationItemsBeforeTheLastSeparator(t){let e=this._state.activePage-1,i=this._state.activePage+1;1===this._state.activePage&&(e+=1,i+=1),this._state.activePage>=this._options.pages&&(e-=1,i=this._options.pages);for(let a=e;a<=i;a+=1){const e=this._state.activePage===a?"pagination__item_active":"",i=this._state.activePage===a?"текущая страница":"на страницу "+a;t.append(r._createPaginationItem(a,""+a,this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item",e].filter(t=>""!==t),{title:i}))}return this}_insertTheLastPagePaginationItem(t){return t.append(r._createPaginationItem(this._options.pages,""+this._options.pages,this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item"],{title:"на страницу "+this._options.pages})),this}_insertNextButtonPaginationItem(t){return t.append(r._createPaginationItem(this._state.activePage+1,"arrow_forward",this._paginationItemEventListenerObject.handlePaginationItemClick,["pagination__item","pagination__item_next"],{title:"на следующую страницу"})),this}_renderPaginationCounter(){const t=(this._state.activePage-1)*this._options.displayed+1,e=this._state.activePage*this._options.displayed>this._options.total?this._options.total:this._state.activePage*this._options.displayed,i=(""+e).length,a=`${t} - ${e} из ${(""+this._options.total).length>i?Math.floor(this._options.total/10**i)*10**i+"+ ":this._options.total+" "}${this._options.text}`;return this.component._DOM.counter.textContent=a,this}}const _=a.default.filter(t=>t.element.classList.contains("js-pagination_addressing-method_async")).map(t=>new r(t))}}]);