// const searchBox = document.querySelector('.searchBox');
// const searchBtn = document.querySelector('.searchBtn');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// // Function to get recipes
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h2>Featching Recipes...</h2>"
//     const data =  await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${query}');
//     const response = await data.json();

//     recipeContainer.innerHTML = "";
//     response.meals.forEach(meal => {
//         const recipeDiv = document.createElement('div');
//         recipeDiv.classList.add('recipe');
//         recipeDiv.innerHTML =`
//         <img src="${meal.strMealThumb}">
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea}</span> Dish</p>
//         <p>Belongs to <span>${meal.strCategory}</span> Category</p>

//         `
//         const button = document.createElement('button');
//         button.textContent = "View Recipe";
//         recipeDiv.aapendChild(button);
//         // Addind EventListener to recipe button
//         button.addEventListener('click', () =>{
//             openRecipePopup(meal);
//         })
//         recipeContainer.appendChild(recipeDiv);
//     });
//     console.log(response);
// }
// // Function to fetch ingredients and measurements
// const fetchIngredients = () => {
//     let ingredients = "";
//     for (let i=1; i<=20; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         if(ingredient){
//             const measure = meal[`strMeasure${i}`];
//             ingredientList += `<li>${measure} ${ingredient}</li>`
//         }
//         else{
//             break;
//         }
//     }
//     return ingredientList;
// }

// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//     <h2>${meal.strMeal}</h2>
//     <h3>Ingredents:</h3>
//     <ul>${fetchIngredients(meal)}</ul>
//     <div>
//     <h3></h3>
//     `
//     recipeDetailsContent.parentElement.style.display = "block";
// }
// searchBtn.addEventListener('click', (e) =>{
// e.preventDefault();
// //local vareaible 
// const searchInput = searchBox.value.trim();
// fetchRecipes(searchInput);
// // console.log("Button Clicked");
// });














const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        if (!response.meals) {
            recipeContainer.innerHTML = "<h2>No recipes found</h2>";
            return;
        }

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
            
            // Adding EventListener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error fetching recipes. Please try again.</h2>";
        console.error("Error fetching recipes:", error);
    }

};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <h3>Instructions:</h3>
        <p class="recipeInstructions>${meal.strInstructions}</p>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// Search button event listener
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Local variable 
    const searchInput = searchBox.value.trim();
    if (searchInput === "") {
        recipeContainer.innerHTML = "<h2>Please enter a recipe name.</h2>";
        return;
    }
    fetchRecipes(searchInput);
});

//close button//
recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailsContent.parentElement.style.display = "none";
});






