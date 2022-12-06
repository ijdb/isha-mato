import { menuArray } from "./data.js";

const order = [];

function checkOrder() {
  if (order.length > 0) {
    const yos = document.getElementById("your-order-section");
    yos.classList.remove("hidden");
    yos.classList.add("visible");
  } else {
    yos.classList.add("hidden");
    yos.classList.remove("visible");
  }
}
function addOrder(item) {
  let existingItem = order.find((x) => x.id === item.id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    order.push({ ...item, qty: 1 });
  }
  checkOrder();
}

function getOrderItem(item) {}

function getMenuItem(item) {
  const itemHtml = document.createElement("div");
  itemHtml.innerHTML = `
    <div class="emoji">${item.emoji}</div>
    <div class="content">
      <div class="about-item">
        <div class="name">${item.name}</div>
        <div class="ingredient">${item.ingredients.join(", ")}</div>
        <div class="price">$${item.price}</div>
      </div>
      <div class="plus-sign">
        <button class="btn" onclick="console.log(item)">+</button>
      </div>
    </div>
  `;
  itemHtml.classList.add("single-item");
  let button = itemHtml.getElementsByTagName("button")[0];
  button.onclick = () => {
    addOrder(item);
  };

  return itemHtml;
}
function render() {
  const menu = document.getElementById("menu");
  menuArray.forEach((item) => menu.appendChild(getMenuItem(item)));
}
render();
