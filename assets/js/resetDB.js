import {
    recipes
} from "./recipes.js"

let log = console.log

const resetDB = document.querySelector('#resetDB')
resetDB.addEventListener('click', postRecipeToDB)

function postRecipeToDB() {
    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
    })
    recipes.forEach((item, index) => {

        let newRecipe = {
            foodName: item.foodName,
            likes: item.likes,
            prepTime: item.prepTime,
            description: item.description,
            imgSrc: item.imgSrc,
            recipe: item.recipe
        }

        db.Recipes.add(newRecipe)
            .then(() => {
                log("Recipe Added.")
                location.reload()
            })
            .catch((err) => log(err.message))

    })
}