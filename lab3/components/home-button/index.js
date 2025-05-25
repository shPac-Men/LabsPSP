// export class HomeButtonComponent {
//     constructor(parent, position = null) {
//         this.parent = parent;
//         this.position = position;
//     }

//     addListeners(listener) {
//         document
//             .getElementById("home-button")
//             .addEventListener("click", listener)
//     }

//     getHTML() {
//         return (
//             `   
//                 <button id="home-button" class="btn btn-primary" type="button">Домой</button>
//             `
//         )
//     }

//     render(listener) {
//         const html = this.getHTML()
//         this.parent.insertAdjacentHTML('beforeend', html)
//         this.addListeners(listener)
//     }
// }

export class HomeButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(options = {}) {
        // Если передан параметр fixed, добавляем стиль
        const fixedStyle = options.fixed 
            ? `position: fixed; bottom: 20px; left: ${options.left || '20px'};` 
            : '';

        return `
            <button id="home-button" 
                    class="btn btn-primary" 
                    type="button"
                    style="${fixedStyle}">
                Домой
            </button>
        `;
    }

    render(listener, options = {}) {
        const html = this.getHTML(options);
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById("home-button").addEventListener("click", listener);
    }
}