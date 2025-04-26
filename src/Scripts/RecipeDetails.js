const recipes = [
  {
    id: 1,
    recipe_title: "Crispy Onion Rings",
    author_name: "John Smith",
    publish_date: "April 10, 2025",
    time: "15 mins",
    chill_time: "0 mins",
    category: "Appetizer",
    main_image: "../../../Public/assets/RecipeDetails/crispy1.jpg",
    instruction_image: "../../../Public/assets/RecipeDetails/crispy2.jpg",
    calories: "250",
    protein: "4g",
    carbohydrates: "30g",
    fat: "12g",
    sugars: "5g",
    calcium: "6%",
    nutrition_note: "Values are per serving (4 onion rings).",
    recipe_description:
      "Golden and crispy onion rings, perfect as a snack or side dish, with a light and crunchy batter.",
    point_item1: "Crispy Texture",
    point_item2: "Quick to Prepare",
    point_item3: "Kid-Friendly",
    point_item4: "Perfect for Parties",
    ingredients: [
      "2 large onions, sliced into rings",
      "1 cup all-purpose flour",
      "1 cup buttermilk",
      "1 cup breadcrumbs",
      "1 tsp paprika",
      "Oil for frying",
    ],
    instructions: [
      "Slice onions into 1/4-inch thick rings and separate.",
      "Dip onion rings in buttermilk, then coat in flour mixed with paprika.",
      "Dip again in buttermilk, then coat with breadcrumbs.",
      "Fry in hot oil until golden brown, about 2-3 minutes per side.",
      "Drain on paper towels and serve hot.",
    ],
    tip1_title: "Even Coating",
    tip1_content: "Ensure each ring is fully coated for maximum crunch.",
    tip2_title: "Oil Temperature",
    tip2_content: "Keep oil at 350°F for perfect frying.",
    tip3_title: "Serve Immediately",
    tip3_content: "Onion rings are best enjoyed fresh and hot.",
    variation1_title: "Spicy Onion Rings",
    variation1_content: "Add cayenne pepper to the flour for a spicy kick.",
    variation1_image: "../../../Public/assets/RecipeDetails/crispy3.jpg",
    variation2_title: "Beer-Battered Onion Rings",
    variation2_content: "Use beer instead of buttermilk for a richer flavor.",
    variation2_image: "../../../Public/assets/RecipeDetails/crispy4.jpg",
    variation3_title: "Baked Onion Rings",
    variation3_content: "Bake at 425°F for a lighter version.",
    variation3_image: "../../../Public/assets/RecipeDetails/crispy5.jpg",
  },
  {
    id: 2,
    recipe_title: "Toast with Tomato and Hummus",
    author_name: "Emma Wilson",
    publish_date: "April 12, 2025",
    time: "10 mins",
    chill_time: "0 mins",
    category: "Breakfast",
    main_image: "../../../Public/assets/RecipeDetails/toast1.jpg",
    instruction_image: "../../../Public/assets/RecipeDetails/toast2.jpeg",
    calories: "200",
    protein: "6g",
    carbohydrates: "25g",
    fat: "8g",
    sugars: "3g",
    calcium: "8%",
    nutrition_note: "Values are per serving (1 slice).",
    recipe_description:
      "A quick and healthy breakfast option with creamy hummus and fresh tomatoes on toasted bread.",
    point_item1: "Quick and Easy",
    point_item2: "Healthy Start",
    point_item3: "Customizable",
    point_item4: "Vegan-Friendly",
    ingredients: [
      "2 slices whole-grain bread",
      "1/2 cup hummus",
      "1 tomato, sliced",
      "1 tsp olive oil",
      "Pinch of salt and pepper",
      "Fresh basil leaves",
    ],
    instructions: [
      "Toast the bread slices until golden.",
      "Spread a generous layer of hummus on each slice.",
      "Top with tomato slices and drizzle with olive oil.",
      "Season with salt, pepper, and garnish with basil leaves.",
      "Serve immediately.",
    ],
    tip1_title: "Fresh Ingredients",
    tip1_content: "Use ripe tomatoes for the best flavor.",
    tip2_title: "Bread Choice",
    tip2_content: "Sourdough or whole-grain bread adds extra flavor.",
    tip3_title: "Add Protein",
    tip3_content: "Sprinkle with hemp seeds for a protein boost.",
    variation1_title: "Avocado Hummus Toast",
    variation1_content: "Add mashed avocado for extra creaminess.",
    variation1_image: "../../../Public/assets/RecipeDetails/toast3.jpeg",
    variation2_title: "Spicy Hummus Toast",
    variation2_content: "Use spicy hummus for a bold twist.",
    variation2_image: "../../../Public/assets/RecipeDetails/toast4.jpeg",
    variation3_title: "Mediterranean Toast",
    variation3_content: "Add feta and olives for a Mediterranean flair.",
    variation3_image: "../../../Public/assets/RecipeDetails/toast5.jpeg",
  },
  {
    id: 3,
    recipe_title: "Ham, Egg, and Spinach Rollups",
    author_name: "Michael Chen",
    publish_date: "April 14, 2025",
    time: "20 mins",
    chill_time: "0 mins",
    category: "Breakfast",
    main_image: "../../../Public/assets/RecipeDetails/ham1.jpg",
    instruction_image: "../../../Public/assets/RecipeDetails/ham2.jpeg",
    calories: "300",
    protein: "18g",
    carbohydrates: "15g",
    fat: "20g",
    sugars: "2g",
    calcium: "10%",
    nutrition_note: "Values are per serving (2 rollups).",
    recipe_description:
      "Savory rollups filled with ham, scrambled eggs, and fresh spinach, perfect for a hearty breakfast.",
    point_item1: "Protein-Packed",
    point_item2: "Portable Meal",
    point_item3: "Quick Prep",
    point_item4: "Great for Brunch",
    ingredients: [
      "4 large eggs",
      "4 slices ham",
      "1 cup fresh spinach",
      "1/4 cup shredded cheddar cheese",
      "1 tbsp butter",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Scramble eggs with salt and pepper in butter until just set.",
      "Lay out ham slices and place spinach leaves on each.",
      "Spoon scrambled eggs onto spinach and sprinkle with cheese.",
      "Roll up the ham slices tightly.",
      "Serve warm or at room temperature.",
    ],
    tip1_title: "Egg Texture",
    tip1_content: "Don’t overcook eggs to keep them soft.",
    tip2_title: "Cheese Options",
    tip2_content: "Try Swiss or mozzarella for different flavors.",
    tip3_title: "Make Ahead",
    tip3_content: "Prepare rollups the night before and reheat.",
    variation1_title: "Turkey Rollups",
    variation1_content: "Swap ham for turkey slices.",
    variation1_image: "../../../Public/assets/RecipeDetails/ham3.avif",
    variation2_title: "Veggie Rollups",
    variation2_content: "Add bell peppers for extra crunch.",
    variation2_image: "../../../Public/assets/RecipeDetails/ham4.jpeg",
    variation3_title: "Spicy Rollups",
    variation3_content: "Add hot sauce to the eggs for a kick.",
    variation3_image: "../../../Public/assets/RecipeDetails/ham5.jpeg",
  },
  {
    id: 4,
    recipe_title: "Chicken Ranch Wrap",
    author_name: "Sarah Johnson",
    publish_date: "April 16, 2025",
    time: "15 mins",
    chill_time: "0 mins",
    category: "Lunch",
    main_image: "../../../Public/assets/RecipeDetails/chicken1.webp",
    instruction_image: "../../../Public/assets/RecipeDetails/chicken2.jpg",
    calories: "350",
    protein: "25g",
    carbohydrates: "30g",
    fat: "15g",
    sugars: "4g",
    calcium: "10%",
    nutrition_note: "Values are per serving (1 wrap).",
    recipe_description:
      "A fresh and flavorful wrap filled with grilled chicken, ranch dressing, and crisp veggies, ideal for a quick lunch.",
    point_item1: "Quick Lunch",
    point_item2: "Customizable",
    point_item3: "Fresh Ingredients",
    point_item4: "Portable",
    ingredients: [
      "2 large flour tortillas",
      "1 cup grilled chicken, sliced",
      "1/2 cup romaine lettuce, chopped",
      "1/4 cup cherry tomatoes, halved",
      "1/4 cup ranch dressing",
      "1/4 cup shredded cheddar cheese",
    ],
    instructions: [
      "Lay tortillas flat and spread ranch dressing evenly.",
      "Layer lettuce, tomatoes, chicken, and cheese in the center.",
      "Fold the sides of the tortilla inward and roll tightly.",
      "Slice in half and serve immediately.",
    ],
    tip1_title: "Grill Perfectly",
    tip1_content: "Grill chicken to 165°F for safety.",
    tip2_title: "Crisp Veggies",
    tip2_content: "Use crisp, fresh veggies for the best texture.",
    tip3_title: "Wrap Tightly",
    tip3_content: "Roll tightly to prevent filling from spilling.",
    variation1_title: "Buffalo Chicken Wrap",
    variation1_content: "Toss chicken in buffalo sauce for a spicy version.",
    variation1_image: "../../../Public/assets/RecipeDetails/chicken3.jpg",
    variation2_title: "BBQ Chicken Wrap",
    variation2_content: "Use BBQ sauce instead of ranch.",
    variation2_image: "../../../Public/assets/RecipeDetails/chicken4.jpg",
    variation3_title: "Veggie Ranch Wrap",
    variation3_content: "Skip chicken for a vegetarian option.",
    variation3_image: "../../../Public/assets/RecipeDetails/chicken5.jpg",
  },
  {
    id: 5,
    recipe_title: "Tuna Mix Salad",
    author_name: "Lisa Brown",
    publish_date: "April 18, 2025",
    time: "10 mins",
    chill_time: "30 mins",
    category: "Lunch",
    main_image: "../../../Public/assets/RecipeDetails/tuna1.webp",
    instruction_image: "../../../Public/assets/RecipeDetails/tuna2.jpg",
    calories: "220",
    protein: "15g",
    carbohydrates: "10g",
    fat: "14g",
    sugars: "3g",
    calcium: "8%",
    nutrition_note: "Values are per serving (1 cup).",
    recipe_description:
      "A creamy and flavorful tuna salad with crunchy celery and pickles, perfect for sandwiches or as a dip.",
    point_item1: "High Protein",
    point_item2: "Make-Ahead",
    point_item3: "Versatile",
    point_item4: "Budget-Friendly",
    ingredients: [
      "2 cans (5 oz each) tuna, drained",
      "1/4 cup mayonnaise",
      "1/4 cup celery, diced",
      "2 tbsp pickles, diced",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Drain tuna and flake into a bowl.",
      "Add mayonnaise, celery, pickles, and lemon juice.",
      "Mix until well combined and season with salt and pepper.",
      "Chill for 30 minutes to let flavors meld.",
      "Serve on bread, crackers, or lettuce leaves.",
    ],
    tip1_title: "Drain Well",
    tip1_content: "Remove excess liquid from tuna for best texture.",
    tip2_title: "Add Crunch",
    tip2_content: "Include celery or apples for extra texture.",
    tip3_title: "Chill Time",
    tip3_content: "Chilling enhances flavor.",
    variation1_title: "Avocado Tuna Salad",
    variation1_content: "Add mashed avocado for creaminess.",
    variation1_image: "../../../Public/assets/RecipeDetails/tuna3.webp",
    variation2_title: "Spicy Tuna Salad",
    variation2_content: "Mix in hot sauce or jalapeños.",
    variation2_image: "../../../Public/assets/RecipeDetails/tuna4.webp",
    variation3_title: "Mediterranean Tuna Salad",
    variation3_content: "Add olives and feta cheese.",
    variation3_image: "../../../Public/assets/RecipeDetails/tuna5.jpg",
  },
  {
    id: 6,
    recipe_title: "Strawberry and Cherry Pancakes",
    author_name: "Olivia Davis",
    publish_date: "April 20, 2025",
    time: "20 mins",
    chill_time: "0 mins",
    category: "Breakfast",
    main_image: "../../../Public/assets/RecipeDetails/strawberry1.jpg",
    instruction_image: "../../../Public/assets/RecipeDetails/strawberry2.jpg",
    calories: "280",
    protein: "6g",
    carbohydrates: "40g",
    fat: "10g",
    sugars: "15g",
    calcium: "12%",
    nutrition_note: "Values are per serving (2 pancakes).",
    recipe_description:
      "Fluffy pancakes loaded with fresh strawberries and cherries, perfect for a sweet breakfast treat.",
    point_item1: "Fruity Flavor",
    point_item2: "Kid-Friendly",
    point_item3: "Quick Prep",
    point_item4: "Great for Brunch",
    ingredients: [
      "1 cup all-purpose flour",
      "1 cup milk",
      "1 egg",
      "1/2 cup strawberries, chopped",
      "1/2 cup cherries, pitted and chopped",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "Butter for cooking",
    ],
    instructions: [
      "Mix flour, sugar, and baking powder in a bowl.",
      "Whisk in milk and egg until smooth.",
      "Fold in strawberries and cherries.",
      "Heat a skillet with butter and pour 1/4 cup batter per pancake.",
      "Cook until bubbles form, flip, and cook until golden.",
    ],
    tip1_title: "Fresh Fruit",
    tip1_content: "Use ripe, fresh fruit for best flavor.",
    tip2_title: "Non-Stick Pan",
    tip2_content: "Use a non-stick skillet for easy flipping.",
    tip3_title: "Keep Warm",
    tip3_content: "Keep pancakes warm in a low oven.",
    variation1_title: "Blueberry Pancakes",
    variation1_content: "Swap strawberries and cherries for blueberries.",
    variation1_image: "../../../Public/assets/RecipeDetails/strawberry3.webp",
    variation2_title: "Chocolate Chip Pancakes",
    variation2_content: "Add chocolate chips for extra sweetness.",
    variation2_image: "../../../Public/assets/RecipeDetails/strawberry4.jpg",
    variation3_title: "Banana Pancakes",
    variation3_content: "Add mashed banana for a tropical twist.",
    variation3_image: "../../../Public/assets/RecipeDetails/strawberry5.jpg",
  },
];

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
