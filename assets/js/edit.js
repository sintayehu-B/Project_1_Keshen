const log = console.log

var db = new Dexie("Recipes");
db.version(1).stores({
    Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
})

const url = window.location.href
const params = url.split('?')[1].split('&')

const foodName = document.querySelector('#foodName')
const prepTime = document.querySelector('#prepTime')
const imgSrc = document.querySelector('#imgSrc')
const description = document.querySelector('#description')
const instruction = document.querySelector('#instruction')
const ingredients = document.querySelector('#ingredients')

const submitButton = document.querySelector('#submit')

params.forEach((x) => {
    let y = (x.split('%20').join(' '))
    // log(y)
    db.Recipes.where('foodName').equals(y).each((q) => {
        foodName.value = q.foodName
        prepTime.value = q.prepTime
        imgSrc.value = q.imgSrc
        description.value = q.description

        q.recipe.instruction.forEach((ins) => {
            instruction.value = instruction.value + ins + '+'
        })

        q.recipe.ingredients.forEach((ing) => {
            ingredients.value = ingredients.value + ing + '+'
        })

        // log((ingredients.value.split('+')))

        // instruction.value = q.recipe.instruction
        // ingredients.value = q.recipe.ingredients
    })
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    var dbx = new Dexie("tempDB");
    dbx.version(1).stores({
        tempDB: 'foodName, likes, prepTime, imgSrc, ingredients, instruction, description'
    })

    let editedRecipe = {
        foodName: foodName.value,
        likes: 0,
        prepTime: prepTime.value,
        imgSrc: imgSrc.value,
        description: description.value,
        recipe: {
            ingredients: ingredients.value.split('+'),
            instruction: instruction.value.split('+')
        }
    }

    dbx.tempDB.put(editedRecipe).then(() => {
        log("Recipe Submitted")
        window.location.href = 'main.html'
    })
})

