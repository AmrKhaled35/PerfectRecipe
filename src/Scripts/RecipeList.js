document.addEventListener('DOMContentLoaded', async function () {
  const data = await fetchRecipesFromAPI();
  renderRecipes(data);
  initializeBookmarks();
  setupSearch();
});

async function fetchRecipesFromAPI() {
  try {
    const response = await fetch("https://omarsaberawad.pythonanywhere.com/recipes/");
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

function renderRecipes(data) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";
  data.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <div class="recipe-image">
        <a href="../RecipeDetails/RecipeDetails.html?id=${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.name}" />
        </a>
        <div class="recipe-actions left-actions">
          <button class="edit-btn" data-id="${recipe.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="delete-btn" data-id="${recipe.id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <input type="checkbox" class="bookmark-checkbox" />
        <label class="bookmark-btn">
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
          <img src="https://ui-avatars.com/api/?name=Omar+Awad" alt="Author" />
          <span>Omar Awad</span>
        </div>
        <div class="calories">
          <i class="bi bi-fire"></i>
          120 cals
        </div>
      </div>
    `;
    recipeCard.setAttribute('data-recipe-id', recipe.id);
    recipeCard.setAttribute('data-recipe', JSON.stringify({
      id: recipe.id,
      title: recipe.name,
      image: recipe.image,
      rating: recipeCard.querySelector('.recipe-rating').innerHTML,
      author: {
        name: "Omar Awad",
        avatar: "https://ui-avatars.com/api/?name=Omar+Awad"
      },
      calories: "120 cals"
    }));
    document.querySelector(".cards").appendChild(recipeCard);
  });
  
  setupActionButtons();
  initializeBookmarks();
}

async function setupActionButtons() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async function(e) {
      e.stopPropagation();
      const recipeId = this.getAttribute('data-id');
      const confirmDelete = confirm('Are you sure you want to delete this recipe?');
      
      if (confirmDelete) {
        try {
          const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipeId}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (response.ok) {
            alert('Recipe deleted successfully');
            const data = await fetchRecipesFromAPI();
            renderRecipes(data);
          } else {
            throw new Error('Failed to delete recipe');
          }
        } catch (error) {
          console.error('Error deleting recipe:', error);
          alert('Error occurred while deleting the recipe');
        }
      }
    });
  });
  
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', async function(e) {
      e.stopPropagation();
      const recipeId = this.getAttribute('data-id');
      
      try {
        const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipeId}/`);
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        
        const recipeData = await response.json();
        sessionStorage.setItem('currentRecipe', JSON.stringify(recipeData));
        window.location.href = `../AddRecipe/AddRecipe.html?edit=true&id=${recipeId}`;
        
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Error loading recipe for editing');
      }
    });
  });
}

function initializeBookmarks() {
  const recipeCards = document.querySelectorAll('.recipe-card');
  let favorites = getFavorites();
  recipeCards.forEach(card => {
    const checkbox = card.querySelector('.bookmark-checkbox');
    const label = card.querySelector('.bookmark-btn');
    const recipeId = card.getAttribute('data-recipe-id');
    const recipeData = JSON.parse(card.getAttribute('data-recipe'));
    const checkboxId = `bookmark-${recipeId}`;
    checkbox.id = checkboxId;
    label.setAttribute('for', checkboxId);
    if (favorites.some(fav => fav.id === recipeId)) {
      checkbox.checked = true;
      label.querySelector('.bi-bookmark-fill').style.display = 'block';
      label.querySelector('.bi-bookmark').style.display = 'none';
    }
    checkbox.addEventListener('change', function () {
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

function setupSearch() {
  const input = document.querySelector('.search-input');
  const button = document.querySelector('.search-button');
  if (!input || !button) return;

  button.addEventListener('click', () => {
    const query = input.value.trim();
    if (query !== '') searchRecipes(query);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = input.value.trim();
      if (query !== '') searchRecipes(query);
    }
  });

  input.addEventListener('input', async () => {
    if (input.value.trim() === '') {
      const data = await fetchRecipesFromAPI();
      renderRecipes(data);
    }
  });
}

async function searchRecipes(query) {
  try {
    const response = await fetch(`https://omarsaberawad.pythonanywhere.com/search/recipes/?search=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");
    const results = await response.json();
    renderRecipes(results);
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
}