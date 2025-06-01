// import { ajax } from "../../modules/ajax.js";
// import { stockUrls } from "../../modules/stockUrls.js";
// import { MainPage } from "../main/index.js";
// import { BackButtonComponent } from "../../components/back-button/index.js";
// import { HomeButtonComponent } from "../../components/home-button/index.js";
// import { ProductCardComponent } from "../../components/product-card/index.js";

// export class AddEditPage {
//     constructor(parent, callbacks = {}) {
//         this.parent = parent;
//         this.callbacks = callbacks;
//     }
    
//     getHTML() {
//         return `
//         <div id="product-page">
//             <div class="container mt-5">
//                 <h2>Добавить новую карточку</h2>
//                 <form id="add-edit-form" class="needs-validation" novalidate>
//                     <div class="mb-3">
//                         <label for="product-title" class="form-label">Название*</label>
//                         <input type="text" class="form-control" id="product-title" required>
//                         <div class="invalid-feedback">Пожалуйста, введите название</div>
//                     </div>
//                     <div class="mb-3">
//                         <label for="product-text" class="form-label">Описание</label>
//                         <textarea class="form-control" id="product-text" rows="3"></textarea>
//                     </div>
//                     <div class="mb-3">
//                         <label for="product-src" class="form-label">Ссылка на изображение*</label>
//                         <input type="url" class="form-control" id="product-src" required>
//                         <div class="invalid-feedback">Пожалуйста, введите корректный URL</div>
//                     </div>
//                     <div class="d-flex gap-2">
//                         <button type="submit" class="btn btn-primary">Сохранить</button>
//                         <button type="button" id="cancel-btn" class="btn btn-outline-secondary">Отмена</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//         `;
//     }

//     get pageRoot() {
//         return document.getElementById('product-page');
//     }

//     setupFormHandlers() {
//         const form = document.getElementById('add-edit-form');
//         const cancelBtn = document.getElementById('cancel-btn');

//         form.addEventListener('submit', async (e) => {
//             e.preventDefault();
            
//             if (!form.checkValidity()) {
//                 e.stopPropagation();
//                 form.classList.add('was-validated');
//                 return;
//             }

//             try {
//                 const newCard = {
//                     title: document.getElementById('product-title').value,
//                     text: document.getElementById('product-text').value,
//                     src: document.getElementById('product-src').value
//                 };

//                 await this.createNewCard(newCard);
                
//                 if (this.callbacks.onSave) {
//                     this.callbacks.onSave();
//                 }
                
//                 this.navigateBack();
//             } catch (error) {
//                 console.error('Ошибка создания карточки:', error);
//                 alert('Не удалось создать карточку: ' + error.message);
//             }
//         });

//         cancelBtn.addEventListener('click', () => {
//             if (this.callbacks.onCancel) {
//                 this.callbacks.onCancel();
//             }
//             this.navigateBack();
//         });
//     }

// async createNewCard(cardData) {
//     return new Promise((resolve, reject) => {
//         ajax.post(
//             stockUrls.createStock(),
//             cardData,
//             (response) => {
//                 console.log('Новая карточка создана:', response);
                
//                 // Проверяем и дополняем данные
//                 const completeCard = {
//                     src: cardData.src, // Берем оригинальный src из формы
//                     title: cardData.title,
//                     text: cardData.text,
//                     ...response // Добавляем серверные данные (id и т.д.)
//                 };
                
//                 MainPage.cards.push(completeCard);
//                 MainPage.cardCount++;
                
//                 if (this.callbacks.onSave) {
//                     this.callbacks.onSave(completeCard); // Передаем полные данные
//                 }
                
//                 resolve(completeCard);
//             },
//             (error) => {
//                 reject(error);
//             }
//         );
//     });
// }

//     navigateBack() {
//         const mainPage = new MainPage(this.parent);
//         mainPage.render();
//     }

//     render() {
//         this.parent.innerHTML = '';
//         this.parent.insertAdjacentHTML('beforeend', this.getHTML());

//         const homeButton = new HomeButtonComponent(this.pageRoot);
//         homeButton.render(() => {
//             const mainPage = new MainPage(this.parent);
//             mainPage.render();
//         }, { 
//             fixed: true,
//             left: '0px',
//             top: '0px'
//         });
        
//         const backButton = new BackButtonComponent(this.pageRoot);
//         backButton.render(this.navigateBack.bind(this));

//         this.setupFormHandlers();
//     }
// }

import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";

export class AddEditPage {
    constructor(parent, options = {}) {
        this.parent = parent;
        this.id = options.id || null;
        this.initialData = options.initialData || null;
        this.callbacks = options.callbacks || {};
        this.mode = this.id ? 'edit' : 'add';
    }
    
    getHTML() {
        const title = this.mode === 'edit' ? 'Редактировать карточку' : 'Добавить новую карточку';
        const submitText = this.mode === 'edit' ? 'Обновить' : 'Сохранить';
        
        return `
        <div id="product-page">
            <div class="container mt-5">
                <h2>${title}</h2>
                <form id="add-edit-form" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="product-title" class="form-label">Название*</label>
                        <input type="text" class="form-control" id="product-title" 
                               value="${this.initialData?.title || ''}" required>
                        <div class="invalid-feedback">Пожалуйста, введите название</div>
                    </div>
                    <div class="mb-3">
                        <label for="product-text" class="form-label">Описание</label>
                        <textarea class="form-control" id="product-text" rows="3">${this.initialData?.text || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="product-src" class="form-label">Ссылка на изображение*</label>
                        <input type="url" class="form-control" id="product-src" 
                               value="${this.initialData?.src || ''}" required>
                        <div class="invalid-feedback">Пожалуйста, введите корректный URL</div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">${submitText}</button>
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

    setupFormHandlers() {
        const form = document.getElementById('add-edit-form');
        const cancelBtn = document.getElementById('cancel-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            try {
                const cardData = {
                    title: document.getElementById('product-title').value,
                    text: document.getElementById('product-text').value,
                    src: document.getElementById('product-src').value
                };

                const result = this.mode === 'edit' 
                    ? await this.updateCard(this.id, cardData)
                    : await this.createCard(cardData);
                
                if (this.callbacks.onSave) {
                    this.callbacks.onSave(result);
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка: ' + error.message);
            }
        });

        cancelBtn.addEventListener('click', () => {
            if (this.callbacks.onCancel) {
                this.callbacks.onCancel();
            }
            this.navigateBack();
        });
    }

    async createCard(cardData) {
        return new Promise((resolve, reject) => {
            ajax.post(
                stockUrls.createStock(),
                cardData,
                (response) => resolve({ ...cardData, ...response }),
                (error) => reject(error)
            );
        });
    }

    async updateCard(id, cardData) {
        return new Promise((resolve, reject) => {
            ajax.patch(
                stockUrls.getStockById(id),
                cardData,
                (response) => resolve({ ...cardData, id }),
                (error) => reject(error)
            );
        });
    }

    navigateBack() {
        if (this.callbacks.onCancel) {
            this.callbacks.onCancel();
        } else {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const homeButton = new HomeButtonComponent(this.pageRoot);
        homeButton.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        }, { 
            fixed: true,
            left: '0px',
            top: '0px'
        });
        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.navigateBack.bind(this));

        this.setupFormHandlers();
    }
}