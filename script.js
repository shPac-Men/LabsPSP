const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

let isDefaultBackground = true;

function changeBackground() {
    if (isDefaultBackground) {
        document.body.style.backgroundColor = '#666';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
    }
    isDefaultBackground = !isDefaultBackground;
}

changeBackgroundBtn.addEventListener('click', changeBackground);