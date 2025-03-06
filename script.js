// Получаем кнопку по её ID
const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

// Изначальный цвет фона
let isDefaultBackground = true;

// Функция для смены фона
function changeBackground() {
    if (isDefaultBackground) {
        // Меняем фон на другой цвет
        document.body.style.backgroundColor = '#666'; // Темный фон
    } else {
        // Возвращаем исходный цвет
        document.body.style.backgroundColor = '#f0f0f0'; // Светлый фон
    }
    // Переключаем состояние
    isDefaultBackground = !isDefaultBackground;
}

// Добавляем обработчик события на кнопку
changeBackgroundBtn.addEventListener('click', changeBackground);