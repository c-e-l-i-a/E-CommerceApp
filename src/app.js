import {products} from './products.js'

let addBtn = document.querySelectorAll('.add-cart')

/* CLICK EVENT LISTENER */
for(let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', () => {
        cartNumbers(products[i])
    })
}

/* PRODUCTS NUMBER IN CART WHEN LOADING*/
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if(productNumbers) {
        document.querySelector('.cart-icon span').textContent = productNumbers
    }
}

/* ADD PRODUCT IN LOCAL STORAGE AND CART*/
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart-icon span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector
        
        
        ('.cart-icon span').textContent = 1
    }

    setItems(product)
}

/* ADD ALL PRODUCTS AND NUMBERS */
function setItems(product) {
    console.log('my product is', product);

    let cartItem =  localStorage.getItem('productsInCart')
    cartItem = JSON.parse(cartItem)

    if(cartItem != null) {

        if(cartItem[product.tag] == undefined) {
            cartItem = {
                ...cartItem,
                [product.tag]: product
            }
        }
        cartItem[product.tag].inCart += 1 
       
    } else {
        product.inCart = 1 
        cartItem = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItem))
}

onLoadCartNumbers()