export function setupFavorites() {
    if (document.querySelector('.favorites-container')) {
      initializeFavoritesPage();
      setupActionButtons();
    } 
    else if (document.querySelector('.recipe-card')) {
      initializeBookmarks();
    }
  }
  function initializeFavoritesPage() {
    const favorites = getFavorites();
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
  }
  function renderFavorites(favorites) {
    const favoritesContainer = document.getElementById('favorites-recipes');
    favoritesContainer.innerHTML = '';
    
    favorites.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      favoritesContainer.appendChild(recipeCard);
    });
  }
  function createRecipeCard(recipe, selectable = false) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('data-recipe-id', recipe.id);
    
    card.innerHTML = `
      <div class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.title}" />
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
        ${recipe.rating}
      </div>
      <h3>${recipe.title}</h3>
      <div class="recipe-info">
        <div class="author">
          <img src="${recipe.author.avatar}" alt="${recipe.author.name}" />
          <span>${recipe.author.name}</span>
        </div>
        <div class="calories">
          <i class="bi bi-fire"></i>
          ${recipe.calories}
        </div>
      </div>
    `;
    
    const checkbox = card.querySelector('.bookmark-checkbox');
    checkbox.addEventListener('change', function() {
      removeFromFavorites(recipe.id);
    });
    
    return card;
  }
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
  function removeFromFavorites(recipeId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    initializeFavoritesPage();
  }
  function clearAllFavorites() {
    if (confirm('Are you sure you want to remove all favorite recipes?')) {
      localStorage.removeItem('favoriteRecipes');
      initializeFavoritesPage();
    }
  }
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
  let isSelectionMode = false;
  let selectedRecipes = [];
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
  

  function handleDeleteAction() {
    if (isSelectionMode && selectedRecipes.length > 0) {
      if (confirm(`Are you sure you want to remove ${selectedRecipes.length} recipe(s)?`)) {
        let favorites = getFavorites();
        favorites = favorites.filter(fav => !selectedRecipes.includes(fav.id));
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
        toggleSelectionMode();
        initializeFavoritesPage();
      }
    } else {
      clearAllFavorites();
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
  
  function sortFavorites(sortType) {
    let favorites = getFavorites();
    
    switch (sortType) {
      case 'name-asc':
        favorites.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        favorites.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'calories-asc':
        favorites.sort((a, b) => {
          const caloriesA = parseInt(a.calories.match(/\d+/)[0]);
          const caloriesB = parseInt(b.calories.match(/\d+/)[0]);
          return caloriesA - caloriesB;
        });
        break;
      case 'calories-desc':
        favorites.sort((a, b) => {
          const caloriesA = parseInt(a.calories.match(/\d+/)[0]);
          const caloriesB = parseInt(b.calories.match(/\d+/)[0]);
          return caloriesB - caloriesA;
        });
        break;
    }
    renderFavorites(favorites);
  }
  setupFavorites();