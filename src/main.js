const menuBtn = document.getElementById('icon-list')
const cartBtn = document.getElementById('icon-cart')

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
}

