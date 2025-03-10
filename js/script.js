document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript завантажено!");

    // ==== БУРГЕРНЕ МЕНЮ ====
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener("click", function () {
            console.log("Бургерне меню натиснуто!");
            navLinks.classList.toggle("active");
        });
    } else {
        console.error("Бургерне меню або список навігації не знайдено.");
    }

    // ==== КОРЗИНА (НА СТОРІНЦІ MENU) ====
    const cartBtn = document.querySelector(".cart-btn");
    const cart = document.getElementById("cart");

    if (cartBtn && cart) {
        cartBtn.addEventListener("click", function () {
            console.log("Кнопка кошика натиснута!");
            cart.style.display = (cart.style.display === "block") ? "none" : "block";
        });
    } else {
        console.warn("Кнопка кошика або сам кошик не знайдено.");
    }

    // ==== АКТИВНЕ МЕНЮ ====
    let currentPage = window.location.pathname.split("/").pop().replace(".html", "");

    let menuItems = {
        "index": "home",
        "about": "about",
        "services": "services",
        "menu": "menu",
        "contacts": "contacts"
    };

    if (menuItems[currentPage]) {
        document.getElementById(menuItems[currentPage]).classList.add("active");
    } else {
        console.warn("Актуальна сторінка не визначена.");
    }
});

// ==== ФУНКЦІЇ ДЛЯ КОШИКА ====
let cart = [];
let totalPrice = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalPriceElement = document.getElementById("total-price");

    if (!cartList || !cartCount || !totalPriceElement) {
        console.error("Кошик не знайдено!");
        return;
    }

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });

    cartCount.innerText = cart.length;
    totalPriceElement.innerText = totalPrice;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній! 🛒");
        return;
    }
    alert("Дякуємо за замовлення! 🎉");
    clearCart();
}
