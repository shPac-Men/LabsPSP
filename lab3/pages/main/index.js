import { ButtonComponent } from "../../components/button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { CopyButtonComponent } from "../../components/copy-button/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.cradCount = 0;
        this.allCards = [];
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
      
    getCurrentState() {
        return {
            cards: this.allCards,
            count: this.cardCount
        };
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
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
        ]
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        this.parent.innerHTML = '' //от себя
        const productPage = new ProductPage(this.parent, cardId, this.getCurrentState())
        productPage.render()
    }   
    
    clickCopy(){
        const data = this.getData()
        const item = {...data[0], id: ++this.cradCount}// создаем уникальное id
        this.allCards.push(item)
        const productCard = new ProductCardComponent(this.pageRoot)
        productCard.render(item, this.clickCard.bind(this))
    }


    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot) // передаем где ее рендерить
            productCard.render(item, this.clickCard.bind(this))
            this.cradCount++//
            this.allCards.push(item)
        })

        const copyButton = new CopyButtonComponent(this.pageRoot)//
        copyButton.render(this.clickCopy.bind(this))//
    }
}