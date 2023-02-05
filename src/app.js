import {products} from './products.js'

let addBtn = document.querySelectorAll('.add-cart')
let cartBtn = document.querySelector('.cart-icon')
let menuBtn = document.getElementById('icon-list')


/* SCROLL FUNCTIONS */

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

/* ACTIVE NAVBAR */
 
menuBtn.onclick = function() {
   const navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle('active')

    if(navBar.classList.contains('active')){
        disableScroll()
    } else {
        enableScroll();
    }

}

/* ACTIVE CART PAGE */

cartBtn.onclick = function() {
    const cartPage = document.querySelector('.cart-container')
    cartPage.classList.toggle('active')

    if(cartPage.classList.contains('active')) {
        disableScroll()
    } else {
        enableScroll();
    }

    cartDisplay()
}

/* CLICK EVENT LISTENER */
for(let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalProductsCost(products[i])
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

function totalProductsCost(productCost) {
    let cartCost = localStorage.getItem('totalCost')

    if(cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + productCost.price)
    } else {
        localStorage.setItem('totalCost', productCost.price)
    }

}
let cartContainer = document.querySelector('.cart-container')

function cartDisplay() {
    let cartProduct = localStorage.getItem('productsInCart')
    cartProduct = JSON.parse(cartProduct)
    
    if(cartProduct && cartContainer.classList.contains('active')) {
        console.log('running');
    } else {
        console.log('nop');
    }
}

onLoadCartNumbers()
