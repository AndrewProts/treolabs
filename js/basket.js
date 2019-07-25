;(function () {
    let items
    let container = document.getElementById('basket')
    setBasket()
    container.addEventListener('click', function (e) {
        e.preventDefault()
        if (!e.target.classList.contains('fa-times')) return
        Api.deleteItemFromBasket(e.target.dataset.id)
        setBasket()
    })

    function setBasket() {
        items = Store.getters.getBasket()
        container.innerHTML = ''
        items.forEach((e) => {
            container.innerHTML += `
            <a href="./item.html?id=${e.id}" class="item">
                <div class="img" style="background-image: url(${e.image})"></div>
                <span class="right">
                    <span class="name">${e.title}</span>
                    <span class="id">ID: ${e.id}</span>
                    <span class="price">${e.price}$</span>
                    <span class="close"><i class="fas fa-times" data-id="${e.id}"></i></span>
                </span>
            </a>
            `
        })
    }
})()
