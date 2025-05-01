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

// Add event listeners for buttons dynamically
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-button");

    if (buttons.length === 0) {
        console.warn("No product buttons found in the DOM.");
        return;
    }

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
});

// Clear the cart
function clearCart() {
    cart = [];
    updateCart();
}