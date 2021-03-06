let log = console.log

const editLink = document.querySelector('#edit')

var db = new Dexie("Recipes");
db.version(1).stores({
    Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
})

function edit(e) {
    let foodName = e.parentElement.firstElementChild.textContent

    db.Recipes.where('foodName').equals(foodName).each((x) => {
        let url = `edit.html?${foodName}`
        window.location.href = url
    })
}
document.addEventListener('DOMContentLoaded', () => {

    let pagination = document.querySelector('.pagination')
    pagination.style.display = 'none'

    let footer = document.querySelector('.footer')
    footer.style.display = 'none'

    db.Recipes.toArray((result) => {
        let x = document.querySelector('.row')
        x.innerHTML = ''
        for (const iterator of result) {

            // Limit the description to 9 words os the card is not too long
            function truncate (text, limit, append) {
                if (typeof text !== 'string')
                return '';
                if (typeof append == 'undefined')
                append = '...';
                var parts = text.split(' ');
                if (parts.length > limit) {
                    // loop backward through the string
                    for (var i = parts.length - 1; i > -1; --i) {
                        // if i is over limit, drop this word from the array
                        if (i+1 > limit) {
                            parts.length = i;
                        }
                    }
                    // add the truncate append text
                    parts.push(append);
                }
                // join the array back into a string
                return parts.join(' ');
            }
            
            let str = iterator.description
            let description = truncate(str, 9, '...')
            // log(description)

            // x.innerHTML = loading

            let output = `
            <div class="col-md-3 col-lg-3 col-12 my-2 foodName" id="${iterator.foodName.split(' ').join('')}">
                <div class="card-container my-2">

                    <div class="card text-center">
                        <img src="${iterator.imgSrc}" class="card-img-top imgSrcCard" alt="">
                        <div class="card-body">
                            <div class="title w-100 d-flex justify-content-between">
                                <h5 class="card-title">${iterator.foodName}</h5>
                                <a href="#" id="edit" onclick="edit(this)"><i class="far fa-edit color-tomato px-1"></i></a>
                            </div>
                            <hr>
                            <p class="card-text">${description}</p>
                            <div class="btn-group w-100" role="group" aria-label="">
                                <button type="button" class="btn btn-light thumbs-up" id=''
                                    onclick="voteUp(this)">????</button>
                                <p class="card-text text-center likes mx-3" id="likes">${iterator.likes}</p>
                                <button type="button" class="btn btn-light thumbs-down" id=''
                                    onclick="voteDown(this)">????</button>
                            </div>
                            <div class="btn-group w-75 mt-2" role="group" aria-label="">
                                <button type="button" class="btn btn-recipe text-white" id=''
                                    onclick="saveOnSession('${iterator.foodName}')">View Recipe</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `

            x.innerHTML += output
        }
    })
    setTimeout(() => {
        footer.style.display = 'block'
        pagination.style.display = 'block'
    }, 2000);


})