
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <button class="btn btn-warning edit-btn" data-id="${data.id}">
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onEdit) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        if (onEdit) {
            this.parent.querySelector('.edit-btn').addEventListener('click', onEdit);
        }
    }
}