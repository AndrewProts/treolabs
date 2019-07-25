;(function () {
    const urlParams = new URLSearchParams(window.location.search)
    let item = Api.getItem(urlParams.get('id'))
    let basket = Store.getters.getBasket()
    let bought = basket.find((e) => e.id == item.id) ? true : false

    document.getElementById('image').style.backgroundImage = `url(${item.image})`
    document.getElementById('name').innerText = item.title
    document.getElementById('price').innerText = item.price + '$'
    document.getElementById('id').innerText = 'ID: ' + item.id
    document.getElementById('description').innerText = item.description
    document.getElementById('buy').innerHTML = bought ? '<span>Bought</span> <i class="fas fa-shopping-basket"></i>' : '<span>Buy</span> <i class="fas fa-shopping-basket"></i>'
    if (bought) {
        document.getElementById('buy').classList.add('green')
    }
    document.getElementById('buy').addEventListener('click', function (e) {
        if (this.classList.contains('green')) return
        Api.buyItem(item.id)
        this.classList.add('green')
        this.querySelector('span').innerText = 'Bought'
    })

})()
