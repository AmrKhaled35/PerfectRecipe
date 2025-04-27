const data = JSON.parse(localStorage.getItem("ListOfRecipes")) ? JSON.parse(localStorage.getItem("ListOfRecipes")) : [];

data.map((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
        <div class="recipe-image">
        <a href="../RecipeDetails/RecipeDetails.html?id=${recipe.id}">
        <img src="${recipe.image}" alt="Onion Rings" />
        </a>
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


document.addEventListener('DOMContentLoaded', function() {
    initializeBookmarks();
  });
  function initializeBookmarks() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    let favorites = getFavorites();
    recipeCards.forEach((card, index) => {
      const recipeId = `recipe-${index + 1}`;
      const checkbox = card.querySelector('.bookmark-checkbox');
      const label = card.querySelector('.bookmark-btn');
      checkbox.id = `bookmark-${index + 1}`;
      label.setAttribute('for', `bookmark-${index + 1}`);
      card.setAttribute('data-recipe-id', recipeId);
      const recipeData = {
        id: recipeId,
        title: card.querySelector('h3').textContent,
        image: card.querySelector('.recipe-image img').src,
        rating: card.querySelector('.recipe-rating').innerHTML,
        author: {
          name: card.querySelector('.author span').textContent,
          avatar: card.querySelector('.author img').src
        },
        calories: card.querySelector('.calories').textContent.trim()
      };
      card.setAttribute('data-recipe', JSON.stringify(recipeData));
      if (favorites.some(fav => fav.id === recipeId)) {
        checkbox.checked = true;
        label.querySelector('.bi-bookmark-fill').style.display = 'block';
        label.querySelector('.bi-bookmark').style.display = 'none';
      }
      checkbox.addEventListener('change', function() {
        toggleBookmark(this, recipeData);
      });
    });
  }
  function toggleBookmark(checkbox, recipeData) {
    const label = document.querySelector(`label[for="${checkbox.id}"]`);
    const filledIcon = label.querySelector('.bi-bookmark-fill');
    const outlineIcon = label.querySelector('.bi-bookmark');
    let favorites = getFavorites();
    if (checkbox.checked) {
      filledIcon.style.display = 'block';
      outlineIcon.style.display = 'none';
      if (!favorites.some(fav => fav.id === recipeData.id)) {
        favorites.push(recipeData);
      }
    } else {
      filledIcon.style.display = 'none';
      outlineIcon.style.display = 'block';
      favorites = favorites.filter(fav => fav.id !== recipeData.id);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }
  function getFavorites() {
    const favoritesJson = localStorage.getItem('favoriteRecipes');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

