const products = [
    { id: 1, name: 'Áo Thun', price: 200000, image: 'https://tse1.mm.bing.net/th?id=OIP.JeuIXl9e42G0Q4b8ECwLmgHaHa&pid=Api&P=0&h=180' },
    { id: 2, name: 'Quần Jeans', price: 300000, image: 'https://tse4.mm.bing.net/th?id=OIP.jxIKSW_l4rA5zc3tFggRAwHaHa&pid=Api&P=0&h=180' },
    { id: 3, name: 'Váy Đầm', price: 250000, image: 'https://tse2.mm.bing.net/th?id=OIP.8Enjk9XSkDQWJYzKugKkiwHaHa&pid=Api&P=0&h=180' },
    { id: 3, name: 'Quần Âu', price: 230000, image: 'https://tse2.mm.bing.net/th?id=OIP.YeDOsj6FA8nWLTT2-lfEtAHaHa&pid=Api&P=0&h=180' },
    { id: 3, name: 'Quần Đùi', price: 100000, image: 'https://tse3.mm.bing.net/th?id=OIP.hOwgBNrLktiIdT80Q6fhJgHaHa&pid=Api&P=0&h=180' }

];

const cart = [];

document.addEventListener('DOMContentLoaded', function() {
    showProducts();
});

function showProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <p><strong>${product.name}</strong> - Giá: ${product.price}đ <button onclick="addToCart(${product.id})">Thêm vào Giỏ</button></p>
        `;
        productList.appendChild(productElement);
        if (index < products.length - 1) {
            const separator = document.createElement('hr');
            productList.appendChild(separator);
        }
    });

    document.getElementById('productsPage').style.display = 'block';
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    const cartItemList = document.getElementById('cartItemList');
    cartItemList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <p><img src="${item.image}" alt="${item.name}" class="product-img"></p>
            <p><strong>${item.name}</strong> - Giá: ${item.price}đ</p>
        `;
        cartItemList.appendChild(cartItemElement);
        totalPrice += item.price;
    });

    document.getElementById('totalPrice').innerText = totalPrice;

    localStorage.setItem('cart', JSON.stringify(cart));

    document.getElementById('cartPage').style.display = 'block';
    document.getElementById('productsPage').style.display = 'none';
}

function goToCart() {
    updateCart();
}

function goToProducts() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('productsPage').style.display = 'block';
}

const checkout = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
        return;
    }
    
    
    
    localStorage.removeItem('cart'); 

    const paymentMessage = document.getElementById('payment-message');
    paymentMessage.innerText = 'Thanh toán thành công';
    paymentMessage.style.display = 'block';

    setTimeout(function(){
        paymentMessage.style.display = 'none';
        clearCart();
    }, 2000);
};

function clearCart() {
    document.getElementById('cartItemList').innerHTML = ''; 
    document.getElementById('totalPrice').innerText = '0';
}