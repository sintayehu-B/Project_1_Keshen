function voteUp(element) {
    const foodName = element.parentElement.parentElement.firstElementChild.firstElementChild.textContent

    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, imgSrc, recipe, description'
    })

    db.Recipes.where('foodName').equals(foodName).modify((value) => {
        value.likes += 1
    })
    .then(() => {
        window.location.reload()
    })
}

function voteDown(element) {
    const foodName = element.parentElement.parentElement.firstElementChild.firstElementChild.textContent

    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, imgSrc, recipe, description'
    })

    db.Recipes.where('foodName').equals(foodName).modify((value) => {
        value.likes -= 1
    })
    .then(() => {
        window.location.reload()
    })
}