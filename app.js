/* Salve como: app.js
   Comentários indicam onde substituir imagens dos produtos e como usar Firestore.
*/

/* -----------------------------
   Produtos de exemplo (local)
   - Substitua a propriedade "image" com o caminho das imagens reais.
   - Sugestão: crie a pasta /assets/products/
     ex: assets/products/strawberry.jpg
--------------------------------*/
const sampleProducts = [
  { id: 1, name: "Morango Premium", price: 8.5, category: "frutas", image: "assets/products/morango.jpg", description: "Morango fresco e cremoso" },
  { id: 2, name: "Chocolate Belga", price: 9.0, category: "cremoso", image: "assets/products/chocolate.jpg", description: "Chocolate 70% cacau" },
  { id: 3, name: "Manga Tropical", price: 8.0, category: "frutas", image: "assets/products/manga.jpg", description: "Manga palmer" },
  { id: 4, name: "Pistache Siciliano", price: 12.0, category: "especiais", image: "assets/products/pistache.jpg", description: "Pistache importado" }
];

// cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* -------------------------------------------------------
   Função para buscar produtos do Firestore (coleção 'products')
   Caso Firestore não esteja configurado, usa sampleProducts.
   ------------------------------------------------------- */
async function fetchProducts() {
  if (window.db) {
    try {
      const snapshot = await db.collection('products').get();
      if (!snapshot.empty) {
        const products = [];
        snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
        return products;
      } else {
        // Se coleção vazia, retornar local
        return sampleProducts;
      }
    } catch (err) {
      console.error('Erro ao buscar products do Firestore', err);
      return sampleProducts;
    }
  } else {
    return sampleProducts;
  }
}

/* -----------------------
   RENDERIZAÇÃO DE PRODUTOS
   ----------------------- */
function formatMoney(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`;
}

function createProductCard(p) {
  /* Comentário: coloque a imagem do produto em p.image
     Exemplo de caminho: assets/products/morango.jpg
  */
  return `
    <div class="card">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/products/placeholder.png'">
      <h4>${p.name}</h4>
      <p class="muted">${p.description || ''}</p>
      <div class="price">${formatMoney(Number(p.price))}</div>
      <button class="btn btn-primary btn-add" data-id="${p.id}">Adicionar ao carrinho</button>
    </div>
  `;
}

async function loadProductsGrid(filter = 'all') {
  const products = await fetchProducts();
  const grid = document.getElementById('products-grid');
  const featured = document.getElementById('featured-grid');

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(createProductCard).join('');
  // Destaques: pega primeiros 3
  featured.innerHTML = products.slice(0,3).map(createProductCard).join('');

  // listeners para add-to-cart
  document.querySelectorAll('.btn-add').forEach(btn => btn.addEventListener('click', () => {
    addToCart(btn.getAttribute('data-id'));
  }));
}

/* -----------------------
   Filtragem UI
   ----------------------- */
document.addEventListener('click', (e) => {
  if (e.target.matches('.filter')) {
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    loadProductsGrid(e.target.getAttribute('data-filter'));
  }
});

/* -----------------------
   Navegação de páginas
   ----------------------- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0,0);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    showPage(target);
    // fechar mobile menu se aberto
    document.getElementById('mobile-menu').classList.remove('open');
  });
});

/* mobile menu */
document.getElementById('mobile-toggle').addEventListener('click', ()=> document.getElementById('mobile-menu').classList.add('open'));
document.getElementById('close-mobile').addEventListener('click', ()=> document.getElementById('mobile-menu').classList.remove('open'));

/* -----------------------
   CARRINHO
   ----------------------- */
function updateCartCount() {
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').textContent = count;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  (async () => {
    const products = await fetchProducts();
    // productId pode ser string (quando vem do Firestore) -> garantir mesmo tipo
    const prod = products.find(p => String(p.id) === String(productId));
    if (!prod) return alert('Produto não encontrado.');

    const existing = cart.find(i => String(i.id) === String(productId));
    if (existing) existing.qty++;
    else cart.push({ id: prod.id, name: prod.name, price: Number(prod.price), qty: 1 });

    saveCart();
    updateCartCount();
    // feedback simples
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.classList.add('bump');
    setTimeout(()=>cartBtn.classList.remove('bump'), 300);
  })();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!cart.length) {
    container.innerHTML = `<div class="card">Seu carrinho está vazio.</div>`;
    document.getElementById('cart-total').textContent = 'R$ 0,00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong><br>
        <small>${formatMoney(item.price)}</small>
      </div>
      <div>
        <button class="btn-qty" data-id="${item.id}" data-op="-">-</button>
        <span style="margin:0 8px">${item.qty}</span>
        <button class="btn-qty" data-id="${item.id}" data-op="+">+</button>
        <button class="btn-remove" data-id="${item.id}" style="margin-left:12px"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');

  // events
  document.querySelectorAll('.btn-qty').forEach(b => b.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    const op = e.target.getAttribute('data-op');
    const it = cart.find(i => String(i.id) === String(id));
    if (!it) return;
    if (op === '+') it.qty++;
    else it.qty--;
    if (it.qty <= 0) cart = cart.filter(i => String(i.id) !== String(id));
    saveCart(); updateCartCount(); renderCart();
  }));

  document.querySelectorAll('.btn-remove').forEach(b => b.addEventListener('click', (e) => {
    const id = e.target.closest('.btn-remove').getAttribute('data-id');
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart(); updateCartCount(); renderCart();
  }));

  const total = cart.reduce((s,i)=>s + (i.price * i.qty), 0);
  document.getElementById('cart-total').textContent = formatMoney(total);
}

/* -----------------------
   CHECKOUT -> salva pedido no Firestore (coleção 'orders')
   ----------------------- */
document.getElementById('checkout-btn').addEventListener('click', async () => {
  if (!cart.length) return alert('Carrinho vazio.');
  const total = cart.reduce((s,i)=>s + (i.price * i.qty), 0);

  const order = {
    createdAt: new Date(),
    items: cart,
    total
  };

  if (window.db) {
    try {
      const ref = await db.collection('orders').add(order);
      alert('Pedido realizado! ID: ' + ref.id);
      // limpar carrinho
      cart = []; saveCart(); updateCartCount(); renderCart();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar pedido no Firebase. Verifique as regras do Firestore.');
    }
  } else {
    // fallback local
    console.log('Pedido (simulado):', order);
    alert('Pedido realizado (modo demo). Obrigado!');
    cart = []; saveCart(); updateCartCount(); renderCart();
  }
});

/* -----------------------
   Contact form (demo)
   ----------------------- */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Mensagem enviada! Obrigado.');
  e.target.reset();
});

/* -----------------------
   Inicialização
   ----------------------- */
async function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  updateCartCount();

  // carregar produtos iniciais
  await loadProductsGrid();

  // carregar eventos de navegação das CTAs
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e)=>{
      const t = e.currentTarget.getAttribute('data-target');
      showPage(t);
    });
  });

  // abrir pagina cart ao clicar no botão do header
  document.getElementById('cart-btn').addEventListener('click', ()=> {
    showPage('cart'); renderCart();
  });

  // Botões de filtro (se já foram gerados por HTML)
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      loadProductsGrid(btn.getAttribute('data-filter'));
    });
  });
}

init();
