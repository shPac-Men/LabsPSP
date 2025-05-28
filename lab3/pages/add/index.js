import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";

export class AddEditPage {
    constructor(parent, callbacks = {}) {
        this.parent = parent;
        this.callbacks = callbacks;
    }
    
    getHTML() {
        return `
        <div id="product-page">
            <div class="container mt-5">
                <h2>Добавить новый товар</h2>
                <form id="add-edit-form" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="product-title" class="form-label">Название</label>
                        <input type="text" class="form-control" id="product-title" required>
                        <div class="invalid-feedback">Пожалуйста, введите название</div>
                    </div>
                    <div class="mb-3">
                        <label for="product-description" class="form-label">Описание</label>
                        <textarea class="form-control" id="product-description" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="product-price" class="form-label">Цена</label>
                        <input type="number" step="0.01" class="form-control" id="product-price" required>
                        <div class="invalid-feedback">Пожалуйста, введите корректную цену</div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">Сохранить</button>
                        <button type="button" id="cancel-btn" class="btn btn-outline-secondary">Отмена</button>
                    </div>
                </form>
            </div>
            </div>
        `;
    }
    

    get pageRoot() {
        return document.getElementById('product-page');
    }


    setupEventListeners() {
        const form = document.getElementById('add-edit-form');
        const cancelBtn = document.getElementById('cancel-btn');

        // Валидация формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            this.handleFormSubmit();
        });

        // Обработка отмены
        cancelBtn.addEventListener('click', () => {
            this.parent.innerHTML = '';
            if (this.callbacks.onCancel) {
                this.callbacks.onCancel();
            }
        });
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

    handleFormSubmit() {
        const newItem = {
            title: document.getElementById('product-title').value,
            description: document.getElementById('product-description').value,
            price: parseFloat(document.getElementById('product-price').value)
        };

        // Отправка на сервер
        ajax.post(stockUrls.addStock(), newItem, (response) => {
            if (this.callbacks.onSave) {
                this.callbacks.onSave(response);
            }
            this.parent.innerHTML = '';
        });
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // this.parent.innerHTML = this.getHTML();
        // this.setupEventListeners();

        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(this.clickHome.bind(this), { 
            fixed: true,
            left: '0px',
            top: '0px'
        });
        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }
}