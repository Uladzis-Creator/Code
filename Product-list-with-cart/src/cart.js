let cart = [];

export function clearCart(){ cart = []; }

export function addToCart(id) {
    const item = cart.find(i=>i.id === id);
    if(item){
        item.qty += 1;
    }else{
        cart.push({id, qty: 1});
    }
}

export function removeFromCart(id){
    cart = cart.filter(i=>i.id != id);
}

export function setQty(id,qty){
    const item = cart.find(i => i.id === id);
    if(!item) return;
    if(qty <= 0) {
        removeFromCart(id);
    } else {
        item.qty = qty;
    }
}

export function getCartItems() {
    return cart;
}

export function getTotals(products) {
    let count = 0;
    let total = 0;
    cart.forEach(c=>{
        const product = products.find(p=>p.id === c.id);
        if(product){
            count += c.qty;
            total += product.price * c.qty;
        }
    });
    return {count,total};
}