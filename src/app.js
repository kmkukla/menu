import { menu } from "./menu.js";

const menuItems = document.querySelector(".menu__items");

const buttonsContainer = document.querySelector(".menu__buttons");

window.addEventListener("DOMContentLoaded", function () {
  showMenuItems("all");
  showMenuButtons();
});

function showMenuItems(category) {
  menuItems.innerHTML = "";
  let list = menu;
  if (category !== "all") {
    list = menu.filter((elem) => elem.category === category);
  }
  for (let item of list) {
    const menuElement = document.createElement("div");
    menuElement.classList.add("menu__item");
    menuElement.innerHTML = `<img src=${item.img} alt="menu-item" class="menu__item-img">
    <div class="menu__item-info">
      <header class="menu__item-header">
        <h4 class="menu__item-name">${item.title}</h4>
        <h4 class="menu__item-price">${item.price}</h4>
      </header>
      <p class="menu__item-text">${item.desc}</p>
    </div>`;
    menuItems.appendChild(menuElement);
  }
}

function showMenuButtons() {
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryButtons = categories
    .map((category) => {
      return `<button class="menu__button" data-id=${category}>${category}</button>`;
    })
    .join("");
  buttonsContainer.innerHTML = categoryButtons;

  const menuButtons = document.querySelectorAll(".menu__button");

  menuButtons.forEach((button) =>
    button.addEventListener("click", function () {
      showMenuItems(this.dataset.id);
      menuButtons.forEach((button) =>
        button.classList.remove("menu__button--active")
      );
      this.classList.add("menu__button--active");
    })
  );
}
