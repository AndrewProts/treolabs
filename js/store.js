;(function () {
    let itemTemplates = [
        {
            title: 'Doom Eternal',
            description: '\n' +
                'DOOM® Eternal ™ by id Software is a direct continuation of the DOOM® hit, which won the Best Action movie at the 2016 Game Awards ceremony. Break through the measurements, crushing everything in your path with incredible strength and speed. This game sets a new standard for first-person shooters. It was created on the id Tech 7 engine and is accompanied by an explosive soundtrack from the composer Mick Gordon. Grab powerful weapons and in the role of Executioner Roca go to shred new and well-known demons who have invaded the unknown worlds of DOOM Eternal.\n' +
                'You are the Executioner of Doom. You have returned to Earth, captured by hordes of bloodthirsty demons. Crush the hellish creatures and uncover the mystery of the past ... complete a great mission.',
            image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8c/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Doom_Eternal.jpg/270px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Doom_Eternal.jpg'
        },
        {
            title: 'Cyberpunk 2077',
            description: 'Cyberpunk 2077 is an adventure role-playing game, which takes place in the metropolis of Knight City, where power, luxury and body modifications are valued the most. You play as V, a mercenary in search of a device that allows you to gain immortality. You will be able to change cyber implants, skills and style of play of your character, exploring the open world, where your actions affect the course of the plot and everything that surrounds you.',
            image: 'https://upload.wikimedia.org/wikipedia/ru/b/bb/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%B8%D0%B3%D1%80%D1%8B_Cyberpunk_2077.jpg'
        },
        {
            title: 'Dying Light 2',
            description: 'It has been 15 years since mankind suffered a defeat in the fight against the virus.\n' +
                '\n' +
                'The last large settlement of people is fighting for survival in a ruthless world teeming with the infected. All the horrors of the dark ages are embodied here in the modern guise: during the day, in search of resources or those from whom they can be taken away, gangsters, groups and starving people roam the streets, and at night the bloodthirsty infected come to hunt.',
            image: 'https://rg-mechanics.org/_ld/15/86068375.jpg'
        },
        {
            title: 'Assassin\'s Creed Odyssey',
            description: 'Define your fate in "Assassin\'s Creed® Odyssey."\n' +
                'Walk from an outcast to a living legend: go on a long journey to uncover the secrets of your past and change the future of ancient Greece. You will find a completely new combat system and sea travel in a huge seamless world that is constantly evolving and responding to your every action.',
            image: 'http://t1.gstatic.com/images?q=tbn:ANd9GcQNPb5FEloCaOPw0_LoZp7_3pLmYc1gBXu0RaE-BM7kBiH-bmUU'
        },
        {
            title: 'Watch_Dogs 2',
            description: 'Talented hacker Marcus is teaming up with the DedSec hacker group to counter ctOS 2.0\'s global control system, which criminals use to track and manipulate the lives of citizens.',
            image: 'https://upload.wikimedia.org/wikipedia/ru/8/86/Watch_Dogs_2_cover.jpg'
        }
    ]

    function Store() {
        let state = {
            user: null,
            items: [],
            basket: []
        }

        this.getters = {
            getUser: () => state.user,
            getItems: () => state.items,
            getBasket: () => state.basket
        }

        this.mutations = {
            setUser: ({username, password}) => {
                state.user = {
                    username,
                    password
                }
                setLocal('user', state.user)
            },
            addItem: (id) => {
                state.basket.push(state.items.find((e) => e.id == id))
                setLocal('basket', state.basket)
            },
            removeItem: (id) => {
                state.basket.splice(state.basket.findIndex((e) => e.id == id), 1)
                setLocal('basket', state.basket)
            }
        }

        function loadLocalBasket() {
            let basket = getLocal('basket')
            if (basket) {
                state.basket = basket
            }
        }

        loadLocalBasket()

        function loadLocalUser() {
            let user = getLocal('user')
            if (user) {
                state.user = user
            }
        }
        loadLocalUser()

        function generateItems () {
            let localItems = getLocal('items')
            if (localItems) {
                state.items = localItems
                return
            }
            for (let i = 0; i < 100; i++) {
                let item = Object.assign({}, itemTemplates[getRandomInt(0, itemTemplates.length)])
                item.price = getRandomInt(10, 100)
                item.id = i
                state.items.push(item)
            }
            setLocal('items', state.items)
        }
        generateItems()
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function setLocal (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    function getLocal (key) {
        return JSON.parse(window.localStorage.getItem(key))
    }

    window.Store = new Store()
})()
