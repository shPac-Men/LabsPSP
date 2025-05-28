import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class AddEditPage {
    constructor(parent, callbacks = {}) {
        this.parent = parent;
        this.callbacks = callbacks;
    }
    
    getHTML() {
        return `
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
        `;
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
        this.parent.innerHTML = this.getHTML();
        this.setupEventListeners();
    }
}