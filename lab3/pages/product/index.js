import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ProductCardComponent } from "../../components/product-card/index.js";

export class ProductPage {
    constructor(parent, id, mainPageState = null) {
        this.parent = parent;
        this.id = id;
        this.mainPageState = mainPageState; // Сохраняем состояние MainPage
    }

    // getData() {
    //     const allData = [
    //         {
    //             id: 1,
    //             src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
    //             title: `Услуга 1`,
    //             text: "Удостоверение многодетных"
    //         },
    //         {
    //             id: 2,
    //             src: "https://gu-st.ru/content/banner_main_page/gu_new_regions.svg",
    //             title: `Услуга 2`,
    //             text: "Замена паспорта"
    //         },
    //         {
    //             id: 3,
    //             src: "https://gu-st.ru/content/banner_main_page/Millitary_service_contract.svg",
    //             title: `Услуга 3`,
    //             text: "Служба по контракту"
    //         }
    //     ];
    
    //     // Возвращаем данные для текущего id
    //     return allData.find(item => item.id === parseInt(this.id)) || allData[0]; 
    //     //.find() - метод массива, который ищет первый элемент, удовлетворяющий условию
    //     //item => item.id === parseInt(this.id) - проверяет, совпадает ли ID элемента с переданным ID (предварительно преобразованным в число)
    // }
    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
        this.renderData(data);
    })
}

    renderData(item) {
        const product = new ProductCardComponent(this.pageRoot)
        product.render(item)
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent); // Восстанавливаем MainPage с сохраненным состоянием
        if (this.mainPageState) {
            MainPage.cards = this.mainPageState.cards;
            MainPage.cardCount = this.mainPageState.cardCount;
        }
        mainPage.render();
    }

    clickHome(){
        const mainPage = new MainPage(this.parent)
        if (this.mainPageState){
            MainPage.cards = this.mainPageState.cards;
            MainPage.cardCount = this.mainPageState.cardCount;
        }
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this))
        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // const data = this.getData();
        // const product = new ProductComponent(this.pageRoot);
        // product.render(data);

        this.getData()
    }
}