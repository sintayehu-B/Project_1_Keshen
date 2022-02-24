function saveOnSession(foodName){
    sessionStorage.setItem('foodName', foodName)
    
    location.href='/recipe.html';
}