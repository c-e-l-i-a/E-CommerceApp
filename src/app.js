let addBtn = document.querySelectorAll('.add-cart')

let products = [

    {
        name: 'Bakugo', 
        tag: 'bakugo',
        price: 45,
        inCart: 0
    },
    {
        name: 'Shoto', 
        tag: 'shoto',
        price: 55,
        inCart: 0
    },
    {
        name: 'Gojo', 
        tag: 'gojo',
        price: 40,
        inCart: 0
    },
    {
        name: 'Snake', 
        tag: 'snake',
        price: 60,
        inCart: 0
    },
    {
        name: 'Erza Scarlette', 
        tag: 'erza',
        price: 45,
        inCart: 0
    },
    {
        name: 'Natsu', 
        tag: 'natsu',
        price: 35,
        inCart: 0
    }
]

for(let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', () => {
        cartNumbers()
    })
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart-icon span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart-icon span').textContent = 1
    }
}