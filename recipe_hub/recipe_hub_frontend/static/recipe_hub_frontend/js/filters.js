// filters.js - Filter management functions
RecipeApp.filters = {
    applyFilters() {
        const filters = {};
        
        const title = document.getElementById('title-filter').value.trim();
        if (title) filters.title = title;
        
        const cuisine = document.getElementById('cuisine-filter').value.trim();
        if (cuisine) filters.cuisine = cuisine; 
        
        const caloriesMin = document.getElementById('calories-min').value.trim();
        if (caloriesMin) filters.calories = '>=' + caloriesMin;
        
        const caloriesMax = document.getElementById('calories-max').value.trim();
        if (caloriesMax) filters.calories = '<=' + caloriesMax; 
        
        const rating = document.getElementById('rating-filter').value.trim();
        if (rating) filters.rating = rating;

        const timeMin = document.getElementById('time-min').value.trim();
        if (timeMin) filters.total_time = '>=' + timeMin;   

        const timeMax = document.getElementById('time-max').value.trim();
        if (timeMax) filters.total_time = '<=' + timeMax;

        RecipeApp.state.setFilters(filters);
        RecipeApp.main.loadRecipes();
    },

    clearFilters() {
        // Clear form fields
        document.getElementById('title-filter').value = '';
        document.getElementById('cuisine-filter').value = '';
        
        // Clear other filter fields if they exist
        const caloriesMin = document.getElementById('calories-min');
        const caloriesMax = document.getElementById('calories-max');
        const ratingFilter = document.getElementById('rating-filter');
        const timeMin = document.getElementById('time-min');
        const timeMax = document.getElementById('time-max');
        
        if (caloriesMin) caloriesMin.value = '';
        if (caloriesMax) caloriesMax.value = '';
        if (ratingFilter) ratingFilter.value = '';
        if (timeMin) timeMin.value = '';
        if (timeMax) timeMax.value = '';
        
        RecipeApp.state.clearFilters();
        RecipeApp.main.loadRecipes();
    },

    initEventListeners() {
        // Allow Enter key to trigger search
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.closest('.filters')) {
                RecipeApp.filters.applyFilters();
            }
        });
    }
};