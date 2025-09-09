import { saveOrder, saveContact } from '../firebase/firebase.js';

// Dados dos produtos
const products = [
    { id:1, name:'Morango Premium', price:8.90, emoji:'🍓', description:'Feito com morangos frescos' },
    { id:2, name:'Chocolate Belga', price:9.90, emoji:'🍫', description:'Chocolate importado da Bélgica' },
    { id:3, name:'Manga Tropical', price:8.50, emoji:'🥭', description:'Manga doce e refrescante' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(i => i.id === productId);
    if(item) item.quantity += 1;
    else cart.push({...product, quantity:1});
    updateCartDisplay();
    document.getElementById('cart-btn').classList.add('cart-bounce');
    setTimeout(()=>document.getElementById('cart-btn').classList.remove('cart-bounce'),500);
}

function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p=>`
        <div class="bg-white rounded-3xl p-6 text-center ice-cream-shadow hover:scale-105 transition-all duration-300">
            <div class="text-5xl mb-4">${p.emoji}</div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">${p.name}</h3>
            <p class="text-gray-600 mb-4">${p.description}</p>
            <div class="text-xl font-bold text-pink-600 mb-4">R$ ${p.price.toFixed(2)}</div>
            <button onclick="addToCart(${p.id})" class="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 w-full">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded',()=>{
    loadProducts();
    updateCartDisplay();

    // Menu mobile
    document.getElementById('mobile-menu').addEventListener('click',()=>{
        document.getElementById('mobile-nav').classList.toggle('hidden');
    });

    // Formulário contato
    document.getElementById('contact-form').addEventListener('submit',(e)=>{
        e.preventDefault();
        const name=document.getElementById('contact-name').value;
        const email=document.getElementById('contact-email').value;
        const message=document.getElementById('contact-message').value;
        if(name && email && message){
            alert('✅ Mensagem enviada com sucesso!');
            saveContact({name,email,message});
            e.target.reset();
        } else alert('❌ Preencha todos os campos');
    });
});
