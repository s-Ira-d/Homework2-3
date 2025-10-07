// lazyload.js

// Знаходимо всі зображення з класом "lazy-image"
const lazyImages = document.querySelectorAll("img.lazy-image");

// Створюємо IntersectionObserver
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target); // Завантажуємо зображення
        observer.unobserve(entry.target); // Більше не слідкуємо
      }
    });
  },
  {
    rootMargin: "100px", // Трохи раніше, ніж повністю потрапить у вікно
    threshold: 0.1,
  }
);

// Основна функція завантаження зображення
function loadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) return;

  // Створюємо тимчасове зображення для відстеження події завантаження
  const tempImg = new Image();
  tempImg.src = src;

  tempImg.onload = () => {
    img.src = src; // Коли зображення завантажено – додаємо до DOM
    img.classList.add("loaded"); // Для анімації
  };

  tempImg.onerror = () => {
    console.error(`Не вдалося завантажити зображення: ${src}`);
  };
}

// Автоматичне спостереження за всіма зображеннями
lazyImages.forEach((img) => observer.observe(img));

// Завантаження зображень вручну за кнопкою
const loadButton = document.getElementById("load-images-btn");
loadButton.addEventListener("click", () => {
  lazyImages.forEach((img) => {
    // Якщо зображення ще не завантажене
    if (!img.classList.contains("loaded")) {
      loadImage(img);
      observer.unobserve(img); // Припиняємо спостереження
    }
  });
});
