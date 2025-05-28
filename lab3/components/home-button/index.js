
export class HomeButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(options = {}) {
        // Если передан параметр fixed, добавляем стиль
        const fixedStyle = options.fixed 
            ? `position: fixed; top: ${options.top || '20px'}; left: ${options.left || '20px'};` 
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