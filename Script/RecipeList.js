const data = JSON.parse(localStorage.getItem("ListOfRecipes")) ? JSON.parse(localStorage.getItem("ListOfRecipes")) : [];

data.map((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
        <div class="recipe-image">
        <img src="${recipe.image}" alt="Onion Rings" />
        <input type="checkbox" id="bookmark1" class="bookmark-checkbox" />
        <label for="bookmark1" class="bookmark-btn">
            <i class="bi bi-bookmark"></i>
            <i class="bi bi-bookmark-fill"></i>
        </label>
        </div>
        <div class="recipe-rating">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        </div>
        <h3>${recipe.name}</h3>
        <div class="recipe-info">
        <div class="author">
            <img
            src="https://ui-avatars.com/api/?name=Omar+Awad"
            alt="Alex Martin"
            />
            <span>Omar Awad</span>
        </div>
        <div class="calories">
            <i class="bi bi-fire"></i>
            120 cals
        </div>
        </div>
    `;
    document.querySelector(".cards").appendChild(recipeCard);
    console.log(recipeCard);
});
