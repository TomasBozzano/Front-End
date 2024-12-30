document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('menu');
    button.addEventListener('click', () => {
        const nav = document.querySelector('.nav-list-mobile-content');
        nav.classList.toggle('show');
        totalCart();
    });
});

function totalCart() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const totalProducts = products.reduce((total, product) => total + product.quantity, 0);
    const cartElement = document.getElementById('cart-quantity');
    if (cartElement) {
        cartElement.textContent = totalProducts;
    }
}
