
const recipes =
    [
    {
        "id": 1,
        "recipe_title": "Fruits",
        "author_name": "Amr Khaled",
        "publish_date": "2025-04-20",
        "category": "Dessert",
        "main_image": "../../../Public/assets/RecipeList/image1.jpeg",
        "calories": "22",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Alex+Khaled",
        "calories_info": "22 cals"
        },
        "rating": 5
    },
    {
        "id": 2,
        "recipe_title": "Fries and Burger",
        "author_name": "Anas Refaei",
        "publish_date": "2025-04-20",
        "category": "Main Course",
        "main_image": "../../../Public/assets/RecipeList/image2.jpg",
        "calories": "450",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Anas+Refaei",
        "calories_info": "450 cals"
        },
        "rating": 5
    },
    {
        "id": 3,
        "recipe_title": "Cooked Seafoods",
        "author_name": "Abdullah Islam",
        "publish_date": "2025-04-20",
        "category": "Seafood",
        "main_image": "../../../Public/assets/RecipeList/image3.jpg",
        "calories": "322",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Abdo+Islam",
        "calories_info": "322 cals"
        },
        "rating": 5
    },
    {
        "id": 4,
        "recipe_title": "Fries With Leaves",
        "author_name": "Zyad Ashraf",
        "publish_date": "2025-04-20",
        "category": "Side Dish",
        "main_image": "../../../Public/assets/RecipeList/image4.jpg",
        "calories": "322",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Zyad+Ashraf",
        "calories_info": "322 cals"
        },
        "rating": 5
    },
    {
        "id": 5,
        "recipe_title": "Sliced Cake",
        "author_name": "Beshr",
        "publish_date": "2025-04-20",
        "category": "Dessert",
        "main_image": "../../../Public/assets/RecipeList/image5.jpg",
        "calories": "322",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Beshr",
        "calories_info": "322 cals"
        },
        "rating": 5
    },
    {
        "id": 6,
        "recipe_title": "Spaghetti Sauce",
        "author_name": "Alex Martin",
        "publish_date": "2025-04-20",
        "category": "Sauce",
        "main_image": "../../../Public/assets/RecipeList/image6.jpg",
        "calories": "322",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Alex+Martin",
        "calories_info": "322 cals"
        },
        "rating": 5
    },
    {
        "id": 7,
        "recipe_title": "Grilled Chicken",
        "author_name": "Youssef",
        "publish_date": "2025-04-20",
        "category": "Main Course",
        "main_image": "../../../Public/assets/RecipeList/image7.jpg",
        "calories": "322",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Youssef",
        "calories_info": "322 cals"
        },
        "rating": 5
    },
    {
        "id": 8,
        "recipe_title": "Fried Potatoes",
        "author_name": "Omar Awad",
        "publish_date": "2025-04-20",
        "category": "Side Dish",
        "main_image": "../../../Public/assets/RecipeList/image8.jpg",
        "calories": "120",
        "recipe_info": {
        "author_avatar": "https://ui-avatars.com/api/?name=Omar+Awad",
        "calories_info": "120 cals"
        },
        "rating": 5
    }
    ]

const params = new URLSearchParams(window.location.search);
const recipeId = parseInt(params.get("id"));

const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

document.querySelector(".recipe-title").textContent =
selectedRecipe.recipe_title;

document.querySelector(".author-name").textContent = selectedRecipe.author_name;
document.querySelector(".publish-date").textContent =
selectedRecipe.publish_date;

document.querySelectorAll(".time")[0].textContent = selectedRecipe.time;
document.querySelectorAll(".time")[1].textContent = selectedRecipe.chill_time;

document.querySelector(".header-item:last-child span").textContent =
selectedRecipe.category;

document.querySelector(".main-image img").src = selectedRecipe.main_image;

document.querySelector(".instruction-image img").src =
selectedRecipe.instruction_image;

document.querySelector(
".nutrition-info ul li:nth-child(1) span:last-child"
).textContent = selectedRecipe.calories;
document.querySelector(
".nutrition-info ul li:nth-child(2) span:last-child"
).textContent = selectedRecipe.protein;
document.querySelector(
".nutrition-info ul li:nth-child(3) span:last-child"
).textContent = selectedRecipe.carbohydrates;
document.querySelector(
".nutrition-info ul li:nth-child(4) span:last-child"
).textContent = selectedRecipe.fat;
document.querySelector(
".nutrition-info ul li:nth-child(5) span:last-child"
).textContent = selectedRecipe.sugars;
document.querySelector(
".nutrition-info ul li:nth-child(6) span:last-child"
).textContent = selectedRecipe.calcium;
document.querySelector(".nutrition-note").textContent =
selectedRecipe.nutrition_note;

document.querySelector(".recipe-description p").textContent =
selectedRecipe.recipe_description;

document.querySelector(".point-item1 span").textContent =
selectedRecipe.point_item1;
document.querySelector(".point-item2 span").textContent =
selectedRecipe.point_item2;
document.querySelector(".point-item3 span").textContent =
selectedRecipe.point_item3;
document.querySelector(".point-item4 span").textContent =
selectedRecipe.point_item4;

const ingredientsList = document.querySelector(".ingredients-list");
ingredientsList.innerHTML = "<h2>Ingredients</h2>";
selectedRecipe.ingredients.forEach((ingredient, index) => {
const div = document.createElement("div");
div.className = "ingredient-item";
div.innerHTML = `
        <input type="checkbox" id="ing${index + 1}">
        <label for="ing${index + 1}">${ingredient}</label>
    `;
ingredientsList.appendChild(div);
});

const instructionsList = document.querySelector(".instructions-list");
instructionsList.innerHTML = "";
selectedRecipe.instructions.forEach((instruction, index) => {
const div = document.createElement("div");
div.className = "instruction-item";
div.innerHTML = `
        <span class="number">${index + 1}.</span>
        <span class="text">${instruction}</span>
    `;
instructionsList.appendChild(div);
});

document.querySelector(".tip-item:nth-child(1) .tip-content h3").textContent =
selectedRecipe.tip1_title;
document.querySelector(".tip-item:nth-child(1) .tip-content p").textContent =
selectedRecipe.tip1_content;
document.querySelector(".tip-item:nth-child(2) .tip-content h3").textContent =
selectedRecipe.tip2_title;
document.querySelector(".tip-item:nth-child(2) .tip-content p").textContent =
selectedRecipe.tip2_content;
document.querySelector(".tip-item:nth-child(3) .tip-content h3").textContent =
selectedRecipe.tip3_title;
document.querySelector(".tip-item:nth-child(3) .tip-content p").textContent =
selectedRecipe.tip3_content;

document.querySelector(".variation-card:nth-child(1) img").src =
selectedRecipe.variation1_image;
document.querySelector(".variation-card:nth-child(1) h3").textContent =
selectedRecipe.variation1_title;
document.querySelector(".variation-card:nth-child(1) p").textContent =
selectedRecipe.variation1_content;
document.querySelector(".variation-card:nth-child(2) img").src =
selectedRecipe.variation2_image;
document.querySelector(".variation-card:nth-child(2) h3").textContent =
selectedRecipe.variation2_title;
document.querySelector(".variation-card:nth-child(2) p").textContent =
selectedRecipe.variation2_content;
document.querySelector(".variation-card:nth-child(3) img").src =
selectedRecipe.variation3_image;
document.querySelector(".variation-card:nth-child(3) h3").textContent =
selectedRecipe.variation3_title;
document.querySelector(".variation-card:nth-child(3) p").textContent =
selectedRecipe.variation3_content;
