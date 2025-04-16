export class CopyButtonComponent {
    constructor(parent){
        this.parent = parent
    }

    

    getHTML(){
        return(
            `
            <div style="position: fixed; bottom: 20px; left: 20px;">
            <button id="copy-button" class="btn btn-primary" type="button">Копировать</button>
            </div>
            `
        )
    }

    addListeners(listener){
        document
            .getElementById("copy-button")
            .addEventListener("click", listener)
    }

    render(listener){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}