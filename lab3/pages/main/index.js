
import { ProductCardComponent } from "../../components/product-card/index.js";
import { CopyButtonComponent } from "../../components/copy-button/index.js";
import { ProductPage } from "../product/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
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
        
    getData() {
        return fetch(stockUrls.getStocks())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => Array.isArray(data) ? data : []);
    }

    clickCopy() {
        this.getData()
            .then(data => {
                if (data.length === 0) {
                    console.warn("Нет данных для копирования");
                    return Promise.reject("Нет данных для копирования");
                }

                const { id, ...itemToCopy } = data[0];
                console.log('Отправка:', itemToCopy);

                return fetch(stockUrls.createStock(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemToCopy)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(response => {
                console.log('Ответ сервера:', response);
                MainPage.cards.push(response);
                MainPage.allCards.push(response);
                this.renderData([response]);
            })
            .catch(error => {
                console.error('Ошибка копирования:', error);
                alert('Ошибка: ' + error.message);
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
        fetch(stockUrls.getStockById(cardId), {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            MainPage.cards = MainPage.cards.filter(card => card.id !== cardId);
            MainPage.allCards = MainPage.allCards.filter(card => card.id !== cardId);
            this.render();
        })
        .catch(error => {
            console.error('Ошибка удаления:', error);
        });
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

    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const loadData = MainPage.cards.length === 0 && MainPage.allCards.length === 0
            ? this.getData()
                .then(data => {
                    MainPage.cards = [...data];
                    MainPage.allCards = [...data];
                    MainPage.cardCount = data.length;
                })
            : Promise.resolve();

        loadData.then(() => {
            if (MainPage.allCards.length > 0 && MainPage.cards.length === 0) {
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
        });
    }
}