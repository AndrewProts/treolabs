;(function () {
    const urlParams = new URLSearchParams(window.location.search)
    let pagination = null
    setFilters()
    setItems()

    document.getElementById('username').innerText = Store.getters.getUser().username
    document.getElementById('filter').addEventListener('submit', function (e) {
        e.preventDefault()
        let min = e.target.querySelector('input[name="minp"]').value
        let max = e.target.querySelector('input[name="maxp"]').value
        let queryStr = updateQueryStringParameter(window.location.search, 'minp', min)
        queryStr = updateQueryStringParameter(queryStr, 'maxp', max)
        queryStr = updateQueryStringParameter(queryStr, 'page', '1')
        window.location.replace(queryStr)
    })
    document.getElementById('sort').querySelectorAll('button').forEach(function (e) {
        e.addEventListener('click', function (e) {
            e.preventDefault()
            let queryStr = updateQueryStringParameter(window.location.search, e.target.name, e.target.value)
            queryStr = updateQueryStringParameter(queryStr, 'page', '1')
            window.location.replace(queryStr)
        })
    })
    document.getElementById('pagination').addEventListener('click', function (e) {
        if (e.target.nodeName != 'BUTTON') return
        let targetText = e.target.innerText
        let currentPage = urlParams.get('page')
        let buttons = document.getElementById('pagination').children
        let lastButton = buttons[buttons.length - 2]
        if (targetText == '>') {
            if (+currentPage < +lastButton.innerText) {
                window.location.replace(updateQueryStringParameter(window.location.search, 'page', +currentPage+1))
            }
            return
        }
        if (targetText == '<') {
            if (+currentPage > 1) {
                window.location.replace(updateQueryStringParameter(window.location.search, 'page', +currentPage-1))
            }
            return
        }
        window.location.replace(updateQueryStringParameter(window.location.search, 'page', targetText))
    })
    document.getElementById('itemsContainer').addEventListener('click', function (e) {
        if (e.target.nodeName != 'BUTTON') return
        e.preventDefault()
        if (e.target.classList.contains('green')) return
        e.target.classList.add('green')
        e.target.querySelector('span').innerText = 'Bought'
        Api.buyItem(e.target.dataset.id)
    })

    function setPagination() {
        let container = document.getElementById('pagination')
        let page = urlParams.get('page')
        if (!page) {
            window.location.replace(updateQueryStringParameter(window.location.search, 'page', 1))
        }
        if (!pagination.total) return
        container.innerHTML += '<button><</button>'
        for (let i = 1; i <= Math.ceil(pagination.total/pagination.pageSize); i++) {
            if (i == urlParams.get('page')) {
                container.innerHTML += `<button class="active">${i}</button>`
                continue
            }
            container.innerHTML += `<button>${i}</button>`
        }
        container.innerHTML += '<button>></button>'
    }

    function setItems() {
        let response = Api.getItems({
            minp: urlParams.get('minp'),
            maxp: urlParams.get('maxp'),
            sort: urlParams.get('sort'),
            pageSize: 10,
            page: urlParams.get('page') || 1
        })
        let items = response.items
        pagination = response.pagination
        setPagination()
        let container = document.getElementById('itemsContainer')
        let basket = Store.getters.getBasket()
        if (!items.length) {
            container.innerHTML = '<span class="no-results">No results</span>'
        }
        items.forEach(function (e) {
            let bought = basket.find((x) => x.id == e.id)
            container.innerHTML += `
            <a href="./item.html?id=${e.id}" class="item">
                <div class="img" style="background-image: url(${e.image})"></div>
                <div class="name">${e.title}</div>
                <div class="price">${e.price}$ <span>id: ${e.id}</span></div>
                <button class="${bought ? 'green' : ''}" data-id="${e.id}">
                    <span>${bought?'Bought':'Buy'}</span> <i class="fas fa-shopping-basket"></i>
                </button>
            </a>
            `
        })
    }

    function setFilters() {
        let sortButton = document.querySelector(`[value="${urlParams.get('sort')}"]`)
        if (sortButton) {
            sortButton.classList.add('active')
        }

        let minp = urlParams.get('minp')
        if (minp) {
            document.getElementById('minp').value = minp
        }

        let maxp = urlParams.get('maxp')
        if (minp) {
            document.getElementById('maxp').value = maxp
        }
    }

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }
})()
