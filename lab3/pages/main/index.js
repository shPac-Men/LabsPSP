import { ProductCardComponent } from "../../components/product-card/index.js";
import { CopyButtonComponent } from "../../components/copy-button/index.js";
import { ProductPage } from "../product/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { AddButtonComponent } from "../../components/add-button/indexx.js";
import { AddEditPage } from "../add/index.js";

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



    async clickCopy() {
    try {
        const data = await this.getData();
        if (data.length === 0) {
        console.warn("Нет данных для копирования");
        return;
        }

        // Удаляем старый id, чтобы сервер назначил новый
        const { id, ...itemToCopy } = data[0];
        console.log('Отправка:', itemToCopy); // Логируем данные

        await new Promise((resolve, reject) => {
        ajax.post(
            stockUrls.createStock(), 
            itemToCopy,
            (response) => {
            console.log('Ответ сервера:', response);
            MainPage.cards.push(response);
            this.renderData([response]);
            resolve();
            },
            (error) => {
            console.error('Ошибка:', error);
            reject(error);
            }
        );
        });
    } catch (error) {
        console.error('Ошибка копирования:', error);
        alert('Ошибка: ' + error.message);
    }
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

    async clickDelete(e) {
        const cardId = parseInt(e.target.dataset.id);
        ajax.delete(stockUrls.getStockById(cardId), (data) => {
            MainPage.cards = MainPage.cards.filter(card => card.id !== cardId);
            this.render();
        })
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
            left: '0px',
            top: "0px"
        });

        const addButton = new AddButtonComponent(this.pageRoot);
        addButton.render(this.clickAdd.bind(this),{
            fixed: true,
            left: '250px'
        });
    }
}