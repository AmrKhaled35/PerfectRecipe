document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  if (recipeId) {
    fetchRecipeDetails(recipeId);
  } else {
    console.error("No recipe ID provided");
  }
});
async function fetchRecipeDetails(recipeId) {
  try {
    const response = await fetch(
      `https://omarsaberawad.pythonanywhere.com/recipes/${recipeId}/`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const recipe = await response.json();
    populateRecipeDetails(recipe);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

function populateRecipeDetails(recipe) {
  document.querySelector(".recipe-title").textContent =
    recipe.name || "No title";
  document.querySelector(".author-name").textContent = "Unknown author";
  document.querySelector(".publish-date").textContent = "Unknown date";
  document.querySelectorAll(".time")[0].textContent = "30 min";
  document.querySelectorAll(".time")[1].textContent = "15 min";
  document.querySelector(".header-item:last-child span").textContent =
    recipe.course_name || "Uncategorized";
  if (recipe.image) {
    document.querySelector(".main-image img").src = recipe.image;
    document.querySelector(".instruction-image img").src = recipe.image;
    document.querySelector(".chef-image img").src = recipe.image;
    document.querySelectorAll(".variation-card img").forEach((img) => {
      img.src = recipe.image;
    });
  }
  document.querySelector(
    ".nutrition-info ul li:nth-child(1) span:last-child"
  ).textContent = "120";
  document.querySelector(
    ".nutrition-info ul li:nth-child(2) span:last-child"
  ).textContent = "240";
  document.querySelector(
    ".nutrition-info ul li:nth-child(3) span:last-child"
  ).textContent = "100";
  document.querySelector(
    ".nutrition-info ul li:nth-child(4) span:last-child"
  ).textContent = "40";
  document.querySelector(
    ".nutrition-info ul li:nth-child(5) span:last-child"
  ).textContent = "50";
  document.querySelector(
    ".nutrition-info ul li:nth-child(6) span:last-child"
  ).textContent = "30";
  document.querySelector(".nutrition-note").textContent =
    "Nutrition information not available";
  document.querySelector(".recipe-description p").textContent =
    recipe.description || "No description available";
  document.querySelector(".point-item1 span").textContent = "Comfort Food";
  document.querySelector(".point-item2 span").textContent = "Crowd Pleaser";
  document.querySelector(".point-item3 span").textContent = "Customizable";
  document.querySelector(".point-item4 span").textContent =
    "Perfect for Gatherings";
  const ingredientsList = document.querySelector(".ingredients-list");
  ingredientsList.innerHTML = "<h2>Ingredients</h2>";
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    recipe.ingredients.forEach((ingredient, index) => {
      const div = document.createElement("div");
      div.className = "ingredient-item";
      div.innerHTML = `
              <input type="checkbox" id="ing${index + 1}">
              <label for="ing${index + 1}">${ingredient}</label>
          `;
      ingredientsList.appendChild(div);
    });
  } else {
    ingredientsList.innerHTML += "<p>No ingredients listed</p>";
  }
  const instructionsList = document.querySelector(".instructions-list");
  instructionsList.innerHTML = "";

  if (recipe.instructions) {
    const instructionSteps = recipe.instructions
      .split("\n")
      .filter((step) => step.trim() !== "");
    instructionSteps.forEach((instruction, index) => {
      const div = document.createElement("div");
      div.className = "instruction-item";
      div.innerHTML = `
              <span class="number">${index + 1}.</span>
              <span class="text">${instruction}</span>
          `;
      instructionsList.appendChild(div);
    });
  } else {
    instructionsList.innerHTML = "<p>No instructions provided</p>";
  }
  document.querySelector(".tip-item:nth-child(1) .tip-content h3").textContent =
    "Patty Thickness";
  document.querySelector(".tip-item:nth-child(1) .tip-content p").textContent =
    "Make patties slightly larger than buns as they shrink.";
  document.querySelector(".tip-item:nth-child(2) .tip-content h3").textContent =
    "Cheese Melt";
  document.querySelector(".tip-item:nth-child(2) .tip-content p").textContent =
    "Cover burger with lid to help cheese melt completely.";
  document.querySelector(".tip-item:nth-child(3) .tip-content h3").textContent =
    "Fry Crispiness";
  document.querySelector(".tip-item:nth-child(3) .tip-content p").textContent =
    "Double fry fries for extra crispiness.";
  document.querySelector(".variation-card:nth-child(1) h3").textContent =
    "Chicken Burger";
  document.querySelector(".variation-card:nth-child(1) p").textContent =
    "Use ground chicken instead of beef for lighter option.";
  document.querySelector(".variation-card:nth-child(2) h3").textContent =
    "Veggie Burger";
  document.querySelector(".variation-card:nth-child(2) p").textContent =
    "Use black bean patties for vegetarian version.";
  document.querySelector(".variation-card:nth-child(3) h3").textContent =
    "Bacon Burger";
  document.querySelector(".variation-card:nth-child(3) p").textContent =
    "Add crispy bacon strips for extra flavor.";
}
