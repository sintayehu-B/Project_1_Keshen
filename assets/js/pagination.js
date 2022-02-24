log = console.log

document.addEventListener('DOMContentLoaded', () => {
    pagination()
})

const p = document.querySelector('.p')
const cards = document.querySelector('.row').children

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')


const maxItems = 12
let index = 1


function pagination() {
    setTimeout(() => {
        const pg = Math.ceil(cards.length / maxItems)
        // log(pg)
        prev.addEventListener('click', () => {
            index--
            log(index)
            check()
            show()
        })

        next.addEventListener('click', () => {
            index++
            log(index)
            check()
            show()
        })

        function check() {
            if (index == pg) {
                next.classList.add('disabled')
            } else {
                next.classList.remove('disabled')
            }

            if (index == 1) {
                prev.classList.add('disabled')
            } else {
                prev.classList.remove('disabled')
            }
        }

        function show() {

            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('show')
                cards[i].classList.add('hide')

                if (i >= (index * maxItems) - maxItems && i < index * maxItems) {
                    cards[i].classList.remove('hide')
                    cards[i].classList.add('show')
                }
            }

        }
        show()
        check()
    }, 1000);

}

