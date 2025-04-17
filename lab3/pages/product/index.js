import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id, mainPageState = null) {
        this.parent = parent;
        this.id = id;
        this.mainPageState = mainPageState; // Сохраняем состояние MainPage

        this.names = [
            {firstName: "Анна", lastName: "Сокол"},     // Палиндром имя
            {firstName: "Мария", lastName: "Ротор"},    // Палиндром фамилия
            {firstName: "Евгения", lastName: "Иванова"},
            {firstName: "Ольга", lastName: "Кайак"},    // Палиндром фамилия
            {firstName: "Татьяна", lastName: "Петрова"},
            {firstName: "Алла", lastName: "Смирнова"},  // Палиндром имя
            {firstName: "Наталья", lastName: "Шалаш"},  // Палиндром фамилия
            {firstName: "Елена", lastName: "Кузнецова"},
            {firstName: "Ирина", lastName: "Поп"},      // Палиндром фамилия
            {firstName: "Оксана", lastName: "Федорова"},
            {firstName: "Людмила", lastName: "Тенет"},  // Палиндром фамилия
            {firstName: "Светлана", lastName: "Морозова"},
            {firstName: "Ангелина", lastName: "Дед"},   // Палиндром фамилия
            {firstName: "Виктория", lastName: "Ковалева"},
            {firstName: "Юлия", lastName: "Анна"},      // Палиндром фамилия
            {firstName: "Ксения", lastName: "Волкова"},
            {firstName: "Дарья", lastName: "Заз"},      // Палиндром фамилия
            {firstName: "Алина", lastName: "Никитина"},
            {firstName: "Валерия", lastName: "Шарш"},   // Палиндром фамилия
            {firstName: "Арина", lastName: "Соловьева"}
        ];
    }

    getData() {
        const allData = [
            {
                id: 1,
                src: "https://gu-st.ru/content/Banner/large_family_e_card_mobile.svg",
                title: `Услуга 1`,
                text: "Удостоверение многодетных"
            },
            {
                id: 2,
                src: "https://gu-st.ru/content/banner_main_page/gu_new_regions.svg",
                title: `Услуга 2`,
                text: "Замена паспорта"
            },
            {
                id: 3,
                src: "https://gu-st.ru/content/banner_main_page/Millitary_service_contract.svg",
                title: `Услуга 3`,
                text: "Служба по контракту"
            }
        ];
    
        // Возвращаем данные для текущего id
        return allData.find(item => item.id === parseInt(this.id)) || allData[0]; 
        //.find() - метод массива, который ищет первый элемент, удовлетворяющий условию
        //item => item.id === parseInt(this.id) - проверяет, совпадает ли ID элемента с переданным ID (предварительно преобразованным в число)
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


    renderPasportForm() {
        const formHTML = `
            <div class="data-form mt-4">
                <h5>Введите информацию</h5>
                <div class="mb-3">
                    <input type="text" class="form-control" 
                           placeholder="Регион" id="Region">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" 
                           placeholder="Подразделение" id="post">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" 
                           placeholder="Серия" id="serial">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" 
                           placeholder="Номер" id="Number">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" 
                           placeholder="Специальный символ" id="simbol">
                </div>
                <button class="btn btn-primary" id="submit-data">Отправить</button>
                <div class="result mt-3" id="form-result"></div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', formHTML);

        document.getElementById('submit-data').addEventListener('click', () => {
            const Region = document.getElementById('Region').value;
            const post = document.getElementById('post').value;
            const serial = document.getElementById('serial').value;
            const number = document.getElementById('Number').value;
            const simbol = document.getElementById('simbol').value
            
            const result = `Выдан ГУ МВД: ${Region}${simbol}${post}. Серия и номер ${serial} ${simbol} ${number}`;
            document.getElementById('form-result').textContent = result;
        });
    }


    renderPolinimForm(){
        const formHTML =  `
        <div class="data-form mt-4">
            <h5>Проверка полинтромных имен или фамилий</h5>
            <button class="btn btn-primary" id="CheckPoli">Просмотреть</button>
            <div class="result mt-3" id="form-result"></div>
        </div>
    `;

    this.parent.insertAdjacentHTML('beforeend', formHTML);

    document.getElementById('CheckPoli').addEventListener('click', () => {
        this.names.forEach(person => {
    
        });
        
        const result = 0;
        document.getElementById('form-result').textContent = result;
    });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        
        if (parseInt(this.id) === 2) {
            this.renderPasportForm();
        }

        if(parseInt(this.id) === 1 ){
            this.renderPolinimForm();
        }
    }
}