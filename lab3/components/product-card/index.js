export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                    <div class="card text-black" style="width: 300px; height: 300px;">
            <img src="${data.src}" class="card-img h-100" alt="Изображение" style="object-fit: cover;">
      <div class="card-img-overlay d-flex flex-column justify-content-end" 
           style="background: linear-gradient(to top, rgba(255, 255, 255, 0.7), transparent;">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.text}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm" id="click-card-${data.id}" data-id="${data.id}">Получить услугу</button>
          <button class="btn btn-danger btn-sm" id="del-card-${data.id}" data-id="${data.id}">Удалить</button>
        </div>
      </div>
    </div>
            `
        )
    }
    
    addListeners(data, listener, deleter) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
        document
            .getElementById(`del-card-${data.id}`)
            .addEventListener("click", deleter)
    }
    

    render(data, listener, deleter) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener, deleter)
    }
}