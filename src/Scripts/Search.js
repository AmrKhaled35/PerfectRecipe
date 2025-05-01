document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.icon-link .fa-search');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    if (!searchIcon) {
      console.error('Search icon not found');
      return;
    }
  
    const searchOverlay = createSearchOverlay();
    let searchTimeout;
    document.body.appendChild(searchOverlay);
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSearchOverlay(true);
    });
    const overlaySearchInput = searchOverlay.querySelector('.search-form input');
    overlaySearchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();
      
      if (query.length > 2) {
        showLoading();
        searchTimeout = setTimeout(() => {
          searchRecipes(query);
        }, 500);
      }
    });
    if (searchInput && searchButton) {
      searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query.length > 2) {
          filterRecipeCards(query);
        }
      });
  
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const query = this.value.trim();
          if (query.length > 2) {
            filterRecipeCards(query);
          }
        }
      });
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        toggleSearchOverlay(false);
      }
    });
  });
  
  function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-header">
          <h2>Search Recipes</h2>
          <button class="close-search">×</button>
        </div>
        <form class="search-form" onsubmit="return false;">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search for recipes..." autofocus>
        </form>
        <div class="search-results"></div>
      </div>
    `;
    overlay.querySelector('.close-search').addEventListener('click', () => {
      toggleSearchOverlay(false);
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        toggleSearchOverlay(false);
      }
    });
  
    return overlay;
  }
  
  function toggleSearchOverlay(show) {
    const overlay = document.querySelector('.search-overlay');
    const searchInput = overlay.querySelector('input');
    
    if (show) {
      document.body.style.overflow = 'hidden';
      overlay.classList.add('active');
      searchInput.focus();
    } else {
      document.body.style.overflow = '';
      overlay.classList.remove('active');
      searchInput.value = '';
      clearResults();
    }
  }
  
  function showLoading() {
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Searching recipes...</p>
      </div>
    `;
  }
  
  function clearResults() {
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = '';
  }
  
  function filterRecipeCards(query) {
    const cards = document.querySelectorAll('.recipe-card');
    let hasVisibleCards = false;
    
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const author = card.querySelector('.author span').textContent.toLowerCase();
      const calories = card.querySelector('.calories').textContent.toLowerCase();
      const searchQuery = query.toLowerCase();
      
      if (title.includes(searchQuery) || 
          author.includes(searchQuery) || 
          calories.includes(searchQuery)) {
        card.style.display = '';
        hasVisibleCards = true;
      } else {
        card.style.display = 'none';
      }
    });
    let noResultsMsg = document.querySelector('.no-results-message');
    if (!hasVisibleCards) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #666;">
            <i class="fas fa-search" style="font-size: 3rem; color: #c97862; margin-bottom: 1rem;"></i>
            <h3>No recipes found</h3>
            <p>We couldn't find any recipes matching "${query}"</p>
          </div>
        `;
        document.querySelector('.cards').appendChild(noResultsMsg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  function searchRecipes(query) {
    const allRecipes = Array.from(document.querySelectorAll('.recipe-card'));
    const results = allRecipes.filter(recipe => {
      const title = recipe.querySelector('h3').textContent.toLowerCase();
      const author = recipe.querySelector('.author span').textContent.toLowerCase();
      const calories = recipe.querySelector('.calories').textContent.toLowerCase();
      const searchQuery = query.toLowerCase();
      
      return title.includes(searchQuery) || 
             author.includes(searchQuery) || 
             calories.includes(searchQuery);
    });
  
    displayResults(results, query);
  }
  
  function displayResults(results, query) {
    const resultsContainer = document.querySelector('.search-results');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No recipes found</h3>
          <p>We couldn't find any recipes matching "${query}"</p>
        </div>
      `;
      return;
    }
  
    resultsContainer.innerHTML = results.map(recipe => {
      const image = recipe.querySelector('.recipe-image img').src;
      const title = recipe.querySelector('h3').textContent;
      const rating = recipe.querySelector('.recipe-rating').innerHTML;
      const author = recipe.querySelector('.author span').textContent;
      const calories = recipe.querySelector('.calories').textContent;
  
      return `
        <a href="#" class="result-card">
          <div class="result-image">
            <img src="${image}" alt="${title}">
          </div>
          <div class="result-content">
            <h3>${title}</h3>
            <div class="recipe-rating">${rating}</div>
            <div class="result-meta">
              <span><i class="fas fa-user"></i> ${author}</span>
              <span><i class="bi bi-fire"></i> ${calories}</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }