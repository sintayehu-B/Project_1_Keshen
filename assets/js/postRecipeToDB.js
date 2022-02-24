import {
    recipes
} from "./recipes.js"

let log = console.log

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

        db.Recipes.put(newRecipe)
            .then(() => {
                log("Recipe Added.")
            })
            .catch((err) => log(err.message))

    })
}
// postRecipeToDB()

export default postRecipeToDB