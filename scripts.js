// Sample product data
const products = [
    {
        id: 1,
        title: "Midnight Oud",
        brand: "Luxury Scents",
        price: 89.99,
        image: "images/product1.jpg",
        category: "Men",
        isNew: true
    },
    {
        id: 2,
        title: "Rose Elegance",
        brand: "Floral Notes",
        price: 79.99,
        image: "images/product2.jpg",
        category: "Women",
        isNew: true
    },
    {
        id: 3,
        title: "Ocean Breeze",
        brand: "Aqua Scents",
        price: 65.99,
        image: "images/product3.jpg",
        category: "Unisex",
        isNew: false
    },
    {
        id: 4,
        title: "Vanilla Dream",
        brand: "Sweet Aromas",
        price: 72.99,
        image: "images/product4.jpg",
        category: "Women",
        isNew: false
    },
    {
        id: 5,
        title: "Woody Mystique",
        brand: "Nature Scents",
        price: 85.99,
        image: "images/product5.jpg",
        category: "Men",
        isNew: true
    },
    {
        id: 6,
        title: "Citrus Zest",
        brand: "Fresh Notes",
        price: 59.99,
        image: "images/product6.jpg",
        category: "Unisex",
        isNew: false
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    if (document.querySelector('.featured-products .products-grid')) {
        loadFeaturedProducts();
    }
    
    // Load new arrivals
    if (document.querySelector('.new-arrivals .products-grid')) {
        loadNewArrivals();
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize cart count
    updateCartCount();
});

// Load Featured Products
function loadFeaturedProducts() {
    const featuredGrid = document.querySelector('.featured-products .products-grid');
    const featuredProducts = products.slice(0, 4); // Get first 4 products as featured
    
    featuredGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        featuredGrid.appendChild(createProductCard(product));
    });
}

// Load New Arrivals
function loadNewArrivals() {
    const newArrivalsGrid = document.querySelector('.new-arrivals .products-grid');
    const newArrivals = products.filter(product => product.isNew);
    
    newArrivalsGrid.innerHTML = '';
    
    newArrivals.forEach(product => {
        newArrivalsGrid.appendChild(createProductCard(product));
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-brand">${product.brand}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to the button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(product.id);
    });
    
    return card;
}

// Add to Cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${product.title} has been added to your cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}