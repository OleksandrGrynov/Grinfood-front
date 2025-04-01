
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// ====== КЛАС ДЛЯ КОШИКА ======
class ShoppingCart {
    constructor() {
        this.items = this.loadCart() || [];  // Завантажуємо кошик із LocalStorage або створюємо новий
        this.total = this.calculateTotal();
        this.cartList = document.getElementById("cart-items");
        this.totalPriceElement = document.getElementById("total-price");
        this.cartCount = document.getElementById("cart-count");
        this.cart = document.getElementById("cart");
        this.mainContent = document.querySelector("main");
        this.updateUI();
    }

    // Завантаження кошика з LocalStorage
    loadCart() {
        const cart = localStorage.getItem("cartItems");
        return cart ? JSON.parse(cart) : [];  // Завантажуємо з LocalStorage, якщо є
    }

    // Збереження кошика в LocalStorage
    saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(this.items));  // Зберігаємо кошик у LocalStorage
        localStorage.setItem("totalPrice", this.total);  // Зберігаємо загальну суму в LocalStorage
    }

    // Рахуємо загальну суму кошика
    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);  // Рахуємо загальну суму кошика
    }

    showToast() {
        const toast = document.getElementById("cart-toast");
        if (!toast) return;

        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }

    addItem(name, price) {
        this.items.push({ name, price });
        this.total += price;
        this.updateUI();
        this.saveCart();  // Зберігаємо оновлений кошик
        this.showToast();
    }

    removeItem(index) {
        this.total -= this.items[index].price;
        this.items.splice(index, 1);
        this.updateUI();
        this.saveCart();  // Зберігаємо оновлений кошик
    }

    clearCart() {
        this.items = [];
        this.total = 0;
        this.updateUI();
        this.saveCart();  // Зберігаємо очищений кошик
    }

    checkout() {
        if (this.items.length === 0) {
            alert("Ваш кошик порожній! 🛒");
        } else {
            alert("Дякуємо за замовлення! 🎉");
            this.clearCart();
        }
    }

    toggleCart() {
        if (this.cart && this.mainContent) {
            this.cart.classList.toggle("show");
            this.mainContent.classList.toggle("blur-active");
        }
    }

    updateUI() {
        if (!this.cartList || !this.totalPriceElement) return;

        this.cartList.innerHTML = "";
        this.items.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">❌</button>`;
            this.cartList.appendChild(li);
        });

        this.totalPriceElement.innerText = this.total;
        if (this.cartCount) this.cartCount.innerText = this.items.length;
    }
}

const cart = new ShoppingCart();

// ====== ФУНКЦІЇ ДЛЯ КНОПОК З HTML ======
function addToCart(name, price) {
    cart.addItem(name, price);
}
function removeFromCart(index) {
    cart.removeItem(index);
}
function clearCart() {
    cart.clearCart();
}
function checkout() {
    cart.checkout();
}

// ====== ПОВЕДІНКА ПРИ ЗАВАНТАЖЕННІ ======
document.addEventListener("DOMContentLoaded", function () {
    // Бургер-меню
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // Кнопка кошика
    const cartBtn = document.querySelector(".cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => cart.toggleCart());
    }

    // Активне меню
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

    // FAQ
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            let answer = button.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Кнопка вгору
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Лічильник відвідувань
    let visits = localStorage.getItem("visits") || 0;
    visits++;
    localStorage.setItem("visits", visits);
    let visitCounter = document.getElementById("visit-counter");
    if (visitCounter) visitCounter.textContent = `Ви відвідали цю сторінку ${visits} раз(и)`;

    // Темний режим
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

    // Слайдер
    if (typeof Swiper !== "undefined") {
        new Swiper(".mySwiper", {
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
    }

    // Чат
    const chatBtn = document.getElementById("chat-btn");
    if (chatBtn) {
        chatBtn.addEventListener("click", () => {
            const chatBox = document.getElementById("chat-box");
            chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
        });
    }

    // Випливаюче повідомлення про акцію
    if (!localStorage.getItem("discount-shown")) {
        const popup = document.getElementById("discount-popup");
        if (popup) popup.style.display = "block";
        localStorage.setItem("discount-shown", "true");
    }

    // Фоновий градієнт
    const colors = ["#ff9966", "#ff5e62", "#6a11cb", "#2575fc"];
    let i = 0;
    setInterval(() => {
        document.body.style.background = `linear-gradient(to right, ${colors[i]}, ${colors[(i + 1) % colors.length]})`;
        i = (i + 1) % colors.length;
    }, 5000);
});

// Закриття попапу
function closePopup() {
    const popup = document.getElementById("discount-popup");
    if (popup) popup.style.display = "none";
}




const firebaseConfig = {
    apiKey: "AIzaSyCunGMNdZF38CkAHF4FlC6xZnOT24dZaAw",
    authDomain: "grinfood-app.firebaseapp.com",
    projectId: "grinfood-app",
    storageBucket: "grinfood-app.firebasestorage.app",
    messagingSenderId: "371777119454",
    appId: "1:371777119454:web:c193869ce3fec3b1d58e4f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchMenu() {
    const menuCollection = collection(db, "menu");
    const menuSnapshot = await getDocs(menuCollection);
    const menuList = menuSnapshot.docs.map(doc => doc.data());
    return menuList;
}


async function displayMenu() {
    const menuList = await fetchMenu();
    const menuContainer = document.getElementById('menu-container'); // ваш контейнер для меню

    menuList.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>${item.price} грн</span>
      <button onclick="addToCart('${item.name}', ${item.price})">Додати в кошик</button>
    `;

        menuContainer.appendChild(menuItem);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    displayMenu();  // Завантажити меню після завантаження сторінки
});
