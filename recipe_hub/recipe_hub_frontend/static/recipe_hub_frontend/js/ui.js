// ui.js - UI state management and display functions
RecipeApp.ui = {
    hideStates() {
        document.getElementById(RecipeApp.config.SELECTORS.EMPTY_STATE).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.ERROR_STATE).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.RESULTS_SECTION).style.display = 'block';
    },

    showEmptyState() {
        document.getElementById(RecipeApp.config.SELECTORS.RESULTS_SECTION).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.ERROR_STATE).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.EMPTY_STATE).style.display = 'block';
    },

    showErrorState() {
        document.getElementById(RecipeApp.config.SELECTORS.RESULTS_SECTION).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.EMPTY_STATE).style.display = 'none';
        document.getElementById(RecipeApp.config.SELECTORS.ERROR_STATE).style.display = 'block';
    },

    displayRecipes(data) {
        const tbody = document.getElementById(RecipeApp.config.SELECTORS.RECIPES_TBODY);
        console.log('Data:', data.results);
        tbody.innerHTML = '';
        
        // Handle both array and object formats
        const recipes = Array.isArray(data.results) ? data.results : Object.values(data.results);
        
        recipes.forEach(recipe => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="title-cell" title="${recipe.title}">${recipe.title}</td>
                <td>${recipe.cuisine || '-'}</td>
                <td>${this.renderRatingStars(recipe.rating) || '-'}</td>
                <td>${recipe.total_time || '-'}</td>
                <td>${recipe.serves || '-'}</td>
            `;
            row.onclick = () => RecipeApp.drawer.showRecipeDetail(recipe);
            tbody.appendChild(row);
        });
    },

    renderRatingStars(rating) {
        const maxStars = 5;
        const fullStars = Math.floor(rating);
        const remainder = rating - fullStars;
        let halfStar = 0;

        if (remainder > 0.5) {
            halfStar = 1;
        }

        const emptyStars = maxStars - fullStars - halfStar;
        let starsHTML = '';

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa fa-star" style="color: #f5c518;"></i>';
        }

        if (halfStar) {
            starsHTML += '<i class="fa fa-star-half-alt" style="color: #f5c518;"></i>';
        }

        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="fa fa-star-o" style="color: #f5c518;"></i>';
        }

        return starsHTML;
    },

    updateResultsInfo(data) {
        const info = document.getElementById(RecipeApp.config.SELECTORS.RESULTS_INFO);
        const start = (RecipeApp.state.currentPage - 1) * RecipeApp.state.pageSize + 1;
        const end = Math.min(RecipeApp.state.currentPage * RecipeApp.state.pageSize, data.count);
        
        info.textContent = `Showing ${start}-${end} of ${data.count} recipes`;
    },

    populateCuisineDropdown() {
        const select = document.getElementById('cuisine-filter');
        select.innerHTML = '<option value="">Select Cuisine</option>';

        RecipeApp.config.CUISINES.forEach(cuisine => {
            const option = document.createElement('option');
            option.value = cuisine;
            option.textContent = cuisine;
            select.appendChild(option);
        });
    }
};