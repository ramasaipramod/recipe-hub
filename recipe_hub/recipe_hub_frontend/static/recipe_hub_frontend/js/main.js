// main.js - Main application controller and initialization
RecipeApp.main = {
    // Initialize the application
    init() {
        RecipeApp.ui.populateCuisineDropdown();
        RecipeApp.filters.initEventListeners();
        this.loadRecipes();
    },

    // Main function to load and display recipes
    async loadRecipes() {
        try {
            const data = await RecipeApp.api.loadRecipes();

            // Check if we have results
            if (!RecipeApp.api.hasResults(data)) {
                RecipeApp.ui.showEmptyState();
                return;
            }

            // Display successful results
            RecipeApp.ui.displayRecipes(data);
            RecipeApp.pagination.updatePagination(data);
            RecipeApp.ui.updateResultsInfo(data);
            RecipeApp.ui.hideStates();

        } catch (error) {
            console.error('Error loading recipes:', error);
            RecipeApp.ui.showErrorState();
        }
    }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    RecipeApp.main.init();

    // Initialize Choices.js and store the instance globally
    const cuisineSelect = document.getElementById(RecipeApp.config.SELECTORS.CUISINE_FILTER);
    RecipeApp.choices = new Choices(cuisineSelect, {
        searchEnabled: true,
        placeholder: true,
        itemSelectText: '',
    });
});

// Global functions for backward compatibility (called from HTML)
function goToPage(page) {
    RecipeApp.pagination.goToPage(page);
}

function changePageSize() {
    RecipeApp.pagination.changePageSize();
}

function applyFilters() {
    RecipeApp.filters.applyFilters();
    if (RecipeApp.choices) {
        RecipeApp.choices.clearInput();
    }
}

function clearFilters() {
    RecipeApp.filters.clearFilters();
    if (RecipeApp.choices) {
        RecipeApp.choices.removeActiveItems();
        RecipeApp.choices.clearInput(); 
    }
}

function closeDrawer() {
    RecipeApp.drawer.closeDrawer();
}

function toggleTimeDetails() {
    RecipeApp.drawer.toggleTimeDetails();
}
