var db = new Dexie("tempDB");
db.version(1).stores({
    tempDB: 'foodName, likes, prepTime, description, imgSrc, recipe'
})

var dbx = new Dexie('Recipes')
dbx.version(1).stores({
    Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe'
})

function approveRecipe(element) {
    let headers = element.parentElement.parentElement.children
    const fn = headers[1].textContent
    // for (const header of headers) {
    //     log(header)
    // }
    db.tempDB.where("foodName").equals(fn).each(f => {
        const newFood = {
            foodName: f.foodName,
            prepTime: f.prepTime,
            likes: 0,
            description: f.description,
            imgSrc: f.imgSrc,
            recipe: f.recipe
        }
        log(newFood)
        dbx.Recipes.put(newFood).then(() => {
            log("Recipe has been approved")
        })
    })
    db.tempDB.where('foodName').equals(fn).delete().then(() => {
        log("Recipe has been deleted from tempDB")
        location.reload()
    })
}

function disapproveRecipe(element) {
    let headers = element.parentElement.parentElement.children
    const fn = headers[1].textContent
    // for (const header of headers) {
    //     log(header)
    // }
    db.tempDB.where("foodName").equals(fn).delete().then(() => {
        log('Recipe has been disapproved')
        log(fn + ' has been deleted from the tempDB database')
        location.reload()
    })
}