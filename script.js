const products = [

{
    id: 1,
    name: "Wireless Headphones",
    category: "Audio",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
},

{
    id: 2,
    name: "Gaming Mouse",
    category: "Gaming",
    price: 999,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
},

{
    id: 3,
    name: "Smart Watch",
    category: "Accessories",
    price: 2999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
},

{
    id: 4,
    name: "Keyboard",
    category: "Gaming",
    price: 1499,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400"
}

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let currentCategory = "All";

// DISPLAY PRODUCTS
function displayProducts(filter = "") {

const container = document.getElementById("productContainer");

container.innerHTML = "";

products

.filter(product => {

    const matchSearch =
    product.name.toLowerCase().includes(filter.toLowerCase());

    const matchCategory =
    currentCategory === "All" ||
    product.category === currentCategory;

    return matchSearch && matchCategory;
})

.forEach(product => {

    container.innerHTML += `

    <div class="card">

        <img src="${product.image}">

        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <h4>₹${product.price}</h4>

        <button onclick="addToCart(${product.id})">
            Add to Cart
        </button>

    </div>
    `;
});

}

// ADD TO CART
function addToCart(id) {

const product = products.find(p => p.id === id);

const existing = cart.find(item => item.id === id);

if (existing) {
    existing.quantity++;
}

else {

    cart.push({
        ...product,
        quantity: 1
    });
}

showToast();

updateCart();
}

// UPDATE CART
function updateCart() {

const cartItems = document.getElementById("cartItems");

const total = document.getElementById("total");

const cartCount = document.getElementById("cartCount");

cartItems.innerHTML = "";

let totalPrice = 0;
let totalItems = 0;

cart.forEach(item => {

    totalPrice += item.price * item.quantity;

    totalItems += item.quantity;

    cartItems.innerHTML += `

    <li>

        <div>
            ${item.name} <br>
            ₹${item.price} x ${item.quantity}
        </div>

        <div class="cart-buttons">

            <button class="qty-btn"
            onclick="changeQty(${item.id}, -1)">
            -
            </button>

            <button class="qty-btn"
            onclick="changeQty(${item.id}, 1)">
            +
            </button>

            <button class="remove-btn"
            onclick="removeItem(${item.id})">
            Remove
            </button>

        </div>

    </li>
    `;
});

total.textContent = totalPrice;

cartCount.textContent = totalItems;

localStorage.setItem("cart", JSON.stringify(cart));
}

// CHANGE QUANTITY
function changeQty(id, change) {

const item = cart.find(i => i.id === id);

item.quantity += change;

if (item.quantity <= 0) {
    removeItem(id);
}

updateCart();
}

// REMOVE ITEM
function removeItem(id) {

cart = cart.filter(item => item.id !== id);

updateCart();
}

// CATEGORY FILTER
function filterCategory(category) {

currentCategory = category;

displayProducts(
document.getElementById("searchInput").value
);
}

// SEARCH
document.getElementById("searchInput")
.addEventListener("input", e => {

displayProducts(e.target.value);

});

// DARK MODE
document.getElementById("themeBtn")
.addEventListener("click", () => {

document.body.classList.toggle("dark");

});

// TOAST
function showToast() {

const toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 1500);
}

// START
displayProducts();

updateCart();