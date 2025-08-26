export function renderProducts(products){
    const $list = document.querySelector("#products");
    const html = products.map(p => `
    <article class="card">
      <picture>
        <source media="(min-width: 1024px) srcset="${p.image.desctop}">
        <source media="(min-width: 640px") srcset="${p.image.tablet}">
        <img src="${p.image.mobile}" alt="${p.name}" loading="lazy">
      </picture>
      <div class="body">
        <div class="meta">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price">$${p.price.toFixed(2)}</div>
        <button data-action="add" data-id="${p.id}" aria-label="Add ${p.name} to cart">
          Add to Cart
        </button>
      </div>
    </article>`).join("");
    $list.innerHTML = html;
}

export function renderCart(cartItems, products){
  const $cart = document.querySelector("#cart");
  if(cartItems.length === 0){
    $cart.innerHTML = `<h2>Your cart</h2><p>Your added items will appear here</p>`;
    return;
  }

  const lines = cartItems.map(ci=>{
    const p = products.find(x=>x.id === ci.id);
    const lineTotal = (p.price * ci.qty).toFixed(2);
    return `
    <div class="row" data-id="${ci.id}">
      <span>${p.name}</span>
      <div class="controls">
        <button class="ctrl-btn" data-action="decrease" aria-label="Decrease">-</button>
        <span>${ci.qty}</span>
        <button class="ctrl-btn" data-action="increase" aria-label="Incrase">+</button>
      </div>
      <strong>$${lineTotal}</strong>
      <button class="ctrl-btn" data-action="remove" aria-label="Remove ${p.name}">x</button>
    </div>`;
  }).join("");

  const total = cartItems.reduce((sum, ci) => {
    const p = products.find(x=> x.id === ci.id);
    return sum + p.price * ci.qty;
  }, 0).toFixed(2);

  $cart.innerHTML = `
   <h2>Your Cart (${cartItems.reduce((a,b)=>a+b.qty,0)})</h2>
    <div class="list">${lines}</div>
    <div class="total">Order Total: <strong>$${total}</strong></div>
    <button id="confirm">Confirm Order</button>`;
}

export function renderOrderModal (cartItems, products){
  if (!cartItems.length) return;

  const rows = cartItems.map(ci => {
    const p = products.find(x => x.id === ci.id);
    const sum = (p.price*ci.qty).toFixed(2);
    return `
      <li class="m-row">
        <span class="m-name">${p.name}</span>
        <span class="m-qty">${ci.qty} × $${p.price.toFixed(2)}</span>
        <strong class="m-sum">$${sum}</strong>
      </li>`;
  }).join("");

  const total = cartItems.reduce((s, ci) => {
    const p = products.find(x => x.id === ci.id);
    return s + p.price * ci.qty;
  }, 0).toFixed(2);

  const html = `
    <div class="modal-backdrop" data-action="close"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="orderTitle">
      <h3 id="orderTitle">Order Confirmed</h3>
      <p>We hope you enjoy your food!</p>
      <ul class="m-list">${rows}</ul>
      <div class="m-total">Order Total: <strong>$${total}</strong></div>
      <button class="m-primary" data-action="start-new">Start New Order</button>
    </div>`;

  let host = document.getElementById("order-modal");
  if(!host){
    host = document.createElement("div"); 
    host.id = "order-modal";
    document.body.appendChild(host);
  }
  host.innerHTML = html;
  document.body.dataset.lock="1";
}