// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Cart Counter
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Initialize cart count from localStorage if available
if (localStorage.getItem('cartCount')) {
    cartCount = parseInt(localStorage.getItem('cartCount'));
    cartCountElement.textContent = cartCount;
}

// Function to update cart count
function updateCartCount(amount) {
    cartCount += amount;
    cartCountElement.textContent = cartCount;
    localStorage.setItem('cartCount', cartCount);
    
    // Add animation
    cartCountElement.classList.add('bump');
    setTimeout(() => {
        cartCountElement.classList.remove('bump');
    }, 300);
}

// Cart icon click event
document.querySelector('.fa-shopping-cart').addEventListener('click', (e) => {
    e.preventDefault();
    // In a real app, this would redirect to the cart page
    alert(`You have ${cartCount} items in your cart.`);
});

// Add to cart buttons (handled in shop.js)