// drawer.js - Recipe detail drawer functionality
RecipeApp.drawer = {
    async showRecipeDetail(recipe) {
        this.populateDrawer(recipe);
        this.openDrawer();  
    },

    populateDrawer(recipe) {
        document.getElementById('drawer-title').textContent = recipe.title;
        document.getElementById('drawer-cuisine').textContent = recipe.cuisine || 'Not specified';
        document.getElementById('drawer-description').textContent = recipe.description || 'No description available';
        document.getElementById('drawer-total-time').textContent = recipe.total_time ? recipe.total_time + ' minutes' : 'Not specified';
        document.getElementById('drawer-cook-time').textContent = recipe.cook_time ? recipe.cook_time + ' minutes' : 'Not specified';
        document.getElementById('drawer-prep-time').textContent = recipe.prep_time ? recipe.prep_time + ' minutes' : 'Not specified';
        
        // Populate nutrition table
        const nutritionTbody = document.getElementById('nutrition-tbody');
        const nutrients = recipe.nutrients || {};
        
        const nutritionData = [
            { label: 'Calories', value: nutrients.calories },
            { label: 'Carbohydrate Content', value: nutrients.carbohydrateContent },
            { label: 'Cholesterol Content', value: nutrients.cholesterolContent },
            { label: 'Fiber Content', value: nutrients.fiberContent },
            { label: 'Protein Content', value: nutrients.proteinContent },
            { label: 'Saturated Fat Content', value: nutrients.saturatedFatContent },
            { label: 'Sodium Content', value: nutrients.sodiumContent },
            { label: 'Sugar Content', value: nutrients.sugarContent },
            { label: 'Fat Content', value: nutrients.fatContent }
        ];
        
        nutritionTbody.innerHTML = nutritionData.map(item => `
            <tr>
                <td>${item.label}</td>
                <td>${item.value || 'Not specified'}</td>
            </tr>
        `).join('');
    },

    openDrawer() {
        document.getElementById(RecipeApp.config.SELECTORS.DRAWER_OVERLAY).style.display = 'block';
        setTimeout(() => {
            document.getElementById(RecipeApp.config.SELECTORS.RECIPE_DRAWER).classList.add('open');
        }, 10);
    },

    closeDrawer() {
        document.getElementById(RecipeApp.config.SELECTORS.RECIPE_DRAWER).classList.remove('open');
        setTimeout(() => {
            document.getElementById(RecipeApp.config.SELECTORS.DRAWER_OVERLAY).style.display = 'none';
        }, 300);
    },

    toggleTimeDetails() {
        const timeDetails = document.getElementById('time-details');
        const expandable = document.querySelector('.expandable');
        
        if (timeDetails.classList.contains('expanded')) {
            timeDetails.classList.remove('expanded');
            expandable.classList.remove('expanded');
        } else {
            timeDetails.classList.add('expanded');
            expandable.classList.add('expanded');
        }
    }
};