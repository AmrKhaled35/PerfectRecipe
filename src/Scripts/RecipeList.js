let isAdmin = false;

document.addEventListener('DOMContentLoaded', async function () {
  await Permesion();
  const data = await fetchRecipesFromAPI();
  renderRecipes(data);
  setupSearch();
});

async function Permesion() {
  const token = localStorage.getItem("Token");
  try {
    const response = await fetch("https://omarsaberawad.pythonanywhere.com/auth/current_user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    isAdmin = data.isAdmin;
  } catch (error) {
    console.error(error);
  }
}

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
        ${isAdmin ? `
        <div class="recipe-actions left-actions">
          <button class="edit-btn" data-id="${recipe.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="delete-btn" data-id="${recipe.id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>` : ''}
        <input type="checkbox" class="bookmark-checkbox" id="bookmark-${recipe.id}" ${recipe.is_favourite ? 'checked' : ''}/>
        <label for="bookmark-${recipe.id}" class="bookmark-btn">
            <i class="bi bi-bookmark" style="display: ${recipe.is_favourite ? 'none' : 'block'}"></i>
            <i class="bi bi-bookmark-fill" style="display: ${recipe.is_favourite ? 'block' : 'none'}"></i>
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
    
    const checkbox = recipeCard.querySelector('.bookmark-checkbox');
    checkbox.addEventListener('change', async function () {
      const isFavourite = this.checked;
      const label = recipeCard.querySelector('.bookmark-btn');
      const outlineIcon = label.querySelector('.bi-bookmark');
      const filledIcon = label.querySelector('.bi-bookmark-fill');
      try {
        const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipe.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_favourite: isFavourite
          })
        });
        if (response.ok) {
          outlineIcon.style.display = isFavourite ? 'none' : 'block';
          filledIcon.style.display = isFavourite ? 'block' : 'none';
        } else {
          this.checked = !isFavourite;
          throw new Error('Failed to update bookmark');
        }
      } catch (error) {
        console.error('Error updating bookmark:', error);
        this.checked = !isFavourite;
      }
    });

    cardsContainer.appendChild(recipeCard);
  });

  if (isAdmin) {
    setupActionButtons();
  }
}

async function setupActionButtons() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async function (e) {
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
            const data = await fetchRecipesFromAPI();
            renderRecipes(data);
          } else {
            throw new Error('Failed to delete recipe');
          }
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      }
    });
  });
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', async function (e) {
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
      }
    });
  });
}
function setupSearch() {
  const input = document.querySelector('.search-input');
  const button = document.querySelector('.search-button');

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
