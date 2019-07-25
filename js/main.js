;(function () {
    checkAuth()

    function checkAuth() {
        let user = Store.getters.getUser()
        if (!user) {
            window.location.replace("./auth.html")
        }
    }
})()
