import { cards } from "./cards.js";
import { createTimer } from "./timer.js";

// Создание малых карточек
const cardsContainer = document.querySelector(".cards-container");

// Функция для создания карточек
function createCard(arr) {
  arr.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("card");

    // Image
    const cardImageContainer = document.createElement("figure");
    cardImageContainer.classList.add("card-image");

    const cardImage = document.createElement("img");
    cardImage.src = item.image;
    cardImage.alt = item.alt;

    const cardImageButtonsContainer = document.createElement("div");
    cardImageButtonsContainer.classList.add("card-icons");

    const bookmarkButton = document.createElement("button");
    bookmarkButton.classList.add("bookmark");
    bookmarkButton.setAttribute("aria-label", "Add to bookmark");

    cardImageButtonsContainer.appendChild(bookmarkButton);

    cardImageContainer.appendChild(cardImage);
    cardImageContainer.appendChild(cardImageButtonsContainer);

    article.appendChild(cardImageContainer);

    // Header
    const cardHeader = document.createElement("header");
    cardHeader.classList.add("card-header");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = item.title;

    const cookingTime = document.createElement("p");
    cookingTime.classList.add("cooking-time");
    cookingTime.innerText = item.cookingTime;

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cookingTime);
    article.appendChild(cardHeader);

    // Card-info
    const cardShortInfo = document.createElement("div");
    cardShortInfo.classList.add("card-main-info");

    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card-category");
    cardCategory.innerHTML = `<span class="category-title">Category:</span> <span class="category-value">${item.category}</span>`;

    const cardShortDescription = document.createElement("p");
    cardShortDescription.classList.add("card-short-description");
    cardShortDescription.innerText = item.shortDescription;

    cardShortInfo.appendChild(cardCategory);
    cardShortInfo.appendChild(cardShortDescription);
    article.appendChild(cardShortInfo);

    // Card-info visually hidden
    const cardIngredients = document.createElement("ul");
    cardIngredients.classList.add("card-ingredients");

    item.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      cardIngredients.appendChild(li);
    });

    cardIngredients.style.display = "none";

    const cardMethod = document.createElement("ul");
    cardMethod.classList.add("card-method");

    item.method.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      cardMethod.appendChild(li);
    });

    cardMethod.style.display = "none";

    article.appendChild(cardIngredients);
    article.appendChild(cardMethod);

    cardsContainer.appendChild(article);
  });

  // Добавление обработчиков событий на кнопки закладок
  const bookmarkButtons = document.querySelectorAll(".bookmark");

  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события
      button.classList.toggle("bookmark-active");
    });
  });
  // Запуск GSAP анимации после создания карточек
}

createCard(cards);

// Функция поиска

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("input");
  const cards = document.querySelectorAll("article");

  input.addEventListener("input", function (e) {
    const searchQuery = e.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      const cardTitle = card.querySelector("h3").textContent.toLowerCase();
      const cardCategory = card
        .querySelector(".category-value")
        .textContent.toLowerCase();

      const matchesTitle = cardTitle.includes(searchQuery);
      const matchesCategory = cardCategory.includes(searchQuery);

      // Отображать карточку только если поисковый запрос совпадает с названием или категорией
      card.style.display = matchesTitle || matchesCategory ? "flex" : "none";
    });
  });
});

// Поиск по категориям через кнопки

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".menu-button");
  const cards = document.querySelectorAll("article");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonTitle = button.textContent.toLowerCase();

      cards.forEach((card) => {
        const cardCategoryElement = card.querySelector(".category-value");
        if (cardCategoryElement) {
          const cardCategory = cardCategoryElement.textContent.toLowerCase();
          const matchButton = cardCategory.includes(buttonTitle);

          // Показываем карточку, если кнопка "All" нажата или категория совпадает с текстом кнопки
          if (buttonTitle === "all" || matchButton) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        }
      });

      // Добавляем класс активной кнопке
      buttons.forEach((btn) => {
        btn.classList.remove("button-active");
      });
      button.classList.add("button-active");
    });
  });
});

// Модальное окно
// Здесь важно что информация должна браться не из массива карточек а из отрисованных карточек

