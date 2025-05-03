import { ButtonComponent } from "../../components/button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { CopyButtonComponent } from "../../components/copy-button/index.js";
import { ProductPage } from "../product/index.js";

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
        
    getData() {
        return [
            {
                id: 1,
                src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
                title: "Услуга",
                text: "Удостоверение многодетных"
            },
            {
                id: 2,
                src: "https://gu-st.ru/content/banner_main_page/gu_new_regions.svg",
                title: "Услуга",
                text: "Замена паспорта"
            },
            {
                id: 3,
                src: "https://gu-st.ru/content/banner_main_page/Millitary_service_contract.svg",
                title: "Услуга",
                text: "Служба по контракту"
            },
            {
                id: 4,
                src: "https://gu-st.ru/content/Banner/soldier_support.svg",
                title: "Подарок за вход",
                text: "Забрать приз"
            },
        ];
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

    clickDelete(e){
        const cardId = parseInt(e.target.dataset.id)
        MainPage.cards = MainPage.cards.filter(card => card.id !== cardId);
        this.render()
    }

    clickCopy() {
        const data = this.getData();
        const item = {...data[0], id: ++MainPage.cardCount}; // создаем уникальное id
        MainPage.cards.push(item);
        this.renderCards([item]);
    }

    renderCards(cards) {
        cards.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this), this.clickDelete.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Если карточки уже есть в статическом хранилище - используем их
        if (MainPage.cards.length > 0) {
            this.renderCards(MainPage.cards);
        } else {
            // Иначе загружаем начальные данные
            const data = this.getData();
            MainPage.cards = [...data];
            MainPage.cardCount = data.length;
            this.renderCards(data);
        }

        const copyButton = new CopyButtonComponent(this.pageRoot);
        copyButton.render(this.clickCopy.bind(this));
    }
}