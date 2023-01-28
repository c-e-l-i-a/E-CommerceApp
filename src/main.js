const menuBtn = document.getElementById('icon-list')

/*SCROLL FUNCTIONS*/

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

/*ACTIVE NAVBAR*/
 
menuBtn.onclick = function() {
   const navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle('active')

    if(navBar.classList.contains('active')){
        disableScroll()
    } else {
        enableScroll();
    }
}

