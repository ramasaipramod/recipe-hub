// pagination.js - Pagination functionality
RecipeApp.pagination = {
    updatePagination(data) {
        const pagination = document.getElementById(RecipeApp.config.SELECTORS.PAGINATION);
        const totalPages = Math.ceil(data.count / RecipeApp.state.pageSize);
        const currentPage = RecipeApp.state.currentPage;
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button onclick="RecipeApp.pagination.goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Previous
            </button>
        `;
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button onclick="RecipeApp.pagination.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span>...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button onclick="RecipeApp.pagination.goToPage(${i})" ${i === currentPage ? 'class="current-page"' : ''}>
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span>...</span>`;
            }
            paginationHTML += `<button onclick="RecipeApp.pagination.goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        paginationHTML += `
            <button onclick="RecipeApp.pagination.goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    },

    goToPage(page) {
        RecipeApp.state.setCurrentPage(page);
        RecipeApp.main.loadRecipes();
    },

    changePageSize() {
        const select = document.getElementById('page-size');
        RecipeApp.state.setPageSize(select.value);
        RecipeApp.main.loadRecipes();
    }
};