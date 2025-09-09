// Produtos Demo
const products = [
    {id:1, name:'Morango Premium', price:8.90, emoji:'🍓', description:'Feito com morangos frescos'},
    {id:2, name:'Chocolate Belga', price:9.90, emoji:'🍫', description:'Chocolate importado da Bélgica'},
    {id:3, name:'Manga Tropical', price:8.50, emoji:'🥭', description:'Manga doce e refrescante'}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p => `
        <div class="bg-white rounded-3xl p-6 text-center shadow hover:scale-105 transition">
            <div class="text-5xl mb-4">${p.emoji}</div>
            <h3 class="text-lg font-bold mb-2">${p.name}</h3>
            <p class="text-gray-600 mb-4">${p.description}</p>
            <div class="text-xl font-bold text-pink-600 mb-4">R$ ${p.price.toFixed(2)}</div>
            <button onclick="addToCart(${p.id})" class="btn-primary w-full">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const prod = products.find(p=>p.id===productId);
    const existing = cart.find(c=>c.id===productId);
    if(existing) existing.quantity++;
    else cart.push({...prod, quantity:1});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// Mobile menu toggle
document.getElementById('mobile-menu').addEventListener('click',()=>{
    document.getElementById('mobile-nav').classList.toggle('hidden');
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-message').value;
    if(name && email && msg){
        saveContact({name,email,msg});
        alert('Mensagem enviada!');
        e.target.reset();
    } else alert('Preencha todos os campos');
});

document.addEventListener('DOMContentLoaded', loadProducts);
