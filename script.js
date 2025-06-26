// Initialize cart and wishlist arrays
let cart = [];
let wishlist = [];

// Function to add a product to the cart
function addToCart(productName, price) {
    const product = { name: productName, price };
    cart.push(product);
    updateCart();
}

// Function to remove a product from the cart
function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    updateCart();
}

// Function to add a product to the wishlist
function addToWishlist(productName) {
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
        updateWishlist();
    } else {
        alert(`${productName} is already in your wishlist!`);
    }
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const goToPayBtn = document.getElementById("goToPayBtn");
    if (!cartItems) {
        console.warn("Cart items element is missing in the DOM.");
        return;
    }
    if (!cartTotal) {
        console.warn("Cart total element is missing in the DOM.");
        return;
    }
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Show or hide the Go to Pay button
    if (goToPayBtn) {
        goToPayBtn.style.display = cart.length > 0 ? "inline-block" : "none";
    }
}

// Function to update the wishlist display
function updateWishlist() {
    const wishlistItems = document.getElementById("wishlistItems");
    if (!wishlistItems) {
        console.warn("Wishlist items element is missing in the DOM.");
        return;
    }

    wishlistItems.innerHTML = "";

    wishlist.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        wishlistItems.appendChild(li);
    });
}

// Add event listeners for buttons dynamically and payment page logic
document.addEventListener("DOMContentLoaded", () => {
    // Product button logic
    const buttons = document.querySelectorAll(".product-button");

    if (buttons.length === 0) {
        console.warn("No product buttons found in the DOM.");
        // Don't return here, as payment logic may still need to run
    } else {
        buttons.forEach(button => {
            const product = button.closest(".product");
            if (!product) {
                console.warn("Product element is missing in the DOM.");
                return;
            }

            const productNameElement = product.querySelector("h3");
            const productPriceElement = product.querySelector(".price");

            if (!productNameElement || !productPriceElement) {
                console.warn("Product name or price element is missing in the DOM.");
                return;
            }

            const productName = productNameElement.textContent;
            const productPrice = parseFloat(productPriceElement.textContent.replace("$", ""));

            if (isNaN(productPrice)) {
                console.warn(`Invalid price for product: ${productName}`);
                return;
            }

            if (button.textContent.includes("Add to Cart")) {
                button.addEventListener("click", () => addToCart(productName, productPrice));
            }

            if (button.textContent.includes("Remove from Cart")) {
                button.addEventListener("click", () => removeFromCart(productName));
            }

            if (button.textContent.includes("Add to Wishlist")) {
                button.addEventListener("click", () => addToWishlist(productName));
            }
        });
    }

    // Initialize cart and wishlist display
    updateCart();
    updateWishlist();

    // Go to Pay button logic
    const goToPayBtn = document.getElementById("goToPayBtn");
    if (goToPayBtn) {
        goToPayBtn.addEventListener("click", function() {
            // Save the cart total to localStorage for pay.html
            const cartTotal = document.getElementById("cartTotal");
            if (cartTotal) {
                const total = cartTotal.textContent.replace(/[^\d.]/g, "");
                localStorage.setItem("cartTotal", total);
            }
            window.location.href = "pay.html";
        });
    }

    // Payment page logic: confirmation and redirect after payment
    const paymentForm = document.getElementById('paymentForm');
    const confirmation = document.getElementById('confirmation');
    const amountInput = document.getElementById('amountInput');
    // Set the amount input to the cart total from localStorage (for pay.html)
    if (amountInput) {
        const total = localStorage.getItem("cartTotal");
        if (total) {
            amountInput.value = total;
        }
    }
    if (paymentForm && confirmation) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (confirm("Are you sure you want to pay?")) {
                paymentForm.style.display = 'none';
                confirmation.style.display = 'block';
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 2500);
            }
        });
    }
});

// Clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// --- SEARCH & SUGGESTIONS LOGIC ---

// Get all product names and categories for suggestions
function getProductData() {
    return Array.from(document.querySelectorAll('.product')).map(product => ({
        name: product.querySelector('h3').textContent,
        category: product.getAttribute('data-category')
    }));
}

const searchBar = document.getElementById('searchBar');
const suggestionsBox = document.getElementById('suggestions');

// Show product name suggestions (only for matches, not categories)
function showSuggestions(matches) {
    if (!suggestionsBox) return;
    suggestionsBox.innerHTML = '';
    if (matches.length > 0) {
        suggestionsBox.style.display = 'block';
        matches.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = item.name;
            div.onclick = function() {
                if (searchBar) searchBar.value = item.name;
                suggestionsBox.style.display = 'none';
                filterProducts(item.name);
                // After 2 seconds, reset search and show all products (simulate going "home")
                setTimeout(() => {
                    if (searchBar) searchBar.value = '';
                    filterProducts('');
                }, 2000);
            };
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = 'none';
    }
}

// Filter products by name or category
function filterProducts(query) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const category = product.getAttribute('data-category').toLowerCase();
        // If query matches product name or category, show it
        if (name.includes(query.toLowerCase()) || category.includes(query.toLowerCase())) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Main search bar logic (filters by name or category)
if (searchBar && suggestionsBox) {
    searchBar.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const productData = getProductData();
        if (query.length === 0) {
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
            filterProducts('');
            return;
        }
        // Suggest products matching name or category
        const matches = productData.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        showSuggestions(matches);
        filterProducts(query);
    });
}