var f=Object.defineProperty;var y=(i,t,e)=>t in i?f(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var l=(i,t,e)=>y(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class v{constructor(t){this.parent=t}getHTML(t){return`
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
            `}addListeners(t,e,n){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`del-card-${t.id}`).addEventListener("click",n)}render(t,e,n){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e,n)}}class k{constructor(t){this.parent=t}getHTML(){return`
            <div style="position: fixed; bottom: 20px; left: 20px;">
            <button id="copy-button" class="btn btn-primary" type="button">Копировать</button>
            </div>
            `}addListeners(t){document.getElementById("copy-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class L{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${t.src}" class="img-fluid rounded-start" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${t.title}</h5>
                            <p class="card-text">${t.text}</p>
                            <button class="btn btn-warning edit-btn" data-id="${t.id}">
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t,e){const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n),e&&this.parent.querySelector(".edit-btn").addEventListener("click",e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class u{constructor(t){this.parent=t}getHTML(t={}){return`
            <button id="home-button" 
                    class="btn btn-info text-white fw-bold shadow-sm" 
                    type="button"
                    style="${t.fixed?`position: fixed; top: ${t.top||"20px"}; left: ${t.left||"20px"};`:""}">
                Домой
            </button>
        `}render(t,e={}){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),document.getElementById("home-button").addEventListener("click",t)}}class B{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(){return`${this.baseUrl}/stocks/${id}`}updateStockById(){return`${this.baseUrl}/stocks/${id}`}}const o=new B;class m{constructor(t,e={}){this.parent=t,this.id=e.id||null,this.initialData=e.initialData||null,this.callbacks=e.callbacks||{},this.mode=this.id?"edit":"add"}getHTML(){var n,s,a;const t=this.mode==="edit"?"Редактировать карточку":"Добавить новую карточку",e=this.mode==="edit"?"Обновить":"Сохранить";return`
        <div id="product-page">
            <div class="container mt-5">
                <h2>${t}</h2>
                <form id="add-edit-form" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="product-title" class="form-label">Название*</label>
                        <input type="text" class="form-control" id="product-title" 
                               value="${((n=this.initialData)==null?void 0:n.title)||""}" required>
                        <div class="invalid-feedback">Пожалуйста, введите название</div>
                    </div>
                    <div class="mb-3">
                        <label for="product-text" class="form-label">Описание</label>
                        <textarea class="form-control" id="product-text" rows="3">${((s=this.initialData)==null?void 0:s.text)||""}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="product-src" class="form-label">Ссылка на изображение*</label>
                        <input type="url" class="form-control" id="product-src" 
                               value="${((a=this.initialData)==null?void 0:a.src)||""}" required>
                        <div class="invalid-feedback">Пожалуйста, введите корректный URL</div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">${e}</button>
                        <button type="button" id="cancel-btn" class="btn btn-outline-secondary">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
        `}get pageRoot(){return document.getElementById("product-page")}setupFormHandlers(){const t=document.getElementById("add-edit-form"),e=document.getElementById("cancel-btn");t.addEventListener("submit",n=>{if(n.preventDefault(),!t.checkValidity()){n.stopPropagation(),t.classList.add("was-validated");return}const s={title:document.getElementById("product-title").value,text:document.getElementById("product-text").value,src:document.getElementById("product-src").value};(this.mode==="edit"?this.updateCard(this.id,s):this.createCard(s)).then(a=>{this.callbacks.onSave&&this.callbacks.onSave(a)}).catch(a=>{console.error("Ошибка:",a),alert("Ошибка: "+a.message)})}),e.addEventListener("click",()=>{this.callbacks.onCancel&&this.callbacks.onCancel(),this.navigateBack()})}createCard(t){return fetch(o.createStock(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>{if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return e.json()}).then(e=>({...t,...e})).catch(e=>{throw console.error("Ошибка при создании карточки:",e),e})}updateCard(t,e){return fetch(o.getStockById(t),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(n=>{if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return{...e,id:t}}).catch(n=>{throw console.error("Ошибка при обновлении карточки:",n),n})}navigateBack(){this.callbacks.onCancel?this.callbacks.onCancel():new c(this.parent).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new u(this.pageRoot).render(()=>{new c(this.parent).render()},{fixed:!0,left:"0px",top:"0px"}),new h(this.pageRoot).render(this.navigateBack.bind(this)),this.setupFormHandlers()}}class w{constructor(t,e,n=null){this.parent=t,this.id=e,this.mainPageState=n,this.currentData=null}getData(){return fetch(o.getStockById(this.id)).then(t=>{if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>(this.currentData=t,t)).catch(t=>{console.error("Ошибка загрузки данных:",t);const e={id:1,src:"https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",title:"Услуга 1",text:"Удостоверение многодетных"};return this.currentData=e,e})}renderData(t){new L(this.pageRoot).render(t,()=>this.handleEdit())}handleEdit(){new m(this.parent,{id:this.id,initialData:this.currentData,callbacks:{onSave:()=>{new c(this.parent,this.mainPageState).render()},onCancel:()=>{this.render()}}}).render()}get pageRoot(){return document.getElementById("product-page")}getHTML(){return'<div id="product-page"></div>'}clickBack(){new c(this.parent,this.mainPageState).render()}clickHome(){new c(this.parent,this.mainPageState).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new u(this.pageRoot).render(this.clickHome.bind(this)),new h(this.pageRoot).render(this.clickBack.bind(this)),this.getData().then(n=>{this.renderData(n)}).catch(n=>{console.error("Ошибка рендеринга:",n)})}}class T{constructor(t){this.parent=t}addListeners(t){document.getElementById("add-button").addEventListener("click",t)}getHTML(t={}){return`
            <button id="add-button" 
                    class="btn btn-primary" 
                    type="button"
                    style="${t.fixed?`position: fixed; bottom: 20px; left: ${t.left||"20px"};`:""}">
                Добавить
            </button>
        `}render(t,e={}){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),document.getElementById("add-button").addEventListener("click",t)}}const r=class r{constructor(t){this.parent=t}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page" class="container-fluid">
                <div class="row justify-content-center py-4 bg-primary bg-gradient">
                    <div class="col-md-8 text-center">
                        <h1 class="text-white mb-4">Поиск услуги</h1>
                        <div class="d-flex gap-2">
                            <input 
                                type="text" 
                                id="search-input" 
                                placeholder="Поиск" 
                                class="form-control border-0 shadow-sm"
                            >
                            <button 
                                id="search-button" 
                                class="btn btn-info text-white fw-bold shadow-sm"
                            >
                                <i class="bi bi-search"></i> Поиск
                            </button>
                            <button 
                                id="reset-search" 
                                class="btn btn-danger text-white fw-bold shadow-sm"
                            >
                                <i class="bi bi-x-circle"></i> Обновить
                            </button>
                        </div>
                    </div>
                </div>
                <div id="cards-container" class="row justify-content-center py-4 px-2"></div>
            </div>
        `}getData(){return fetch(o.getStocks()).then(t=>{if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>Array.isArray(t)?t:[])}clickCopy(){this.getData().then(t=>{if(t.length===0)return console.warn("Нет данных для копирования"),Promise.reject("Нет данных для копирования");const{id:e,...n}=t[0];return console.log("Отправка:",n),fetch(o.createStock(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}).then(t=>{if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{console.log("Ответ сервера:",t),r.cards.push(t),r.allCards.push(t),this.renderData([t])}).catch(t=>{console.error("Ошибка копирования:",t),alert("Ошибка: "+t.message)})}clickCard(t){const e=t.target.dataset.id;new w(this.parent,e,{cards:r.cards,cardCount:r.cardCount}).render()}clickDelete(t){const e=parseInt(t.target.dataset.id);fetch(o.getStockById(e),{method:"DELETE"}).then(n=>{if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);r.cards=r.cards.filter(s=>s.id!==e),r.allCards=r.allCards.filter(s=>s.id!==e),this.render()}).catch(n=>{console.error("Ошибка удаления:",n)})}clickHome(){r.cards=[],r.cardCount=0,r.allCards=[],this.render()}clickAdd(){new m(this.parent,{onSave:e=>{r.allCards.push(e),this.render()}}).render()}searchByTitle(t){if(!t.trim())r.cards=[...r.allCards];else{const e=t.toLowerCase();r.cards=r.allCards.filter(n=>n.title&&n.title.toLowerCase().includes(e))}this.renderCards()}renderData(t){const e=document.getElementById("cards-container")||this.pageRoot;t.forEach(n=>{new v(e).render(n,this.clickCard.bind(this),this.clickDelete.bind(this))})}renderCards(){const t=document.getElementById("cards-container");t&&(t.innerHTML="",this.renderData(r.cards))}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),(r.cards.length===0&&r.allCards.length===0?this.getData().then(n=>{r.cards=[...n],r.allCards=[...n],r.cardCount=n.length}):Promise.resolve()).then(()=>{r.allCards.length>0&&r.cards.length===0&&(r.cards=[...r.allCards]),this.renderCards(),new k(this.pageRoot).render(this.clickCopy.bind(this)),new u(this.pageRoot).render(this.clickHome.bind(this),{fixed:!0,left:"20px",top:"20px"}),new T(this.pageRoot).render(this.clickAdd.bind(this),{fixed:!0,left:"170px"});const d=document.getElementById("search-input"),p=document.getElementById("search-button"),b=document.getElementById("reset-search");p.addEventListener("click",()=>{this.searchByTitle(d.value)}),d.addEventListener("keypress",g=>{g.key==="Enter"&&this.searchByTitle(d.value)}),b.addEventListener("click",()=>{d.value="",r.cards=[...r.allCards],this.renderCards()})})}};l(r,"cards",[]),l(r,"cardCount",0),l(r,"allCards",[]);let c=r;const x=document.getElementById("root"),C=new c(x);C.render();
