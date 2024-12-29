document.addEventListener('DOMContentLoaded', () => {
    totalCart();
    window.addEventListener('storage', totalCart);
});

function totalCart() {
    let products = JSON.parse(localStorage.getItem('totalProducts')) || [];
    const quantity = document.getElementById('cartCounter');
    let cartCounter = products || 0;
    quantity.innerHTML = cartCounter;
}

window.totalCart = totalCart;