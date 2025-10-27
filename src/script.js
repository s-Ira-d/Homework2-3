// Функція для завантаження одного зображення
function loadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) return;

  // Додаємо спінер поки зображення завантажується
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  img.parentElement.style.position = "relative";
  img.parentElement.appendChild(spinner);

  const tempImg = new Image();
  tempImg.src = src;

  // Коли зображення завантажено — замінюємо src і прибираємо спінер
  tempImg.onload = () => {
    img.src = src;
    img.classList.add("loaded");
    spinner.remove();
  };

  // Якщо сталася помилка
  tempImg.onerror = () => {
    img.src = "https://via.placeholder.com/800x500?text=Помилка+завантаження";
    spinner.remove();
  };
}

// Налаштовуємо IntersectionObserver для спостереження за зображеннями
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target); // Припиняємо спостереження після завантаження
    }
  });
});

// Кнопка для активації лінійного завантаження
document.getElementById("enable-lazy-loading").addEventListener("click", () => {
  document.querySelectorAll("img.lazy").forEach((img) => {
    observer.observe(img);
  });

  const btn = document.getElementById("enable-lazy-loading");
  btn.disabled = true;
  btn.textContent = "Завантаження увімкнено!";
});
