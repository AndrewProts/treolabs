;(function () {
    function Api() {
        this.auth = function (e) {
            e.preventDefault()
            let username = e.target.querySelector('input[name="username"]').value
            let password = e.target.querySelector('input[name="password"]').value
            if (!username || !password) {
                alert('Invalid username or password')
                return
            }
            Store.mutations.setUser({
                username,
                password
            })
            window.location.replace("./index.html")
        }
        this.logout = function () {
            window.localStorage.clear()
            window.location.replace("./auth.html")
        }
        this.getItems = function ({minp, maxp, sort, page, pageSize}) {
            let items = Store.getters.getItems()
            let pagination = {
                total: 0,
                pageSize: pageSize
            }
            let startItem = (page - 1) * pageSize

            if (minp) {
                items = items.filter((e) => e.price > minp)
            }
            if (maxp) {
                items = items.filter((e) => e.price < maxp)
            }
            pagination.total = items.length
            if (sort == 'name_high') {
                items.sort((a, b) => {
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0
                })
            }
            if (sort == 'name_low') {
                items.sort((a, b) => {
                    if(a.title < b.title) { return 1; }
                    if(a.title > b.title) { return -1; }
                    return 0
                })
            }
            if (sort == 'price_high') {
                items.sort((a, b) => {
                    if(a.price < b.price) { return -1; }
                    if(a.price > b.price) { return 1; }
                    return 0
                })
            }
            if (sort == 'price_low') {
                items.sort((a, b) => {
                    if(a.price < b.price) { return 1; }
                    if(a.price > b.price) { return -1; }
                    return 0
                })
            }
            items = items.slice(startItem, startItem + pageSize)
            return {
                items,
                pagination
            }
        }
        this.getItem = function (id) {
            return Store.getters.getItems().find((e) => e.id == id)
        }
        this.buyItem = function (id) {
            Store.mutations.addItem(id)
            Ev.updateBasket()
        }
        this.deleteItemFromBasket = function (id) {
            Store.mutations.removeItem(id)
        }
    }

    window.Api = new Api()
})()
