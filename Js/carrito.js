document.addEventListener('DOMContentLoaded', () => {
    carrito();
    const button = document.getElementById('btnComprar');
    button.addEventListener('click', buyProducts);
});


function carrito() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const tableProducts = document.getElementById('tbodyProduct');
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <tr>
                <td class="title-buy"><img src="${product.image}" alt="producto" class="productImage"></td>
                <td>$ ${product.price}</td>
                <td>
                <div class="cantidad">
                    <button onclick="removeQuantity(${product.id})" class="product-button">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="plusQuantity(${product.id})" class="product-button">+</button>
                </div>
                </td>
                <td class="buttonEliminar"><button onclick="removeProduct(${product.id})" class="product-button">X</button></td>
            </tr>`;
    });
    tableProducts.innerHTML = productsHTML;
    totalProducts();
    totalQuantity();
    totalCart();
}

function plusQuantity(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(product => product.id === id);
    product.quantity += 1;
    localStorage.setItem('products', JSON.stringify(products));
    carrito();
}

function removeQuantity(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products[productIndex].quantity -= 1;
        if (products[productIndex].quantity <= 0) {
            products.splice(productIndex, 1);
        }
        localStorage.setItem('products', JSON.stringify(products));
        carrito();
    }
}

function removeProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('totalProducts', products.length);
        carrito();
    }
}

function totalProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const total = document.getElementById('total');
    let totalHTML = '';
    let totalAmount = 0;
    products.forEach(product => {
        totalAmount += product.price * product.quantity;
    });
    totalHTML += `
         $${totalAmount.toFixed(2)}`;
    total.innerHTML = totalHTML;
}

function buyProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length > 0) {
        alert('Compra realizada con éxito, muchas gracias');
        localStorage.removeItem('products');
        localStorage.setItem('totalProducts', 0);
        carrito();
    } else {
        alert('No hay productos en el carrito');
    }
}

function totalQuantity() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const quantity = document.getElementById('product-count');
    let totalQuantityHTML = '';
    let totalQuantity = 0;
    products.forEach(product => {
        totalQuantity += product.quantity;
    });
    totalQuantityHTML += `${totalQuantity}`
    quantity.innerHTML = totalQuantity;
}