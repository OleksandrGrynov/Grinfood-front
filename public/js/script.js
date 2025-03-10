// ====== ГЛОБАЛЬНІ ЗМІННІ ======
let cart = [];
let totalPrice = 0;

document.addEventListener("DOMContentLoaded", function () {


    // ==== БУРГЕРНЕ МЕНЮ ====
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // ==== КОРЗИНА ====
    const cartBtn = document.querySelector(".cart-btn");
    const cartElement = document.getElementById("cart");

    if (cartBtn && cartElement) {
        cartBtn.addEventListener("click", function () {
            cartElement.style.display = (cartElement.style.display === "block") ? "none" : "block";
        });
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
    }

    // ==== ОНОВЛЕННЯ КОШИКА ====
    updateCart();
});

// ====== ФУНКЦІЇ ДЛЯ КОШИКА ======
function addToCart(name, price) {
    cart.push({ name, price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalPriceElement = document.getElementById("total-price");

    if (!cartList || !totalPriceElement) return;

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice;
    if (cartCount) cartCount.innerText = cart.length;
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

// ====== ПОКАЗ ТАХ ЗАПИТАНЬ (FAQ) ======
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        let answer = button.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

// ====== КНОПКА ПРОКРУТКИ ВГОРУ ======
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== СЛАЙДЕР ======
var Swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// ====== ТЕМНИЙ РЕЖИМ ======
const themeSwitch = document.getElementById("theme-switch");
if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// ====== ПОШУК ПО МЕНЮ ======
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        document.querySelectorAll("#menu-list li").forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(filter) ? "block" : "none";
        });
    });
}

// ====== ЧАТ-БОТ ======
const chatBtn = document.getElementById("chat-btn");
if (chatBtn) {
    chatBtn.addEventListener("click", function () {
        let chatBox = document.getElementById("chat-box");
        chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
    });
}

// ====== ЛОКАЛЬНИЙ ЛІЧИЛЬНИК ВІДВІДУВАНЬ ======
document.addEventListener("DOMContentLoaded", function () {
    let visits = localStorage.getItem("visits") || 0;
    visits++;
    localStorage.setItem("visits", visits);
    let visitCounter = document.getElementById("visit-counter");
    if (visitCounter) visitCounter.textContent = `Ви відвідали цю сторінку ${visits} раз(и)`;
});

// ====== ВИПЛИВАЮЧЕ СПОВІЩЕННЯ ПРО АКЦІЮ ======
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("discount-shown")) {
        let popup = document.getElementById("discount-popup");
        if (popup) popup.style.display = "block";
        localStorage.setItem("discount-shown", "true");
    }
});

function closePopup() {
    let popup = document.getElementById("discount-popup");
    if (popup) popup.style.display = "none";
}

// ====== ФОНОВИЙ ГРАДІЄНТ, ЩО МІНЯЄТЬСЯ ======
document.addEventListener("DOMContentLoaded", function () {
    const colors = ["#ff9966", "#ff5e62", "#6a11cb", "#2575fc"];
    let i = 0;

    function changeBackground() {
        document.body.style.background = `linear-gradient(to right, ${colors[i]}, ${colors[(i + 1) % colors.length]})`;
        i = (i + 1) % colors.length;
    }

    setInterval(changeBackground, 5000);
});

// ====== РОЗМИТТЯ ФОНУ ПРИ ВІДКРИТТІ КОШИКА ======
document.addEventListener("DOMContentLoaded", function () {
    const cart = document.getElementById("cart");
    const mainContent = document.querySelector("main");
    const cartBtn = document.querySelector(".cart-btn");

    if (cartBtn && cart && mainContent) {
        cartBtn.addEventListener("click", function () {
            cart.classList.toggle("show");
            mainContent.classList.toggle("blur-active");
        });
    }
});
