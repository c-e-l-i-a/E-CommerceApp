import {products} from './products.js'

let addBtn = document.querySelectorAll('.add-cart')
let cartBtn = document.querySelector('.cart-icon')
let menuBtn = document.getElementById('icon-list')
let cartContainer = document.querySelector('.cart-container')


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


function cartDisplay() {
    let cartProduct = localStorage.getItem('productsInCart')
    cartProduct = JSON.parse(cartProduct)
    let productsContainer = document.querySelector('.cart-products-container')
    let cartCost = localStorage.getItem('totalCost')
    let totalPriceContainer = document.querySelector('.total-price-container')
    
    if(cartProduct && cartContainer.classList.contains('active')) {
        productsContainer.innerHTML = ''
        Object.values(cartProduct).map(item => {
            productsContainer.innerHTML += `
            <div class="cart-product">
            <img src="../images/${item.tag}" alt="image product" style="height: 120px;">
            <div class="product-info-container">
                <div class="product-cross"><i class="bi bi-x"></i></div>
                <div class="product-info">
                <h4 class="product-title">${item.name}</h4>
                <h5 class="price">${item.inCart * item.price} €</h5>
                <div class="product-info-number">
                    <i class="bi bi-dash"></i>
                    <span class="quantity">${item.inCart}</span>
                    <i class="bi bi-plus"></i>
                </div>
                </div>
            </div>
        </div>
            `
            totalPriceContainer.innerHTML = `
            <h5>SUBTOTAL</h5>
            <span class="total-price">${cartCost},00 €</span>
            `

        })
    } else {
        console.log('nop');
    }
}

onLoadCartNumbers()
