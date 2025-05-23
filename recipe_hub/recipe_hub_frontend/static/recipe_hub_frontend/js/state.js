// state.js - Application state management
RecipeApp.state = {
    currentPage: 1,
    pageSize: RecipeApp.config.DEFAULT_PAGE_SIZE,
    totalResults: 0,
    currentFilters: {},
    
    // State management methods
    setCurrentPage: function(page) {
        this.currentPage = page;
    },
    
    setPageSize: function(size) {
        this.pageSize = parseInt(size);
        this.currentPage = 1; // Reset to first page
    },
    
    setFilters: function(filters) {
        this.currentFilters = filters;
        this.currentPage = 1; // Reset to first page
    },
    
    clearFilters: function() {
        this.currentFilters = {};
        this.currentPage = 1;
    },
    
    getApiParams: function() {
        return new URLSearchParams({
            page: this.currentPage,
            limit: this.pageSize,
            ...this.currentFilters
        });
    },
    
    hasFilters: function() {
        return Object.keys(this.currentFilters).length > 0;
    }
};