const filterContainer = document.querySelector('filter-container')
const select = document.querySelector('.select')
const arrow = document.querySelector('.arrow')
const menu = document.querySelector('.menu-filter')
const listMenu = document.querySelectorAll('.menu-filter li')
const selected = document.querySelector('.selected')
const figuresContainer = document.querySelectorAll('.figures-container')

/* FILTER MENU */

select.addEventListener('click', () => {
    select.classList.toggle('select-clicked')
    arrow.classList.toggle('arrow-rotate')
    menu.classList.toggle('menu-filter-open')
})

listMenu.forEach(element => {
    element.addEventListener('click', () => {
        selected.innerText = element.innerText
        select.classList.remove('select-clicked')
        arrow.classList.remove('arrow-rotate')
        menu.classList.remove('menu-filter-open')

        listMenu.forEach(element => {
            element.classList.remove('active')
        })
        element.classList.add('active')

        const value = element.textContent
        figuresContainer.forEach(figures => {
            figures.style.display = 'none'

            if(figures.getAttribute('data-filter') == value.toLocaleLowerCase() || value == 'All Figures') {
                figures.style.display = 'flex'
            }
        })
    })
    
});