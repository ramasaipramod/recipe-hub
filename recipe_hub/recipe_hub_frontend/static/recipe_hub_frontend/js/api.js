// api.js - API communication functions
RecipeApp.api = {
    async loadRecipes() {
        try {
            const params = RecipeApp.state.getApiParams();
            const hasFilters = RecipeApp.state.hasFilters();
            const baseUrl = hasFilters ? 
                RecipeApp.config.API_ENDPOINTS.SEARCH : 
                RecipeApp.config.API_ENDPOINTS.RECIPES;
            
            const response = await fetch(`${baseUrl}?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.message || 'API Error');
            }
            
            return data;
            
        } catch (error) {
            console.error('Error loading recipes:', error);
            throw error;
        }
    },
    
    // Helper function to check if results are empty
    hasResults(data) {
        return data.results && 
               ((Array.isArray(data.results) && data.results.length > 0) || 
                (typeof data.results === 'object' && Object.keys(data.results).length > 0)) && 
               data.count > 0;
    }
};