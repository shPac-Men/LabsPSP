export class AddButtonComponent{
    constructor(parent){
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("add-button")
            .addEventListener("click", listener)
    }

    getHTML(options = {}) {
        const fixedStyle = options.fixed 
            ? `position: fixed; bottom: 20px; left: ${options.left || '20px'};` 
            : '';

        return `
            <button id="add-button" 
                    class="btn btn-primary" 
                    type="button"
                    style="${fixedStyle}">
                Добавить
            </button>
        `;
    }

    render(listener, options = {}) {
        const html = this.getHTML(options);
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById("add-button").addEventListener("click", listener);
    }
}