// Выбираем все отрисованные карточки
document.addEventListener("DOMContentLoaded", function () {
  const recipes = document.querySelectorAll(".card");

  recipes.forEach((recipe) => {
    recipe.addEventListener("click", function () {
      // Создаем затемнение (backdrop)
      const backdrop = document.createElement("div");
      backdrop.classList.add("modal-backdrop");
      document.body.appendChild(backdrop);

      const modalWindow = document.createElement("div");
      modalWindow.classList.add("modal");

      // Получаем всю информацию
      const imageSrc = recipe.querySelector(".card-image img").src;
      const imageAlt = recipe.querySelector(".card-image img").alt;
      const title = recipe.querySelector(".card-title").textContent;
      const category = recipe.querySelector(".category-value").textContent;
      const cookingTime = recipe.querySelector(".cooking-time").textContent;
      const description = recipe.querySelector(
        ".card-short-description"
      ).textContent;
      const ingredientsElements = recipe.querySelectorAll(
        ".card-ingredients li"
      );
      const methodElements = recipe.querySelectorAll(".card-method li");

      // Преобразуем NodeList в массивы
      const ingredients = Array.from(ingredientsElements).map(
        (li) => li.textContent
      );
      const method = Array.from(methodElements).map((li) => li.textContent);

      // Image
      const modalImageContainer = document.createElement("figure");
      modalImageContainer.classList.add("modal-image");

      const modalImage = document.createElement("img");
      modalImage.src = imageSrc;
      modalImage.alt = imageAlt;

      const modalImageButtonsContainer = document.createElement("div");
      modalImageButtonsContainer.classList.add("modal-icons");

      const modalBookmarkButton = document.createElement("button");
      modalBookmarkButton.classList.add("bookmark");
      modalBookmarkButton.setAttribute("aria-label", "Add to bookmark");

      const closeButton = document.createElement("button");
      closeButton.classList.add("button-close");
      modalImageButtonsContainer.appendChild(closeButton);

      modalImageButtonsContainer.appendChild(modalBookmarkButton);

      modalImageContainer.appendChild(modalImage);
      modalImageContainer.appendChild(modalImageButtonsContainer);

      modalWindow.appendChild(modalImageContainer);

      // Header
      const modalHeader = document.createElement("header");
      modalHeader.classList.add("card-header");

      const modalTitle = document.createElement("h3");
      modalTitle.classList.add("card-title");
      modalTitle.textContent = title;

      const modalCookingTime = document.createElement("p");
      modalCookingTime.classList.add("cooking-time");
      modalCookingTime.innerText = cookingTime;

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalCookingTime);
      modalWindow.appendChild(modalHeader);

      // Card-info
      const modalShortInfo = document.createElement("div");
      modalShortInfo.classList.add("card-main-info");

      const modalCardCategory = document.createElement("p");
      modalCardCategory.classList.add("card-category");
      modalCardCategory.innerHTML = `<span class="category-title">Category:</span> <span class="category-value">${category}</span>`;

      const modalCardShortDescription = document.createElement("p");
      modalCardShortDescription.classList.add("card-short-description");
      modalCardShortDescription.innerText = description;

      modalShortInfo.appendChild(modalCardCategory);
      modalShortInfo.appendChild(modalCardShortDescription);
      modalWindow.appendChild(modalShortInfo);

      const createTimerButton = document.createElement("button");
      createTimerButton.textContent = "Timer";
      createTimerButton.classList.add("button-open-timer");
      modalWindow.appendChild(createTimerButton);

      // Ingredients
      const modalIngredients = document.createElement("div");
      modalIngredients.classList.add("card-ingredients");
      modalIngredients.innerHTML = "<strong>Ingredients:</strong>";
      const ingredientsList = document.createElement("ul");
      ingredientsList.classList.add("list-container");
      ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      modalIngredients.appendChild(ingredientsList);

      // Method
      const modalMethod = document.createElement("div");
      modalMethod.classList.add("card-method");
      modalMethod.innerHTML = "<strong>Method:</strong>";
      const methodList = document.createElement("ul");
      methodList.classList.add("list-container");
      method.forEach((step) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.textContent = step;
        methodList.appendChild(li);
      });
      modalMethod.appendChild(methodList);

      modalWindow.appendChild(modalIngredients);
      modalWindow.appendChild(modalMethod);

      document.body.appendChild(modalWindow);

      createTimerButton.addEventListener("click", createTimer);

      backdrop.addEventListener("click", function () {
        document.body.removeChild(modalWindow);
        document.body.removeChild(backdrop);
      });

      closeButton.addEventListener("click", function () {
        document.body.removeChild(modalWindow);
        document.body.removeChild(backdrop);
      });
      modalBookmarkButton.addEventListener("click", function () {
        modalBookmarkButton.classList.toggle("bookmark-active");
      });
    });
  });
});

// GSAP и ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from(".title", {
  duration: 1.5,
  opacity: 0,
  y: -50,
  delay: 1,
});

gsap.from(".slogan", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  delay: 1,
});

const input = document.querySelector(".input");

const placeholderText = input.getAttribute("placeholder");

function animatePlaceholder() {
  input.setAttribute("placeholder", "");

  gsap.to(input, {
    delay: 2,
    duration: 2,
    ease: "none",
    placeholder: placeholderText,
    onUpdate: function () {
      input.setAttribute(
        "placeholder",
        this.vars.placeholder.substr(
          0,
          Math.ceil(this.progress() * placeholderText.length)
        )
      );
    },
  });
}

animatePlaceholder();

gsap.to(".title", {
  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    scrub: true,
  },
  yPercent: 200,
  scale: 0.5,
  xPercent: -80,
});

gsap.to(".slogan", {
  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    scrub: true,
  },
  yPercent: 200,
  scale: 0.5,
  xPercent: -80,
});

gsap.to(".menu-wrapper .menu-button", {
  duration: 1,
  stagger: 0.2, // Добавление задержки между анимациями элементов
  y: -10,
  delay: 0.5, // Задержка перед началом анимации
  opacity: 1,
});
