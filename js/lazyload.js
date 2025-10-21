// Отримуємо всі зображення з data-src
const lazyImages = document.querySelectorAll("img.lazy-image");

// Створюємо IntersectionObserver для ледачого завантаження
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // Якщо зображення з'явилось у в'юпорті
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src"); // Підставляємо справжнє джерело
        img.onload = () => {
          img.classList.add("loaded"); // Додаємо клас для анімації
        };
        observer.unobserve(img); // Перестаємо спостерігати
      }
    });
  },
  {
    rootMargin: "100px", // Завантаження трохи до появи
    threshold: 0.1,
  }
);

// Додаємо можливість завантажити зображення при кліку на кнопку
document.getElementById("load-images-btn").addEventListener("click", () => {
  lazyImages.forEach((img) => {
    observer.observe(img); // Починаємо спостерігати
  });
});

/*
 ПОЯСНЕННЯ:

 1. Усі зображення спочатку не мають атрибута src — лише data-src.
 2. Коли зображення з'являється у полі видимості (viewport), IntersectionObserver викликає callback.
 3. src підставляється з data-src, зображення завантажується, і ми додаємо клас 'loaded' для плавного відображення.
 4. Можна легко розширити: додати анімацію спінер, заповнювачі, тощо.

 ПОКРАЩЕННЯ:

 - Можна використовувати <picture> для підтримки WebP і fallback формату.
 - Додавання кешування/вибору якості зображень залежно від розміру екрана.
*/
