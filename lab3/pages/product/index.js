
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { AddEditPage } from "../add/index.js";

export class ProductPage {
    constructor(parent, id, mainPageState = null) {
        this.parent = parent;
        this.id = id;
        this.mainPageState = mainPageState;
        this.currentData = null;
    }

    getData() {
        return new Promise((resolve) => {
            ajax.get(stockUrls.getStockById(this.id), (data, status) => {
                if (status === 200 && data) {
                    this.currentData = data;
                    resolve(data);
                } else {
                    const fallbackData = {
                        id: 1,
                        src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
                        title: "Услуга 1",
                        text: "Удостоверение многодетных"
                    };
                    this.currentData = fallbackData;
                    resolve(fallbackData);
                }
            });
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item, () => this.handleEdit());
    }

    handleEdit() {
        const addEditPage = new AddEditPage(this.parent, {
            id: this.id,
            initialData: this.currentData,
            callbacks: {
                onSave: () => {
                    const mainPage = new MainPage(this.parent, this.mainPageState);
                    mainPage.render();
                },
                onCancel: () => {
                    this.render();
                }
            }
        });
        addEditPage.render();
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent, this.mainPageState);
        mainPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent, this.mainPageState);
        mainPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this));
        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = await this.getData();
        this.renderData(data);
    }
}