// Функція для завантаження одного зображення
function loadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) return;

  // Створюємо новий об'єкт зображення для перевірки завантаження
  const tempImg = new Image();
  tempImg.src = src;

  // Коли зображення повністю завантажене — оновлюємо src
  tempImg.onload = () => {
    img.src = src;
    img.classList.add("loaded"); // Додаємо клас для анімації
    observer.unobserve(img); // Вимикаємо спостереження
  };
}

// IntersectionObserver для лінійного завантаження
const observer = new IntersectionObserver(
  (entries, observerSelf) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.1, // Завантаження починається коли 10% елемента видимі
  }
);

// Отримуємо всі зображення з класом .lazy
const lazyImages = document.querySelectorAll("img.lazy");
lazyImages.forEach((img) => {
  observer.observe(img); // Спостерігаємо за кожним зображенням
});

// Додаткова можливість: Завантажити всі зображення за кліком
document.getElementById("loadImagesBtn").addEventListener("click", () => {
  lazyImages.forEach((img) => {
    loadImage(img);
  });
});
