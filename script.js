const menuEl = document.getElementById('menu');
const cartEl = document.getElementById('cart');
const checkoutEl = document.getElementById('checkout');
const adminPanelEl = document.getElementById('adminPanel');

let menu = JSON.parse(localStorage.getItem('menu')) || [
  {id:1, name:"Маргарита", desc:"Класична піца", price30:150, price40:220, img:"https://via.placeholder.com/300", tags:["Новинка"]},
  {id:2, name:"Пепероні", desc:"З гострою ковбаскою", price30:170, price40:240, img:"https://via.placeholder.com/300", tags:["Hot"]}
];

let cart = [];

function renderMenu() {
  menuEl.innerHTML = '';
  menu.forEach(pizza => {
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = \`
      <img src="\${pizza.img}" alt="\${pizza.name}">
      <h3>\${pizza.name}</h3>
      <p>\${pizza.desc}</p>
      <p>30см: \${pizza.price30} грн | 40см: \${pizza.price40} грн</p>
      <p>Теги: \${pizza.tags.join(', ')}</p>
      <button onclick="addToCart(\${pizza.id},30)">Додати 30см</button>
      <button onclick="addToCart(\${pizza.id},40)">Додати 40см</button>
    \`;
    menuEl.appendChild(div);
  });
}

function addToCart(id, size) {
  const pizza = menu.find(p => p.id === id);
  cart.push({ ...pizza, size, price: size === 30 ? pizza.price30 : pizza.price40 });
  renderCart();
}

function renderCart() {
  cartEl.classList.remove('hidden');
  let total = 0;
  cartEl.innerHTML = '<h2>Кошик</h2>';
  cart.forEach((item,i) => {
    total += item.price;
    cartEl.innerHTML += \`<p>\${item.name} (\${item.size}см) - \${item.price} грн</p>\`;
  });
  cartEl.innerHTML += \`<h3>Всього: \${total} грн</h3>\`;
  cartEl.innerHTML += '<button onclick="showCheckout()">Оформити</button>';
}

function showCheckout() {
  checkoutEl.classList.remove('hidden');
  checkoutEl.innerHTML = \`
    <h2>Оформлення замовлення</h2>
    <input placeholder="Ваше ім'я"><br>
    <input placeholder="Телефон"><br>
    <input placeholder="Адреса"><br>
    <button>Підтвердити</button>
  \`;
}

document.getElementById('adminBtn').onclick = () => {
  const pass = prompt("Введіть пароль адміністратора:");
  if(pass === "pizza2025") {
    adminPanelEl.classList.remove('hidden');
    renderAdminPanel();
  } else {
    alert("Невірний пароль!");
  }
};

function renderAdminPanel(){
  adminPanelEl.innerHTML = '<h2>Адмін-панель</h2>';
  menu.forEach((p,i) => {
    adminPanelEl.innerHTML += \`
      <div class="card">
        <b>\${p.name}</b><br>
        <button onclick="deletePizza(\${i})">Видалити</button>
      </div>
    \`;
  });
  adminPanelEl.innerHTML += '<button onclick="addPizza()">Додати піцу</button>';
}

function deletePizza(i){
  menu.splice(i,1);
  localStorage.setItem('menu', JSON.stringify(menu));
  renderMenu();
  renderAdminPanel();
}

function addPizza(){
  let name = prompt("Назва піци:");
  let desc = prompt("Опис:");
  let price30 = +prompt("Ціна 30см:");
  let price40 = +prompt("Ціна 40см:");
  let img = prompt("URL картинки:");
  menu.push({id:Date.now(), name, desc, price30, price40, img, tags:[]});
  localStorage.setItem('menu', JSON.stringify(menu));
  renderMenu();
  renderAdminPanel();
}

renderMenu();
