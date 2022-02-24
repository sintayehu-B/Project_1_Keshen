log = console.log
const search = document.querySelector('#search')
const titles = document.getElementsByClassName('foodName')
// log(titles)

const cardContainer = document.querySelectorAll('.card-container')
// let pagination = document.querySelector('.pagination')
// log(searchResult)



search.addEventListener('keyup', (e) => {
    e.preventDefault()
    const searchInput = e.target.value.toLowerCase()
    log(searchInput)

    Array.from(titles).forEach((x) => {
        if(x.textContent.toLowerCase().indexOf(searchInput) > -1){
            let found = x
            found.classList.remove('display-none')
            // searchResult.appendChild(found)
            // log(found)
            // pagination.style.display = 'none'
        } else{
            let found = x
            found.classList.add('display-none')
        }
    })
    
})
