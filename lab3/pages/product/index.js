import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id, mainPageState = null) {
        this.parent = parent;
        this.id = id;
        this.mainPageState = mainPageState;
    }

    getData() {
        return fetch(stockUrls.getStockById(this.id))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(data => {
                if (data) {
                    return data;
                }
                // Fallback данные если запрос не удался
                return {
                    id: 1,
                    src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
                    title: "Услуга 1",
                    text: "Удостоверение многодетных"
                };
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
                return {
                    id: 1,
                    src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
                    title: "Услуга 1",
                    text: "Ошибка загрузки данных"
                };
            });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        if (this.mainPageState) {
            MainPage.cards = this.mainPageState.cards;
            MainPage.cardCount = this.mainPageState.cardCount;
        }
        mainPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        if (this.mainPageState) {
            MainPage.cards = this.mainPageState.cards;
            MainPage.cardCount = this.mainPageState.cardCount;
        }
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this));
        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData()
            .then(data => {
                this.renderData(data);
            })
            .catch(error => {
                console.error('Ошибка рендеринга:', error);
            });
    }
}