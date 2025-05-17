document.addEventListener('DOMContentLoaded', async function () {
  await setupFavorites();
});

async function setupFavorites() {
  if (document.querySelector('.favorites-container')) {
    await initializeFavoritesPage();
    setupActionButtons();
  }
}

async function initializeFavoritesPage() {
  try {
    const favorites = await fetchFavoritesFromAPI();
    const favoritesContainer = document.getElementById('favorites-recipes');
    const emptyState = document.querySelector('.empty-state');
    const recipeCountSpan = document.querySelector('.recipe-count');
    
    recipeCountSpan.textContent = `(${favorites.length} Recipes)`;
    
    if (favorites.length === 0) {
      emptyState.style.display = 'block';
      favoritesContainer.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      favoritesContainer.style.display = 'grid';
      renderFavorites(favorites);
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchFavoritesFromAPI() {
  try {
    const response = await fetch("https://omarsaberawad.pythonanywhere.com/favourite/favourites/");
    if (!response.ok) throw new Error("Failed to fetch favorites");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderFavorites(favorites) {
  const favoritesContainer = document.getElementById('favorites-recipes');
  favoritesContainer.innerHTML = '';
  
  favorites.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    favoritesContainer.appendChild(recipeCard);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.setAttribute('data-recipe-id', recipe.id);
  
  card.innerHTML = `
    <div class="recipe-image">
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="selection-indicator">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <input type="checkbox" id="bookmark-${recipe.id}" class="bookmark-checkbox" checked />
      <label for="bookmark-${recipe.id}" class="bookmark-btn">
        <i class="bi bi-bookmark" style="display: none;"></i>
        <i class="bi bi-bookmark-fill" style="display: block; color: #E15B4E;"></i>
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
  
  const checkbox = card.querySelector('.bookmark-checkbox');
  checkbox.addEventListener('change', async function() {
    await removeFromFavorites(recipe.id);
  });
  
  return card;
}

async function removeFromFavorites(recipeId) {
  try {
    const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipeId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_favourite: false
      })
    });

    if (response.ok) {
      const card = document.querySelector(`.recipe-card[data-recipe-id="${recipeId}"]`);
      if (card) card.remove();
      updateRecipeCount();
    }
  } catch (error) {
    console.error(error);
  }
}

function updateRecipeCount() {
  const recipeCount = document.querySelectorAll('.recipe-card').length;
  const recipeCountSpan = document.querySelector('.recipe-count');
  const emptyState = document.querySelector('.empty-state');
  const favoritesContainer = document.getElementById('favorites-recipes');
  
  recipeCountSpan.textContent = `(${recipeCount} Recipes)`;
  
  if (recipeCount === 0) {
    emptyState.style.display = 'block';
    favoritesContainer.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    favoritesContainer.style.display = 'grid';
  }
}

async function clearAllFavorites() {
  if (confirm('Are you sure you want to remove all favorite recipes?')) {
    try {
      const response = await fetch("https://omarsaberawad.pythonanywhere.com/recipes/?is_favourite=true");
      if (!response.ok) throw new Error("Failed to fetch favorites");
      
      const favorites = await response.json();
      
      const updatePromises = favorites.map(recipe => 
        fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipe.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_favourite: false
          })
        })
      );
      
      await Promise.all(updatePromises);
      await initializeFavoritesPage();
    } catch (error) {
      console.error(error);
    }
  }
}

let isSelectionMode = false;
let selectedRecipes = [];

function setupActionButtons() {
  const deleteAllBtn = document.querySelector('.action-btn.delete');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', handleDeleteAction);
  }
  const selectBtn = document.querySelector('.action-btn:nth-child(1)');
  if (selectBtn) {
    selectBtn.addEventListener('click', toggleSelectionMode);
  }
  const selectAllBtn = document.querySelector('.action-btn:nth-child(2)');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', toggleSelectAll);
  }
  const sortButton = document.querySelector('.sort-button');
  if (sortButton) {
    sortButton.addEventListener('click', toggleSortMenu);
  }
}

function toggleSelectionMode() {
  const favoritesContainer = document.getElementById('favorites-recipes');
  const selectBtn = document.querySelector('.action-btn:nth-child(1)');
  
  isSelectionMode = !isSelectionMode;
  selectedRecipes = [];
  
  if (isSelectionMode) {
    favoritesContainer.classList.add('selection-mode');
    selectBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    const recipeCards = favoritesContainer.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
      card.addEventListener('click', toggleRecipeSelection);
    });
  } else {
    favoritesContainer.classList.remove('selection-mode');
    selectBtn.innerHTML = '<i class="fas fa-check-square"></i> Select';
    const recipeCards = favoritesContainer.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
      card.classList.remove('selected');
      card.removeEventListener('click', toggleRecipeSelection);
    });
  }
}

function toggleRecipeSelection(event) {
  if (event.target.closest('.bookmark-btn')) {
    event.stopPropagation();
    return;
  }
  
  const card = event.currentTarget;
  const recipeId = card.getAttribute('data-recipe-id');
  
  if (card.classList.contains('selected')) {
    card.classList.remove('selected');
    selectedRecipes = selectedRecipes.filter(id => id !== recipeId);
  } else {
    card.classList.add('selected');
    selectedRecipes.push(recipeId);
  }
}

function toggleSelectAll() {
  if (!isSelectionMode) {
    toggleSelectionMode();
  }
  
  const favoritesContainer = document.getElementById('favorites-recipes');
  const recipeCards = favoritesContainer.querySelectorAll('.recipe-card');
  const allBtn = document.querySelector('.action-btn:nth-child(2)');
  
  const allSelected = selectedRecipes.length === recipeCards.length;
  
  if (allSelected) {
    recipeCards.forEach(card => {
      card.classList.remove('selected');
    });
    selectedRecipes = [];
    allBtn.innerHTML = '<i class="fas fa-circle"></i> All';
  } else {
    selectedRecipes = [];
    recipeCards.forEach(card => {
      card.classList.add('selected');
      const recipeId = card.getAttribute('data-recipe-id');
      selectedRecipes.push(recipeId);
    });
    allBtn.innerHTML = '<i class="fas fa-check-circle"></i> All';
  }
}

async function handleDeleteAction() {
  if (isSelectionMode && selectedRecipes.length > 0) {
    if (confirm(`Are you sure you want to remove ${selectedRecipes.length} recipe(s)?`)) {
      try {
        const updatePromises = selectedRecipes.map(recipeId => 
          fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipeId}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              is_favourite: false
            })
          })
        );
        
        await Promise.all(updatePromises);
        toggleSelectionMode();
        await initializeFavoritesPage();
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    await clearAllFavorites();
  }
}

let isSortMenuOpen = false;

function toggleSortMenu() {
  const sortButton = document.querySelector('.sort-button');
  
  if (!isSortMenuOpen) {
    const sortMenu = document.createElement('div');
    sortMenu.className = 'sort-menu';
    sortMenu.innerHTML = `
      <div class="sort-option" data-sort="name-asc">Name (A-Z)</div>
      <div class="sort-option" data-sort="name-desc">Name (Z-A)</div>
      <div class="sort-option" data-sort="calories-asc">Calories (Low to High)</div>
      <div class="sort-option" data-sort="calories-desc">Calories (High to Low)</div>
    `;
    const buttonRect = sortButton.getBoundingClientRect();
    sortMenu.style.top = `${buttonRect.bottom + window.scrollY}px`;
    sortMenu.style.right = `${window.innerWidth - buttonRect.right}px`;
    
    document.body.appendChild(sortMenu);
    sortMenu.querySelectorAll('.sort-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const sortType = e.target.getAttribute('data-sort');
        sortFavorites(sortType);
        toggleSortMenu(); 
      });
    });
    document.addEventListener('click', closeSortMenuOnOutsideClick);
    
    isSortMenuOpen = true;
  } else {
    const sortMenu = document.querySelector('.sort-menu');
    if (sortMenu) {
      sortMenu.remove();
    }
    
    document.removeEventListener('click', closeSortMenuOnOutsideClick);
    
    isSortMenuOpen = false;
  }
}

function closeSortMenuOnOutsideClick(event) {
  const sortMenu = document.querySelector('.sort-menu');
  const sortButton = document.querySelector('.sort-button');
  
  if (sortMenu && !sortMenu.contains(event.target) && !sortButton.contains(event.target)) {
    toggleSortMenu();
  }
}

async function sortFavorites(sortType) {
  try {
    const favorites = await fetchFavoritesFromAPI();
    
    switch (sortType) {
      case 'name-asc':
        favorites.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        favorites.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'calories-asc':
        favorites.sort((a, b) => 120 - 120);
        break;
      case 'calories-desc':
        favorites.sort((a, b) => 120 - 120);
        break;
    }
    renderFavorites(favorites);
  } catch (error) {
    console.error(error);
  }
}