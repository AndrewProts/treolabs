;(function () {
   function Event() {
       this.updateBasket = function () {
           let container = document.getElementById('basket')
           if (container) {
               let count = Store.getters.getBasket().length
               if (count) {
                   container.classList.remove('hide')
                   container.querySelector('div[class="count"]').innerText = count > 9 ? '9+' : count
               }
           }
       }
       this.updateBasket()
   }

   window.Ev = new Event()
})()
