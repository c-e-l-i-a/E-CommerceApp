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


/* CLICK EVENT LISTENER */
for(let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalProductsCost(products[i])
    })
}

/* PRODUCTS NUMBER IN CART DISPLAY WHEN LOADING*/
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if(productNumbers) {
        document.querySelector('.cart-icon span').textContent = productNumbers
    }
    
}

/* ADD PRODUCT IN LOCAL STORAGE AND CART*/
function cartNumbers(product, quantityChange) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if(quantityChange) {
        localStorage.setItem('cartNumbers', productNumbers - 1)
        document.querySelector('.cart-icon span').textContent = productNumbers - 1
    } else if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart-icon span').textContent = productNumbers + 1

    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart-icon span').textContent = 1
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

/* TOTAL COST DISPLAY AND LOCAL STORAGE */
function totalProductsCost(productCost, quantityChange) {
    let cartCost = localStorage.getItem('totalCost')

    if(quantityChange) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost - productCost.price)
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + productCost.price)
    } else {
        localStorage.setItem('totalCost', productCost.price)
    }

}


/* DISPLAY PRODUCTS IN CART */
function cartDisplay() {
    let cartProduct = localStorage.getItem('productsInCart')
    cartProduct = JSON.parse(cartProduct)
    let productsContainer = document.querySelector('.cart-products-container')
    let cartCost = localStorage.getItem('totalCost')
    let totalPriceContainer = document.querySelector('.total-price-container')
    let checkoutBtn = document.querySelector('.checkout-btn')
    
    if(cartContainer) {

        totalPriceContainer.innerHTML = `
            <h5>SUBTOTAL</h5>
            <span class="total-price">00,00 €</span>
            `
    }
    
   if(cartProduct && cartContainer) {

        productsContainer.innerHTML = ''
        Object.values(cartProduct).map(item => {
            productsContainer.innerHTML += `
            <div class="cart-product">
            <img src="../images/${item.tag}.jpg" alt="image product" style="height: 120px;">
            <div class="product-info-container">
                <div class="product-cross"><i class="bi bi-x" id=""></i></div>
                <div class="product-info">
                <span class="product-title">${item.name}</span>
                <div class="price">${item.inCart * item.price} €</div>
                <div class="product-info-number">
                    <i class="bi bi-dash" id="bi-dash"></i>
                    <span class="quantity">${item.inCart}</span>
                    <i class="bi bi-plus" id="bi-plus"></i>
                </div>
                </div>
            </div>
        </div>
            `
        })

        totalPriceContainer.innerHTML = `
            <h5>SUBTOTAL</h5>
            <span class="total-price">${cartCost},00 €</span>
            `
            checkoutBtn.addEventListener('click', () => {
                window.location.assign("../checkout.html");
            })
        deleteProductsBtn()
        quantityChanges()

    }
}

function quantityChanges() {
    let decreaseBtn = document.querySelectorAll('.bi-dash')
    let increaseBtn = document.querySelectorAll('.bi-plus')
    let currentQuantity = 0
    let currentProduct = ''
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    for(let i=0; i < decreaseBtn.length; i++) {
        decreaseBtn[i].addEventListener('click', () => {
            currentQuantity = decreaseBtn[i].nextElementSibling.textContent
            console.log(currentQuantity);
            currentProduct = decreaseBtn[i].parentElement.parentElement.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim()
            
            if(cartItems[currentProduct].inCart > 1){
            cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1 
            console.log(currentProduct);
            cartNumbers(cartItems[currentProduct], 'decrease')
            totalProductsCost(cartItems[currentProduct], 'decrease')
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            cartDisplay()
            }

        })
    }

    for(let i=0; i < increaseBtn.length; i++) {
        increaseBtn[i].addEventListener('click', () => {
            currentQuantity = increaseBtn[i].previousElementSibling.textContent
            console.log(currentQuantity);

            currentProduct = increaseBtn[i].parentElement.parentElement.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim()
            
            
            cartItems[currentProduct].inCart = cartItems[currentProduct].inCart + 1 
            console.log(currentProduct);
            cartNumbers(cartItems[currentProduct])
            totalProductsCost(cartItems[currentProduct])
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            cartDisplay()
            
        })
    }
}

function deleteProductsBtn() {
    let deleteProductsBtn = document.querySelectorAll('.bi-x')
    let productName
    let productNumbers = localStorage.getItem('cartNumbers')
    let itemInCart = localStorage.getItem('productsInCart')
    itemInCart = JSON.parse(itemInCart)
    let totalCartCost = localStorage.getItem('totalCost')

    for(let i=0; i < deleteProductsBtn.length; i++){
        deleteProductsBtn[i].addEventListener('click', () => {
            productName = deleteProductsBtn[i].parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent.toLowerCase().replace(/ /g, '').trim()
            //console.log(productName);
            //console.log(itemInCart[productName].name + ' ' + itemInCart[productName].inCart);
            
            localStorage.setItem('cartNumbers', productNumbers - itemInCart[productName].inCart)

            //TOTAL COST UPDATE
            localStorage.setItem('totalCost', totalCartCost - (itemInCart[productName].price * itemInCart[productName].inCart))

            //DELETE IN LOCAL STORAGE
            delete itemInCart[productName]
            localStorage.setItem('productsInCart', JSON.stringify(itemInCart))

            cartDisplay()
            onLoadCartNumbers()
        })
    }
}

onLoadCartNumbers()
cartDisplay()