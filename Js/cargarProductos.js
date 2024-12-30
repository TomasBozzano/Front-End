/* carga de productos utilizando la función y colocandolos dentro del id products */
document.addEventListener('DOMContentLoaded', products);

function products() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    try{
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const tableProducts = document.getElementById('products');
                /*agregar la clase star a la img star.svg */
                let productsHTML = '';
                data.forEach(product => {
                    productsHTML += `
                        <div class="product">
                            <img src="${product.image}" alt="${product.title}">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="product-rating">${product.rating.rate} 
                                <img src="../svg/star.svg" alt="rating" class="star">
                            </p>
                            <p class="product-price">$${product.price}</p>
                            <button onclick="addProduct(${product.id})" class="product-button">Agregar al carrito</button>
                        </div>`;
                });
                tableProducts.innerHTML = productsHTML;
            });
    }catch(error){
        console.log('Error al cargar los productos', error);
    }finally{
        spinner.style.display = 'none';
    }
}

/* le llega por parametro el ID que es el producto */
function addProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            existProduct(product);
            alert('Producto agregado al carrito');
            totalCart();
        });
}

function existProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (!Array.isArray(products)) {
        products = [];
    }

    if (products.length === 0) {
        product['quantity'] = 1;
        products.push(product);
    }else {
        let producto = products.find(p => p.id === product.id);
        if (!producto) {
            product['quantity'] = 1;
            products.push(product);
        } else {
            producto.quantity ++;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('totalProducts', products.length);
}