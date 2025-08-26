import {renderProducts, renderCart, renderOrderModal } from "./render.js";
import { addToCart, getCartItems, removeFromCart, setQty, clearCart } from "./cart.js";

// tiny helper to make stable ids if data.json dont extends id
const slug = s => s.toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, "-")
  .replace(/(^-|-$)/g, "");

let products = []; //состояние каталога

async function load() {
    try{
        const res = await fetch("./data.json");
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        //Add id to the list
        products = data.map((p) => ({ id: slug(p.name), ...p}));
        renderProducts(products);

    document.querySelector("#products").addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action='add']");
        if(!btn) return;
        addToCart(btn.dataset.id);
        renderCart(getCartItems(), products); //перерисуй корзину
    });

    document.querySelector("#cart").addEventListener("click", (e) => {
        const row = e.target.closest("[data-id]");
        if(!row) return;
        const id = row.dataset.id;
        const action = e.target.dataset.action;
        if(!action) return;

        if(action === "remove") removeFromCart(id);
        if(action === "increase") {
            const cur = getCartItems().find(i => i.id === id)?.qty ?? 0;
            setQty(id, cur + 1);
        }
        if(action === "decrease") {
            const cur = getCartItems().find(i=> i.id === id)?.qty ?? 0;
            setQty(id, cur - 1);
        }
        renderCart(getCartItems(), products);
    });
    } catch(err) {
        console.error(err);
        document.querySelector("#products").innerHTML = 
        `<p style="color:#c00">Failed to load products.</p>`;
    }
}

// Delegation by modal (close/restart)
document.addEventListener("click", (e) => {
    const act = e.target.dataset.action;
    if(!act) return;

    if(act === "close"){
        const host = document.getElementById("order-modal");
        if (host) host.remove();
        delete document.body.dataset.lock;
    }
    if(act === "start-new"){
        clearCart();
        renderCart(getCartItems(), products);
        const host = document.getElementById("order-modal");
        if(host) host.remove();
        delete document.body.dataset.lock;

    }
});

document.addEventListener("click", (e) => {
    if(e.target.id === "confirm") {
        const items = getCartItems();
        if (!items.length) return;
        renderOrderModal(items, products);
    }
});

// Esc closing
document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
        const host = document.getElementById("order-modal");
        if (host) { host.innerHTML = ""; delete document.body.dataset.lock; }
    }
});

load();