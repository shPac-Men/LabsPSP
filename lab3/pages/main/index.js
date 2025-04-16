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
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 3"
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
    
    clickCopy() {
        const data = this.getData();
        const item = {...data[0], id: ++MainPage.cardCount}; // создаем уникальное id
        MainPage.cards.push(item);
        this.renderCards([item]);
    }

    renderCards(cards) {
        cards.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
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