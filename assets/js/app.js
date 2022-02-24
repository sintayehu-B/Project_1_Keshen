// import {
//     recipes
// } from "./recipes.js"

// let log = console.log

// let db

// document.addEventListener('DOMContentLoaded', () => {
//     let rDB = indexedDB.open('Recipes', 1)
    
//     rDB.onsuccess = () => {
//         log('Database Ready!!!')
//         db = rDB.result
//         // recipes.forEach((item, index) => {
//             //     log(item)
//             // })
//             addToDB()
//             displayRecipes()
//         }
        
//         rDB.onerror = () => {
//             log('Error Creating Database')
//         }
        
//         rDB.onupgradeneeded = (e) => {
//             log('Upgrade Complete!!!')
            
//             let db = e.target.result
            
//             let rStore = db.createObjectStore('Recipes', {
//                 key: 'id',
//                 autoIncrement: true
//             })
            
//             rStore.createIndex('Recipe', 'Recipe', {
//                 unique: true
//             })
            
//         log('Database Ready & Fields Created!!!')
//     }
    
//     function addToDB() {

//         let transaction = db.transaction(['Recipes'], 'readwrite')
//         let objectStore = transaction.objectStore('Recipes')

//         recipes.forEach((item, index) => {

//             let newRecipe = {
//                 foodName: item.foodName,
//                 prepTime: item.prepTime,
//                 recipe: item.recipe
//             }

//             // log(newRecipe)
//             objectStore.add(newRecipe)

//             transaction.oncomplete = () => {
//                 console.log('Recipe Added')
//             }

//             transaction.onerror = () => {
//                 console.log('Error Adding Recipe')
//             }

//         })
//     }


//     function displayRecipes() {
//         let objectStore = db.transaction('Recipes').objectStore('Recipes')
//         objectStore.openCursor().onsuccess = function (e) {
//             let cursor = e.target.result;

//             if (cursor) {
//                 log(cursor.value.foodName)
//                 cursor.continue();
//             }
//         }
//     }

// })

const search = document.querySelector('#search')
search.addEventListener('keyup', (e) => {
    e.preventDefault()
    const searchInput = e.target.value.toLowerCase()
    const titles = document.getElementsByClassName('foodName')
    console.log(searchInput)

    Array.from(titles).forEach((x) => {
        if(x.textContent.toLowerCase().indexOf(searchInput) != -1){
            x.parentElement.parentElement.style.display = 'block'
            console.log(x.parentElement)
        } else{
            x.parentElement.parentElement.style.display = 'none'
        }
    })
})