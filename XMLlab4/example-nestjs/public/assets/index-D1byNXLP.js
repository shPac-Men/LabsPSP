var m=Object.defineProperty;var g=(a,t,e)=>t in a?m(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var u=(a,t,e)=>g(a,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class b{constructor(t){this.parent=t}getHTML(t){return`
                    <div class="card text-black" style="width: 300px; height: 300px;">
            <img src="${t.src}" class="card-img h-100" alt="Изображение" style="object-fit: cover;">
      <div class="card-img-overlay d-flex flex-column justify-content-end" 
           style="background: linear-gradient(to top, rgba(255, 255, 255, 0.7), transparent;">
        <h5 class="card-title">${t.title}</h5>
        <p class="card-text">${t.text}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" id="click-card-${t.id}" data-id="${t.id}">Получить услугу</button>
          <button class="btn btn-danger btn-sm" id="del-card-${t.id}" data-id="${t.id}">Удалить</button>
        </div>
      </div>
    </div>
            `}addListeners(t,e,n){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`del-card-${t.id}`).addEventListener("click",n)}render(t,e,n){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e,n)}}class f{constructor(t){this.parent=t}getHTML(){return`
            <div style="position: fixed; bottom: 20px; left: 20px;">
            <button id="copy-button" class="btn btn-primary" type="button">Копировать</button>
            </div>
            `}addListeners(t){document.getElementById("copy-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class y{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class p{constructor(t){this.parent=t}getHTML(t={}){return`
            <button id="home-button" 
                    class="btn btn-primary" 
                    type="button"
                    style="${t.fixed?`position: fixed; top: ${t.top||"20px"}; left: ${t.left||"20px"};`:""}">
                Домой
            </button>
        `}render(t,e={}){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),document.getElementById("home-button").addEventListener("click",t)}}class v{get(t,e){const n=new XMLHttpRequest;n.open("GET",t),n.send(),n.onreadystatechange=()=>{n.readyState===4&&this._handleResponse(n,e)}}post(t,e,n){const s=new XMLHttpRequest;s.open("POST",t),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(e)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,n)}}patch(t,e,n){const s=new XMLHttpRequest;s.open("PATCH",t),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(e)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,n)}}delete(t,e){const n=new XMLHttpRequest;n.open("DELETE",t),n.send(),n.onreadystatechange=()=>{n.readyState===4&&this._handleResponse(n,e)}}_handleResponse(t,e){try{const n=t.responseText?JSON.parse(t.responseText):null;e(n,t.status)}catch(n){console.error("Ошибка парсинга JSON:",n),e(null,t.status)}}}const d=new v;class k{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(){return`${this.baseUrl}/stocks/${id}`}updateStockById(){return`${this.baseUrl}/stocks/${id}`}}const l=new k;class L{constructor(t,e,n=null){this.parent=t,this.id=e,this.mainPageState=n}getData(){d.get(l.getStockById(this.id),(t,e)=>{if(e===200&&t)this.renderData(t);else{const n={id:1,src:"https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",title:"Услуга 1",text:"Удостоверение многодетных"};this.renderData(n)}})}renderData(t){new y(this.pageRoot).render(t)}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="product-page"></div>
        `}clickBack(){const t=new c(this.parent);this.mainPageState&&(c.cards=this.mainPageState.cards,c.cardCount=this.mainPageState.cardCount),t.render()}clickHome(){const t=new c(this.parent);this.mainPageState&&(c.cards=this.mainPageState.cards,c.cardCount=this.mainPageState.cardCount),t.render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.pageRoot).render(this.clickHome.bind(this)),new h(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class x{constructor(t){this.parent=t}addListeners(t){document.getElementById("add-button").addEventListener("click",t)}getHTML(t={}){return`
            <button id="add-button" 
                    class="btn btn-primary" 
                    type="button"
                    style="${t.fixed?`position: fixed; bottom: 20px; left: ${t.left||"20px"};`:""}">
                Добавить
            </button>
        `}render(t,e={}){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),document.getElementById("add-button").addEventListener("click",t)}}class B{constructor(t,e={}){this.parent=t,this.callbacks=e}getHTML(){return`
        <div id="product-page">
            <div class="container mt-5">
                <h2>Добавить новую карточку</h2>
                <form id="add-edit-form" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="product-title" class="form-label">Название*</label>
                        <input type="text" class="form-control" id="product-title" required>
                        <div class="invalid-feedback">Пожалуйста, введите название</div>
                    </div>
                    <div class="mb-3">
                        <label for="product-text" class="form-label">Описание</label>
                        <textarea class="form-control" id="product-text" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="product-src" class="form-label">Ссылка на изображение*</label>
                        <input type="url" class="form-control" id="product-src" required>
                        <div class="invalid-feedback">Пожалуйста, введите корректный URL</div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">Сохранить</button>
                        <button type="button" id="cancel-btn" class="btn btn-outline-secondary">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
        `}get pageRoot(){return document.getElementById("product-page")}setupFormHandlers(){const t=document.getElementById("add-edit-form"),e=document.getElementById("cancel-btn");t.addEventListener("submit",async n=>{if(n.preventDefault(),!t.checkValidity()){n.stopPropagation(),t.classList.add("was-validated");return}try{const s={title:document.getElementById("product-title").value,text:document.getElementById("product-text").value,src:document.getElementById("product-src").value};await this.createNewCard(s),this.callbacks.onSave&&this.callbacks.onSave(),this.navigateBack()}catch(s){console.error("Ошибка создания карточки:",s),alert("Не удалось создать карточку: "+s.message)}}),e.addEventListener("click",()=>{this.callbacks.onCancel&&this.callbacks.onCancel(),this.navigateBack()})}async createNewCard(t){return new Promise((e,n)=>{d.post(l.createStock(),t,s=>{console.log("Новая карточка создана:",s);const r={src:t.src,title:t.title,text:t.text,...s};c.cards.push(r),c.cardCount++,this.callbacks.onSave&&this.callbacks.onSave(r),e(r)},s=>{n(s)})})}navigateBack(){new c(this.parent).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new p(this.pageRoot).render(()=>{new c(this.parent).render()},{fixed:!0,left:"0px",top:"0px"}),new h(this.pageRoot).render(this.navigateBack.bind(this)),this.setupFormHandlers()}}const o=class o{constructor(t){this.parent=t}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page" class="d-flex flex-wrap"></div>
        `}async getData(){return new Promise(t=>{d.get(l.getStocks(),e=>{t(Array.isArray(e)?e:[])})})}async clickCopy(){try{const t=await this.getData();if(t.length===0){console.warn("Нет данных для копирования");return}const{id:e,...n}=t[0];console.log("Отправка:",n),await new Promise((s,r)=>{d.post(l.createStock(),n,i=>{console.log("Ответ сервера:",i),o.cards.push(i),this.renderData([i]),s()},i=>{console.error("Ошибка:",i),r(i)})})}catch(t){console.error("Ошибка копирования:",t),alert("Ошибка: "+t.message)}}clickCard(t){const e=t.target.dataset.id;new L(this.parent,e,{cards:o.cards,cardCount:o.cardCount}).render()}async clickDelete(t){const e=parseInt(t.target.dataset.id);d.delete(l.getStockById(e),n=>{o.cards=o.cards.filter(s=>s.id!==e),this.render()})}clickHome(){o.cards=[],o.cardCount=0,this.render()}clickAdd(){new B(this.parent,{onSave:e=>{this.render()}}).render()}renderData(t){t.forEach(e=>{new b(this.pageRoot).render(e,this.clickCard.bind(this),this.clickDelete.bind(this))})}async render(){this.parent.innerHTML="";const t=this.getHTML();if(this.parent.insertAdjacentHTML("beforeend",t),o.cards.length>0)this.renderData(o.cards);else{const r=await this.getData();o.cards=[...r],o.cardCount=r.length,this.renderData(r)}new f(this.pageRoot).render(this.clickCopy.bind(this)),new p(this.pageRoot).render(this.clickHome.bind(this),{fixed:!0,left:"0px",top:"0px"}),new x(this.pageRoot).render(this.clickAdd.bind(this),{fixed:!0,left:"250px"})}};u(o,"cards",[]),u(o,"cardCount",0);let c=o;const H=document.getElementById("root"),w=new c(H);w.render();
