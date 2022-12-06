import { menuArray } from "./data.js";

function render() {
  const menu = document.getElementById("menu");

  menuArray.forEach((item) => menu.appendChild(getMenuItem(item)));
}
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
          <button class="btn">+</button>
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
const order = [];
function addOrder(item) {
  let existingItem = order.find((x) => x.id === item.id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    order.push({ ...item, qty: 1 });
  }
  checkOrder();
}
function updateTotal() {
  const orderTotal = document.getElementById("orderTotal");
  orderTotal.innerText = `Total Price: $ ${order.reduce(
    (acc, currntItem) => (acc = acc + currntItem.price * currntItem.qty),
    0
  )}`;
}

function checkOrder() {
  if (order.length > 0) {
    const yos = document.getElementById("your-order-section");
    yos.classList.remove("hidden");
    yos.classList.add("visible");
    const upperSection = document.getElementById("upper-sec");
    upperSection.innerHTML = "";
    order.forEach((item) => upperSection.appendChild(getOrderItem(item)));
    updateTotal();
  } else {
    const yos = document.getElementById("your-order-section");
    yos.classList.add("hidden");
    yos.classList.remove("visible");
  }
}

function removeOrder(item) {
  let existingItemIndex = order.findIndex((x) => x.id === item.id);
  if (existingItemIndex > -1) {
    if (order[existingItemIndex].qty > 1) {
      order[existingItemIndex].qty -= 1;
    } else if (order[existingItemIndex].qty === 1) {
      order.splice(existingItemIndex, 1);
    }
  }
  checkOrder();
}

function getOrderItem(item) {
  const orderHtml = document.createElement("div");
  console.log(orderHtml);
  orderHtml.innerHTML = `
<div class="orderItemName">
  ${item.name} <button class="removeButton">remove</button>
</div>
<div class="qty">Qty: ${item.qty}</div>
<div class="unitPrice">$ ${item.price} each</div>
<div class="ItemtotalPrice">$ ${item.price * item.qty}</div>`;
  orderHtml.classList.add("orderItem");
  let button = orderHtml.getElementsByTagName("button")[0];
  button.onclick = () => {
    removeOrder(item);
  };
  return orderHtml;
}

function placingOrder() {
  const menu = document.getElementById("menu");
  const yos = document.getElementById("your-order-section");
  menu.innerHTML = "<div class='complete'>Thanks for placing your order</div>";
  yos.classList.remove("visible");
  yos.classList.add("hidden");
}
document.getElementById("complete-btn").addEventListener("click", placingOrder);

render();
