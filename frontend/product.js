document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Eternal Essence",
            brand: "LuxeParfum",
            category: "women",
            price: 120,
            originalPrice: 150,
            image: "https://via.placeholder.com/300x300?text=Eternal+Essence",
            scentType: "floral",
            isNew: true,
            rating: 4.5
        },
        {
            id: 2,
            name: "Noir Mystique",
            brand: "VelvetScents",
            category: "men",
            price: 95,
            originalPrice: 110,
            image: "https://via.placeholder.com/300x300?text=Noir+Mystique",
            scentType: "woody",
            isNew: false,
            rating: 4.2
        },
        {
            id: 3,
            name: "Aqua Breeze",
            brand: "PureAroma",
            category: "unisex",
            price: 75,
            originalPrice: 85,
            image: "https://via.placeholder.com/300x300?text=Aqua+Breeze",
            scentType: "fresh",
            isNew: true,
            rating: 4.0
        },
        {
            id: 4,
            name: "Vanilla Dream",
            brand: "SweetScents",
            category: "women",
            price: 65,
            originalPrice: 80,
            image: "https://via.placeholder.com/300x300?text=Vanilla+Dream",
            scentType: "sweet",
            isNew: false,
            rating: 4.3
        },
        {
            id: 5,
            name: "Tobacco Royal",
            brand: "VelvetScents",
            category: "men",
            price: 110,
            originalPrice: 130,
            image: "https://via.placeholder.com/300x300?text=Tobacco+Royal",
            scentType: "spicy",
            isNew: true,
            rating: 4.7
        },
        {
            id: 6,
            name: "Citrus Zest",
            brand: "PureAroma",
            category: "unisex",
            price: 60,
            originalPrice: 70,
            image: "https://via.placeholder.com/300x300?text=Citrus+Zest",
            scentType: "fresh",
            isNew: false,
            rating: 4.1
        },
        {
            id: 7,
            name: "Rose Elegance",
            brand: "LuxeParfum",
            category: "women",
            price: 135,
            originalPrice: 160,
            image: "https://via.placeholder.com/300x300?text=Rose+Elegance",
            scentType: "floral",
            isNew: false,
            rating: 4.6
        },
        {
            id: 8,
            name: "Leather & Oud",
            brand: "VelvetScents",
            category: "men",
            price: 150,
            originalPrice: 180,
            image: "https://via.placeholder.com/300x300?text=Leather+%26+Oud",
            scentType: "woody",
            isNew: true,
            rating: 4.8
        },
        {
            id: 9,
            name: "Coconut Paradise",
            brand: "SweetScents",
            category: "unisex",
            price: 70,
            originalPrice: 85,
            image: "https://via.placeholder.com/300x300?text=Coconut+Paradise",
            scentType: "sweet",
            isNew: false,
            rating: 4.2
        },
        {
            id: 10,
            name: "Jasmine Serenity",
            brand: "LuxeParfum",
            category: "women",
            price: 125,
            originalPrice: 145,
            image: "https://via.placeholder.com/300x300?text=Jasmine+Serenity",
            scentType: "floral",
            isNew: true,
            rating: 4.4
        },
        {
            id: 11,
            name: "Spice Route",
            brand: "VelvetScents",
            category: "men",
            price: 105,
            originalPrice: 125,
            image: "https://via.placeholder.com/300x300?text=Spice+Route",
            scentType: "spicy",
            isNew: false,
            rating: 4.3
        },
        {
            id: 12,
            name: "Ocean Mist",
            brand: "PureAroma",
            category: "unisex",
            price: 80,
            originalPrice: 95,
            image: "https://via.placeholder.com/300x300?text=Ocean+Mist",
            scentType: "fresh",
            isNew: true,
            rating: 4.5
        }
    ];

    // DOM elements
    const productsContainer = document.getElementById('products-container');
    const categoryLinks = document.querySelectorAll('.category-link');
    const brandFiltersContainer = document.querySelector('.brand-filters');
    const scentFiltersContainer = document.querySelector('.scent-filters');
    const priceSlider = document.getElementById('price-slider');
    const priceMaxDisplay = document.getElementById('price-max');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const resetFiltersBtn = document.getElementById('reset-filters');

    // State variables
    let currentCategory = 'all';
    let selectedBrands = [];
    let selectedScents = [];
    let maxPrice = 500;
    let currentSearchTerm = '';
    let currentSort = 'featured';
    let currentPage = 1;
    const productsPerPage = 6;

    // Initialize the page
    function init() {
        renderBrandFilters();
        renderScentFilters();
        renderProducts();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Category links
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentCategory = this.dataset.category;
                currentPage = 1;
                updateActiveCategory();
                renderProducts();
            });
        });

        // Price slider
        priceSlider.addEventListener('input', function() {
            maxPrice = parseInt(this.value);
            priceMaxDisplay.textContent = maxPrice;
            currentPage = 1;
            renderProducts();
        });

        // Search functionality
        searchBtn.addEventListener('click', function() {
            currentSearchTerm = searchInput.value.trim().toLowerCase();
            currentPage = 1;
            renderProducts();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                currentSearchTerm = searchInput.value.trim().toLowerCase();
                currentPage = 1;
                renderProducts();
            }
        });

        // Sorting
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            currentPage = 1;
            renderProducts();
        });

        // Pagination
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });

        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(getFilteredProducts().length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });

        // Reset filters
        resetFiltersBtn.addEventListener('click', function() {
            resetFilters();
        });
    }

    // Update active category in navigation
    function updateActiveCategory() {
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.category === currentCategory) {
                link.classList.add('active');
            }
        });
    }

    // Render brand filters
    function renderBrandFilters() {
        const brands = [...new Set(products.map(product => product.brand))];
        
        brandFiltersContainer.innerHTML = brands.map(brand => `
            <div class="filter-checkbox">
                <input type="checkbox" id="brand-${brand.toLowerCase()}" value="${brand}">
                <label for="brand-${brand.toLowerCase()}">${brand}</label>
            </div>
        `).join('');

        // Add event listeners to brand checkboxes
        document.querySelectorAll('.brand-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedBrands.push(this.value);
                } else {
                    selectedBrands = selectedBrands.filter(brand => brand !== this.value);
                }
                currentPage = 1;
                renderProducts();
            });
        });
    }

    // Render scent filters
    function renderScentFilters() {
        const scents = [...new Set(products.map(product => product.scentType))];
        
        scentFiltersContainer.innerHTML = scents.map(scent => `
            <div class="filter-checkbox">
                <input type="checkbox" id="scent-${scent.toLowerCase()}" value="${scent}">
                <label for="scent-${scent.toLowerCase()}">${scent.charAt(0).toUpperCase() + scent.slice(1)}</label>
            </div>
        `).join('');

        // Add event listeners to scent checkboxes
        document.querySelectorAll('.scent-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedScents.push(this.value);
                } else {
                    selectedScents = selectedScents.filter(scent => scent !== this.value);
                }
                currentPage = 1;
                renderProducts();
            });
        });
    }

    // Get filtered products based on current filters
    function getFilteredProducts() {
        return products.filter(product => {
            // Category filter
            if (currentCategory !== 'all' && product.category !== currentCategory) {
                return false;
            }
            
            // Brand filter
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
                return false;
            }
            
            // Scent type filter
            if (selectedScents.length > 0 && !selectedScents.includes(product.scentType)) {
                return false;
            }
            
            // Price filter
            if (product.price > maxPrice) {
                return false;
            }
            
            // Search filter
            if (currentSearchTerm && !product.name.toLowerCase().includes(currentSearchTerm) && 
                !product.brand.toLowerCase().includes(currentSearchTerm) && 
                !product.scentType.toLowerCase().includes(currentSearchTerm)) {
                return false;
            }
            
            return true;
        });
    }

    // Sort products
    function sortProducts(filteredProducts) {
        switch (currentSort) {
            case 'price-low':
                return [...filteredProducts].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...filteredProducts].sort((a, b) => b.price - a.price);
            case 'name-asc':
                return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return filteredProducts; // 'featured' - original order
        }
    }

    // Render products
    function renderProducts() {
        const filteredProducts = getFilteredProducts();
        const sortedProducts = sortProducts(filteredProducts);
        
        // Pagination
        const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
        const startIndex = (currentPage - 1) * productsPerPage;
        const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
        
        // Update pagination controls
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        pageInfo.textContent = totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : 'No products found';
        
        // Render product cards
        productsContainer.innerHTML = paginatedProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.isNew ? '<span class="product-badge">New</span>' : ''}
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            </div>
        `).join('') || '<p class="no-products">No products match your filters.</p>';
        
        // Add event listeners to product buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.closest('.product-card').dataset.id);
                addToCart(productId);
            });
        });
        
        document.querySelectorAll('.wishlist-btn').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                this.innerHTML = this.classList.contains('active') ? 
                    '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
            });
        });
    }

    // Add to cart function (simplified)
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            alert(`Added ${product.name} to your cart!`);
            // In a real app, you would update the cart state here
        }
    }

    // Reset all filters
    function resetFilters() {
        currentCategory = 'all';
        selectedBrands = [];
        selectedScents = [];
        maxPrice = 500;
        currentSearchTerm = '';
        currentSort = 'featured';
        currentPage = 1;
        
        // Update UI
        updateActiveCategory();
        priceSlider.value = maxPrice;
        priceMaxDisplay.textContent = maxPrice;
        searchInput.value = '';
        sortSelect.value = currentSort;
        
        // Uncheck all checkboxes
        document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        renderProducts();
    }

    // Initialize the application
    init();
});