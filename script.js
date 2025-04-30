///
const products = [{
  image:'./images/IPHONE 13 PRO.jpg',
  name:'IPHONE 13 PRO',
  price: 134.99,},
  {
    image:'./images/travis_scott_dunk.jpg',
    name:'Travis Scott Dunk',
    price: 59.99,},
  {
    image:'./images/basketball.jpg',
    name:'Basketball',  
  price: 29.99,},
  {
    image:'./images/mountainbike.jpg',
    name:'Mountain Bike',
  price: 79.99,},
];


let productsHTML = '';

products.forEach((product) => {
  productsHTML= productsHTML + `
     <div class="product">
         <img src="${product.image}" alt="${product.name}"
         <h3>${product.name}</h3>
                   
         <p>Price: $${(product.priceCents/ 100).toFixed(2)}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
          <button onclick="removeFromCart('${product.name}', ${product.price}')">Remove from Cart</button>
          <button onclick="addToWishlist('${product.name}')">Add to Wishlist</button>
                    
                </div>`;
               
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;