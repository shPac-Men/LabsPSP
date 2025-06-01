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
    static allCards = [];

    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById('main-page');
    }
      
    getHTML() {
        return `
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

            const { id, ...itemToCopy } = data[0];
            console.log('Отправка:', itemToCopy); 

            await new Promise((resolve, reject) => {
                ajax.post(
                    stockUrls.createStock(), 
                    itemToCopy,
                    (response) => {
                        console.log('Ответ сервера:', response);
                        MainPage.cards.push(response);
                        MainPage.allCards.push(response); // Add to allCards for search
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
            MainPage.allCards = MainPage.allCards.filter(card => card.id !== cardId);
            this.render();
        })
    }

    clickHome() {
        MainPage.cards = [];
        MainPage.cardCount = 0;
        MainPage.allCards = [];
        this.render();
    }

    clickAdd() {
        const addEditPage = new AddEditPage(this.parent, {
            onSave: (newItem) => {
                MainPage.allCards.push(newItem); // Add to allCards for search
                this.render();
            }
        });
        addEditPage.render();
    }

    // Search function
    searchByTitle(title) {
        if (!title.trim()) {
            MainPage.cards = [...MainPage.allCards];
        } else {
            const searchTerm = title.toLowerCase();
            MainPage.cards = MainPage.allCards.filter(card => 
                card.title && card.title.toLowerCase().includes(searchTerm))
        }
        this.renderCards();
    }

    renderData(items) {
        const cardsContainer = document.getElementById('cards-container') || this.pageRoot;
        items.forEach((item) => {
            const productCard = new ProductCardComponent(cardsContainer);
            productCard.render(item, this.clickCard.bind(this), this.clickDelete.bind(this));
        });
    }

    renderCards() {
        const cardsContainer = document.getElementById('cards-container');
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
            this.renderData(MainPage.cards);
        }
    }

        async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (MainPage.cards.length === 0 && MainPage.allCards.length === 0) {
            const data = await this.getData();
            MainPage.cards = [...data];
            MainPage.allCards = [...data];
            MainPage.cardCount = data.length;
        } else if (MainPage.allCards.length > 0 && MainPage.cards.length === 0) {
            MainPage.cards = [...MainPage.allCards];
        }

        this.renderCards();
        
        const copyButton = new CopyButtonComponent(this.pageRoot);
        copyButton.render(this.clickCopy.bind(this));

        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this), { 
            fixed: true,
            left: '20px',
            top: "20px"
        });

        const addButton = new AddButtonComponent(this.pageRoot);
        addButton.render(this.clickAdd.bind(this), {
            fixed: true,
            left: '170px'
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const resetButton = document.getElementById('reset-search');

        searchButton.addEventListener('click', () => {
            this.searchByTitle(searchInput.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchByTitle(searchInput.value);
            }
        });

        resetButton.addEventListener('click', () => {
            searchInput.value = '';
            MainPage.cards = [...MainPage.allCards];
            this.renderCards();
        });
    }
}