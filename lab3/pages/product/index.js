import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id, mainPageState = null) {
        this.parent = parent;
        this.id = id;
        this.mainPageState = mainPageState; // Сохраняем состояние MainPage
    }


    getDataDailyPrize() {
        return Array.from({length: 40}, () => Math.floor(Math.random() * 2));
    }

    getDataMnogodet(){
        const data = [
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
            {firstName: "Юлия", lastName: "Филиф"},      // Палиндром фамилия
            {firstName: "Ксения", lastName: "Волкова"},
            {firstName: "Дарья", lastName: "Заз"},      // Палиндром фамилия
            {firstName: "Алина", lastName: "Никитина"},
            {firstName: "Валерия", lastName: "Шрарш"},   // Палиндром фамилия
            {firstName: "Арина", lastName: "Соловьева"}
        ];
        
        return data
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
                text: "Служба по контракту <p>Присоединяйся к СВОим! Заполни форму</p>"
            },
            {
                id: 4,
                src: "https://gu-st.ru/content/Banner/soldier_support.svg",
                title: `Услуга 4`,
                text: "Подарок за вход <p>Заходи каждый день и получай призы</p>"
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

    checkday(data) {
        let max = 0;
        let current = 0;
        
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 1) {
                current++;
                if (current > max) {
                    max = current;
                }
            } else {
                current = 0;
            }
        }
        
        return [max, current]; 
    }

    renderDailyPrizeForm() {
        const temp = this.getDataDailyPrize();
        const data = this.checkday(temp);
        
        const formHTML = `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <h5>Приз за ежедневный вход</h5>
                        <p>Забери приз! Максимум подряд ${data[0]} дней</p>
                        <p>Текущая серия ${data[1] + 1}</p>
                        <!-- <p> ${temp.map(x => x.toString()).join("")}</p> -->
                        <button class="btn btn-primary" id="btn_prize">Получить</button>
                        <div id="prize-result" class="mt-2"></div>
                    </div>
                </div>
            </div>
        `;
    
        this.parent.insertAdjacentHTML('beforeend', formHTML);
        
        document.getElementById('btn_prize').addEventListener('click', () => {
            const prizeResult = document.getElementById('prize-result');
            prizeResult.textContent = `Ваш код: ${Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('')}`;
        });
    }

    checkMilForm(arr){
        for(let i =0; i<3; i++){
            if(arr[i] !== undefined &&
                arr[i]  !== null &&
                arr[i]  !== false &&
                arr[i]  !== 0 &&
                arr[i]  !== ''){
                    
                }
                else{
                    return  'Ошибка заполнения'
                }
        }
        return ''
    }


    erase(arr) {
        return arr.filter(item => 
            item !== undefined &&
            item !== null &&
            item !== false &&
            item !== 0 &&
            item !== ' '
        );
    }

    renderMilitForm(){
        const formHTML = `
            <div class="data-form mt-4">
            <h5>Введите информацию</h5>
            <p>* обозначены поля, обязательные к заполнению</p>
            <div class="text-danger" id="error"></div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                    placeholder="Город*" id="City">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                    placeholder="Фамилимя*" id="lastname">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                    placeholder="Имя*" id="firstname">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                    placeholder="Отчество" id="Number">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" 
                    placeholder="Предпочитаемый род войск" id="army">
            </div>
            <button class="btn btn-primary" id="submit-data">Отправить</button>
            <div class="result mt-3" id="form-result"></div>
        </div>
    `;

    this.parent.insertAdjacentHTML('beforeend', formHTML);

    
    document.getElementById('submit-data').addEventListener('click', () => {
        let data = [];
        data[0] = document.getElementById('City').value;
        data[1] = document.getElementById('lastname').value;
        data[2] = document.getElementById('firstname').value;
        data[3] = document.getElementById('Number').value;
        data[4] = document.getElementById('army').value

        const error =this.checkMilForm(data);
        document.getElementById('error').textContent = error;

        //result = ` Заявление отправлено в военомат по г.${data[0]} от имени:${data[1]} ${data[2]}</div>`

        if(!error){
            const cleanedData = this.erase(data);
        // Формируем результат только из заполненных полей
        if(cleanedData.length === 3){
            const result = `Заявление отправлено в военкомат г.${cleanedData[0]} от ${cleanedData[1]} ${cleanedData[2]}`;
            document.getElementById('form-result').textContent = result;
        }
        if(cleanedData.length === 4){
            const result = `Заявление отправлено в военкомат г.${cleanedData[0]} от ${cleanedData[1]} ${cleanedData[2]} ${cleanedData[3]}`;
            document.getElementById('form-result').textContent = result;
        }
        if(cleanedData.length === 5){
            const result = `Заявление отправлено в военкомат г.${cleanedData[0]} от ${cleanedData[1]} ${cleanedData[2]} ${cleanedData[3]} предпочитаемый род войск: ${cleanedData[4]}`;
            document.getElementById('form-result').textContent = result;
        }
        } else {
            document.getElementById('form-result').textContent = ''; // Очищаем результат при ошибке
        }
    });
    }


    renderPolinimForm() {
        const data = this.getDataMnogodet();
        
        // Функция для проверки палиндрома
        const isPalindromeFName = (str) => {
            const cleanStr = str.toLowerCase().replace(/\s/g, '');
            return cleanStr === cleanStr.split('').reverse().join('');
        };

        const isPalindromeLName = (str) => {
            const cleanStr = str.toLowerCase().replace(/\s/g, '');
            let temp = [];
            for(let char of cleanStr){
                temp.push(char);
            }

            let reverseStr = '';
            while(temp.length>0){
                reverseStr += temp.pop();
            }

            return cleanStr === reverseStr;
        };
    
        const formHTML = `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <h5>Удостоверение многодетных</h5>
                        <p>Основная информация об услуге...</p>
                        <button class="btn btn-primary" id="CheckPoli">Проверить палиндромы</button>
                        <button class="btn btn-secondary" id="ShowAll">Показать всех</button>
                        <div id="form-result" class="mt-2"></div>
                    </div>
    
                    <div class="col-md-8">
                        <h5 class="mb-3">Список многодетных семей</h5>
                        <ul class="list-group" id="family-list">
                            ${data.map(person => `
                                <li class="list-group-item">${person.firstName} ${person.lastName}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    
        this.parent.insertAdjacentHTML('beforeend', formHTML);
    
        const familyList = document.getElementById('family-list');
        
        // Функция для обновления списка
        const updateList = (filteredData) => {
            familyList.innerHTML = filteredData.map(person => `
                <li class="list-group-item">${person.firstName} ${person.lastName}</li>
            `).join('');
            
            document.getElementById('form-result').textContent = 
                `Найдено палиндромов: ${filteredData.length}`;
        };
    
        // Обработчик для кнопки проверки палиндромов
        document.getElementById('CheckPoli').addEventListener('click', () => {
            const filteredData = data.filter(person => 
                isPalindromeFName(person.firstName) || isPalindromeLName(person.lastName)
            );
            updateList(filteredData);
        });
    
        // Обработчик для кнопки показа всех
        document.getElementById('ShowAll').addEventListener('click', () => {
            updateList(data);
            document.getElementById('form-result').textContent = '';
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

        if(parseInt(this.id) === 3){
            this.renderMilitForm();
        }

        if(parseInt(this.id) === 4){
            this.renderDailyPrizeForm();
        }
    }
}