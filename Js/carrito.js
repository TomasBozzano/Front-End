document.addEventListener('DOMContentLoaded', carrito);

function carrito() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const tableProducts = document.getElementById('tbodyProduct');
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>
                <div class="cantidad">
                    <button onclick="removeProduct(${product.id})" class="product-button">-</button>
                    <span>${product.cantidad}</span>
                    <button onclick="filterProduct(${product.id})" class="product-button">+</button>
                </div>
                </td>
                <td class="buttonEliminar"><button onclick="removeProduct(${product.id})" class="product-button">X</button></td>
            </tr>`;
    });
    tableProducts.innerHTML = productsHTML;
}

function filterProduct(id){
    let cantidad;
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(product => product.id === id);
    /* si el producto se encuentra se le coloca una propiedad de cantidad para mostrarla */
    if(product){
        product['cantidad'] =+ 1
    }
    return localStorage.getItem('product', JSON.stringify(product));
}

function removeProduct(id){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(product => product.id === id);
    if(product == 0 || product <= 0 ){
        product.cantidad -= 1;
    }else{
        products = products.filter(product => product.id !== id);
        localStorage.removeItem('products');
    }
    localStorage.setItem('products', JSON.stringify(products));
    carrito();
}