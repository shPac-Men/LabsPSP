// import { ProductCardComponent } from "../../components/product-card/index.js";
// import { CopyButtonComponent } from "../../components/copy-button/index.js";
// import { ProductPage } from "../product/index.js";
// import { HomeButtonComponent } from "../../components/home-button/index.js";
// import { ajax } from "../../modules/ajax.js";
// import { stockUrls } from "../../modules/stockUrls.js";
// import { AddButton, AddButtonComponent } from "../../components/add-button/indexx.js";
// import { AddButtonComponent } from "../../components/add-button/indexx.js";

// export class MainPage {
//     static cards = [];
//     static cardCount = 0;

//     constructor(parent) {
//         this.parent = parent;
//     }
    
//     get pageRoot() {
//         return document.getElementById('main-page');
//     }
      
//     getHTML() {
//         return `
//             <div id="main-page" class="d-flex flex-wrap"></div>
//         `;
//     }
        
//     async getData() {
//         return new Promise((resolve) => {
//             ajax.get(stockUrls.getStocks(), (data) => {
//                 resolve(Array.isArray(data) ? data : []);
//             });
//         });
//     }
    
//     clickCard(e) {
//         const cardId = e.target.dataset.id;
//         const productPage = new ProductPage(
//             this.parent, 
//             cardId,
//             {
//                 cards: MainPage.cards,
//                 cardCount: MainPage.cardCount
//             }
//         );
//         productPage.render();
//     }

//     clickDelete(e) {
//         const cardId = parseInt(e.target.dataset.id);
//         MainPage.cards = MainPage.cards.filter(card => card.id !== cardId);
//         this.render();
//     }

//     clickHome() {
//         MainPage.cards = [];
//         MainPage.cardCount = 0;
//         this.render();
//     }

//     async clickCopy() {

//         // Получаем текущие данные
//         const data = await this.getData();
//         if (data.length === 0) {
//             console.warn("Нет данных для копирования");
//             return;
//         }
            
//         // Создаем копию первой карточки с новым ID
//         const itemToCopy = {...data[0], id: ++MainPage.cardCount};
            
//         // Добавляем в массив и рендерим
//         MainPage.cards.push(itemToCopy);
//         this.renderData([itemToCopy]);
//     }

//     clickAdd() {
//         const addEditPage = new AddEditPage(this.parent, {
//             onSave: (newItem) => {
//                 MainPage.cards.push(newItem);
//                 MainPage.cardCount++;
//                 this.render();
//             }
//         });
//         addEditPage.render();
//     }

//     renderData(items) {
//         items.forEach((item) => {
//             const productCard = new ProductCardComponent(this.pageRoot);
//             productCard.render(item, this.clickCard.bind(this), this.clickDelete.bind(this));
//         });
//     }

//     async render() {
//         this.parent.innerHTML = '';
//         const html = this.getHTML();
//         this.parent.insertAdjacentHTML('beforeend', html);

//         if (MainPage.cards.length > 0) {
//             this.renderData(MainPage.cards);
//         } else {
//             // Иначе загружаем начальные данные
//             const data = await this.getData();
//             MainPage.cards = [...data];
//             MainPage.cardCount = data.length;
//             this.renderData(data);
//         }

//         const copyButton = new CopyButtonComponent(this.pageRoot);
//         copyButton.render(this.clickCopy.bind(this));

//         const homeButton = new HomeButtonComponent(this.pageRoot);
//         homeButton.render(this.clickHome.bind(this), { 
//             fixed: true,
//             left: '150px'
//         });

//         // const addButton = new AddButtonComponent(this.pageRoot);
//         // addButton.render(this.clickAdd.bind(this),{
//         //     fixed: true,
//         //     left: '300px'
//         // });
//     }
// }

import { ProductCardComponent } from "../../components/product-card/index.js";
import { CopyButtonComponent } from "../../components/copy-button/index.js";
import { ProductPage } from "../product/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { AddButtonComponent } from "../../components/add-button/indexx.js";
// import { addEditPage } from "../../components/add-button/indexx.js";

export class MainPage {
    static cards = [];
    static cardCount = 0;

    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById('main-page');
    }
      
    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }
        
    async getData() {
        return new Promise((resolve) => {
            ajax.get(stockUrls.getStocks(), (data) => {
                resolve(Array.isArray(data) ? data : []);
            });
        });
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(
            this.parent, 
            cardId,
            {
                cards: MainPage.cards,
                cardCount: MainPage.cardCount
            }
        );
        productPage.render();
    }

    clickDelete(e) {
        const cardId = parseInt(e.target.dataset.id);
        MainPage.cards = MainPage.cards.filter(card => card.id !== cardId);
        this.render();
    }

    clickHome() {
        MainPage.cards = [];
        MainPage.cardCount = 0;
        this.render();
    }

    clickAdd() {
    const addEditPage = new AddEditPage(this.parent, {
        onSave: (newItem) => {
            MainPage.cards.push(newItem);
            MainPage.cardCount++;
            this.render();
        }
    });
    addEditPage.render();
    }

    async clickCopy() {

        // Получаем текущие данные
        const data = await this.getData();
        if (data.length === 0) {
            console.warn("Нет данных для копирования");
            return;
        }
            
        // Создаем копию первой карточки с новым ID
        const itemToCopy = {...data[0], id: ++MainPage.cardCount};
            
        // Добавляем в массив и рендерим
        MainPage.cards.push(itemToCopy);
        this.renderData([itemToCopy]);
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this), this.clickDelete.bind(this));
        });
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (MainPage.cards.length > 0) {
            this.renderData(MainPage.cards);
        } else {
            // Иначе загружаем начальные данные
            const data = await this.getData();
            MainPage.cards = [...data];
            MainPage.cardCount = data.length;
            this.renderData(data);
        }
        
        const copyButton = new CopyButtonComponent(this.pageRoot);
        copyButton.render(this.clickCopy.bind(this));

        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this), { 
            fixed: true,
            left: '150px'
        });

        const addButton = new AddButtonComponent(this.pageRoot);
        addButton.render(this.clickAdd.bind(this),{
            fixed: true,
            left: '250px'
        });
    }
}