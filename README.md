# ShopZone Online Shopping Platform

Welcome to **ShopZone**, a simple online shopping web application built with HTML, CSS, and JavaScript. This project demonstrates a basic e-commerce workflow, including product browsing, cart management, wishlist, search/filter functionality, and a simulated payment process.

---

## Features

- **Product Catalog:** Browse a variety of products, each with images, names, prices, and categories.
- **Add to Cart:** Add products to your shopping cart and see the total update automatically.
- **Remove from Cart:** Remove products from your cart at any time.
- **Wishlist:** Add products to your wishlist for future reference.
- **Search & Filter:** Use the search bar to filter products by name or category (e.g., type "shoes" to see only shoes).
- **Go to Pay:** When you have items in your cart, a "Go to Pay" button appears. Click it to proceed to the payment page.
- **Payment Simulation:** On the payment page, confirm your payment. After confirmation, a success message appears and you are redirected back to the home page.
- **Responsive Design:** The layout adapts to different screen sizes for a better user experience.

---

## How to Use

1. **Clone or Download the Repository**
   - Place all files (`index.html`, `pay.html`, `style.css`, `script.js`, and the `images` folder) in the same directory.

2. **Open `index.html` in Your Browser**
   - Browse products, add to cart or wishlist, and use the search bar to filter products.

3. **Checkout**
   - When ready, click the "Go to Pay" button to proceed to the payment page.

4. **Simulate Payment**
   - Fill in the payment form and confirm. You’ll see a success message and be redirected to the home page.

---

## File Structure

```
/online-shopping
│
├── index.html        # Main shopping page
├── pay.html          # Payment/checkout page
├── style.css         # Styles for all pages
├── script.js         # JavaScript for cart, wishlist, search, and payment logic
└── /images           # Product images
```

---

## Customization

- **Add More Products:**  
  Edit the `<section id="products">` in `index.html` to add or remove products.  
  Each product should have a `data-category` attribute for filtering.

- **Change Categories:**  
  Use any category name you like (e.g., "shoes", "electronics", "bikes", etc.).

- **Styling:**  
  Modify `style.css` to change the look and feel of your shop.

---

## Notes

- This project is for demonstration/learning purposes and does **not** include backend integration or real payment processing.
- All data is stored in memory or browser localStorage (for cart total transfer to payment page).
- Works best in modern browsers.

---



## License

This project is open source and free to use for learning and personal projects.

---

**Enjoy shopping with ShopZone!**