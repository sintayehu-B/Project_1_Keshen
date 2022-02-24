let log = console.log

const editLink = document.querySelector('#edit')
const deleteLink = document.querySelector('#delete')



var dbx = new Dexie("Recipes");
dbx.version(1).stores({
    Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
})

function edit(e) {
    let foodName = e.parentElement.firstElementChild.textContent

    dbx.Recipes.where('foodName').equals(foodName).each((x) => {
        let url = `edit.html?${foodName}`
        window.location.href = url
    })
}

function deleteRecipe(e) {
    
    let foodName = e.parentElement.firstElementChild.textContent

    dbx.Recipes.where('foodName').equals(foodName).delete().then(() => {
        log('Recipe Deleted')
        window.location.reload()
    })
}



document.addEventListener('DOMContentLoaded', () => {

    var db = new Dexie("tempDB");
    db.version(1).stores({
        tempDB: 'foodName, prepTime, recipe, description, ingredients'
    })
    db.tempDB.toArray((result) => {
        for (const iterator of result) {
            // log(iterator)



            let x = document.querySelector('.row')
            x.innerHTML = ''

            let output = `
            <div class="col-4 m-auto d-flex justify-content-around text-center mt-5 pt-5">
                <div class="card shadow">
                    <div class="card-body cardAdmin">

                        <img id="imgSrcCard" alt="" class="card-img" src="${iterator.imgSrc}">
                        <h3 id="" class="card-title pt-3">${iterator.foodName}</h3>

                        <hr>

                        <h3>Description</h3>
                        <p id="" class="card-description">${iterator.description}</p>

                        <h3>Preparation Time</h3>
                        <p id="">${iterator.prepTime}</p>

                        <h3>Ingredients</h3>
                        <div id="" class="text-center">${iterator.recipe.ingredients}</div>

                        <h3>Instruction</h3>
                        <div id="" class="text-center">${iterator.recipe.instruction}</div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-light mx-2 approveButton" id='' onclick="approveRecipe(this)">Approve 👍
                            </button>
                            <button type="button" class="btn btn-light disapproveButton" id='' onclick = "disapproveRecipe(this)">Disapprove 👎</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            x.innerHTML += output


        }
    })



    let pagination = document.querySelector('.pagination')
    pagination.style.display = 'none'

    dbx.Recipes.toArray((result) => {
        let x = document.querySelector('.editManage')
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
                                
                                <div>
                                    <a href="#" id="edit" onclick="edit(this)"><i class="far fa-edit color-tomato px-1"></i></a>
                                    <a href="#" id="delete" onclick="deleteRecipe(this)"><i class="fa fa-trash color-tomato" aria-hidden="true"></i></a>
                                </div>
                                
                            </div>
                            <hr>
                            <p class="card-text">${description}</p>
                            <div class="btn-group w-100" role="group" aria-label="">

                                <p class="card-text text-center likes w-100" id="likes">Likes: ${iterator.likes}</p>

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
        pagination.style.display = 'block'
    }, 2000);



})