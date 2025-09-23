/* ========================================= */
/* INÍCIO DO ARQUIVO JS - GELATO PREMIUM    */
/* ========================================= */



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6dgBP5nZyxDfY-xwjWms-wmC9bjjLZZo",
  authDomain: "banco-de-dados-c29d3.firebaseapp.com",
  projectId: "banco-de-dados-c29d3",
  storageBucket: "banco-de-dados-c29d3.firebasestorage.app",
  messagingSenderId: "43482352329",
  appId: "1:43482352329:web:f5a62c45d838abc1a99b18",
  measurementId: "G-BC6P4NGR8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/* ===== MENU MOBILE ===== */
// Seleciona os elementos do menu mobile
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

// FUNCIONALIDADE: Abre/fecha o menu mobile ao clicar no botão hambúrguer
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Mostra/esconde o menu
    const icon = mobileMenu.querySelector('i');
    // Troca o ícone entre hambúrguer (☰) e X (✕)
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// FUNCIONALIDADE: Fecha o menu mobile quando clica em um link
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active'); // Esconde o menu
        const icon = mobileMenu.querySelector('i');
        // Volta o ícone para hambúrguer
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

/* ===== NAVEGAÇÃO SUAVE ===== */
// FUNCIONALIDADE: Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calcula a posição considerando a altura do cabeçalho fixo
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            // Rola suavemente até a seção
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== EFEITO DO CABEÇALHO AO ROLAR ===== */
// FUNCIONALIDADE: Muda a aparência do cabeçalho quando rola a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        // Quando rola mais de 100px, deixa o cabeçalho mais transparente
        header.style.background = 'rgba(255, 107, 157, 0.95)';
        header.style.backdropFilter = 'blur(10px)'; // Efeito de desfoque
    } else {
        // Volta ao gradiente original quando está no topo
        header.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8e8e)';
        header.style.backdropFilter = 'none';
    }
});

/* ===== ANIMAÇÕES AO ROLAR A PÁGINA ===== */
// Configurações para detectar quando elementos aparecem na tela
const observerOptions = {
    threshold: 0.1, // Ativa quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px' // Margem de 50px na parte inferior
};

// FUNCIONALIDADE: Anima elementos quando aparecem na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Quando o elemento aparece, torna-o visível com animação
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica a animação aos elementos do cardápio, lojas, características e contato
document.querySelectorAll('.menu-item, .store-card, .feature, .contact-item').forEach(el => {
    // Inicialmente deixa os elementos invisíveis e deslocados para baixo
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el); // Observa quando o elemento aparece na tela
});

/* ===== EFEITO DO BOTÃO PRINCIPAL ===== */
// FUNCIONALIDADE: Adiciona efeito de carregamento ao botão "Ver Cardápio"
document.querySelector('.cta-button').addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
        const originalText = this.innerHTML;
        // Mostra um spinner de carregamento
        this.innerHTML = '<span class="loading"></span> Carregando...';
        
        // Volta ao texto original após 1 segundo
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 1000);
    }
});

/* ===== EFEITOS DAS REDES SOCIAIS ===== */
// FUNCIONALIDADE: Adiciona animação aos ícones das redes sociais
document.querySelectorAll('.social-links a').forEach(link => {
    // Quando passa o mouse por cima
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)'; // Aumenta e gira
    });
    
    // Quando tira o mouse
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)'; // Volta ao normal
    });
});

/* ===== EFEITOS DOS ITENS DO CARDÁPIO ===== */
// FUNCIONALIDADE: Adiciona efeito de clique nos itens do cardápio
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Efeito de "apertar" quando clica
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            // Volta ao efeito hover após 150ms
            this.style.transform = 'translateY(-5px)';
        }, 150);
    });
});

/* ===== FUNÇÕES DO CARDÁPIO PDF ===== */

// FUNCIONALIDADE: Download do cardápio em PDF (simulado)
// 📄 PERSONALIZAR: Em um site real, aqui você colocaria o link do seu PDF real
function downloadPDF() {
    const button = document.querySelector('.pdf-download-btn');
    const originalText = button.innerHTML;
    
    // Mostra estado de carregamento
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando download...';
    button.disabled = true; // Desabilita o botão temporariamente
    
    // Simula a geração e download do PDF (2 segundos de delay)
    setTimeout(() => {
        // 📝 ALTERAR: Substitua este conteúdo pelo seu cardápio real
        const pdfContent = `
CARDÁPIO PREMIUM – GELATERIA & SORVETERIA
Paranaguá - PR | 2024

🍦 SORVETES TRADICIONAIS (R$ 7,00 a bola | R$ 12,00 duas bolas)
• Baunilha de Madagascar
• Chocolate Belga
• Morango Natural
• Flocos Cremoso
• Doce de Leite Caseiro
• Coco Fresco
• Limão Siciliano

🍧 GELATOS GOURMET (R$ 10,00 a bola | R$ 18,00 duas bolas)
• Pistache Siciliano
• Nocciola (avelã italiana)
• Amarena (cereja italiana)
• Tiramisù
• Gianduia (chocolate + avelã)
• Cheesecake de Frutas Vermelhas
• Cookies & Cream
• Framboesa Silvestre

🥤 MILKSHAKES CREMOSOS (R$ 20,00)
• Baunilha com Calda de Caramelo Salgado
• Chocolate Belga
• Morango com Chantilly
• Nutella com Avelã
• Paçoca com Doce de Leite
• Oreo Crocante
• Café com Chocolate

🍨 SUNDAES ESPECIAIS (R$ 18,00 a R$ 24,00)
• Clássico (sorvete + calda + chantilly + castanhas)
• Brownie com Sorvete de Baunilha
• Banana Split Gourmet (3 bolas + frutas + chantilly)
• Morango com Leite Ninho e Calda de Chocolate
• Cookies & Nutella Sundae

🫐 AÇAÍ PREMIUM NO POTE
• 300ml (1 acompanhamento) – R$ 15,00
• 500ml (2 acompanhamentos) – R$ 20,00
• 1 litro (4 acompanhamentos) – R$ 30,00

Acompanhamentos: granola, mel, leite condensado, leite em pó, frutas frescas, paçoca, castanhas caramelizadas, calda de frutas vermelhas.

🪣 BALDES DE SORVETE PARA LEVAR
• 1 litro – R$ 28,00
• 1,5 litros – R$ 38,00
• 2 litros – R$ 48,00

Sabores disponíveis: Chocolate Belga, Baunilha de Madagascar, Pistache, Frutas Vermelhas, Cookies & Cream, Doce de Leite Caseiro, Nocciola.

📍 ENDEREÇO
Rua XV de Novembro, 123 - Centro, Paranaguá - PR

📞 CONTATO
(41) 3422-1234 | contato@gelatopremium.com.br

🕒 HORÁRIO
Segunda a Domingo: 10h às 22h
        `;
        
        // Cria e faz o download do arquivo
        // 📝 NOTA: Em um site real, você substituiria isso por um link direto para o PDF
        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Gelato_Premium_Cardapio_2024.txt'; // 📝 ALTERAR: nome do seu arquivo
        document.body.appendChild(a);
        a.click(); // Inicia o download
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Mostra confirmação de sucesso
        button.innerHTML = '<i class="fas fa-check"></i> Download concluído!';
        
        // Volta ao estado normal após 2 segundos
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 2000);
}

// FUNCIONALIDADE: Visualização do PDF online (simulado)
// 📄 PERSONALIZAR: Em um site real, abriria o PDF em uma nova aba ou modal
function viewPDF() {
    const button = document.querySelector('.pdf-view-btn');
    const originalText = button.innerHTML;
    
    // Mostra estado de carregamento
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    button.disabled = true;
    
    // Simula abertura do visualizador de PDF
    setTimeout(() => {
        // 📝 ALTERAR: Em um site real, substitua por: window.open('caminho-do-seu-cardapio.pdf', '_blank');
        alert('📄 Visualizador de PDF\n\nEm um site real, aqui seria aberto o cardápio completo em PDF com todos os sabores, preços e informações detalhadas da sorveteria.\n\n✨ Funcionalidade demonstrativa');
        
        // Volta ao estado normal
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

/* ===== INICIALIZAÇÃO DA PÁGINA ===== */
// FUNCIONALIDADE: Executa quando a página termina de carregar
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animação de entrada ao conteúdo principal
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0'; // Começa invisível
    heroContent.style.transform = 'translateY(30px)'; // Deslocado para baixo
    
    // Após 300ms, anima a entrada
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1'; // Torna visível
        heroContent.style.transform = 'translateY(0)'; // Move para posição normal
    }, 300);
});

/* ===== DICAS PARA PERSONALIZAÇÃO ===== */
/*

📝 COMO PERSONALIZAR ESTE CÓDIGO:

1. 🎨 CORES E DESIGN:
   - Procure por #ff6b9d e #ff8e8e no CSS para mudar as cores principais
   - Altere os gradientes nas seções .hero e .contact-section

2. 📝 CONTEÚDO:
   - Substitua todos os textos marcados com "ALTERAR:" ou "TROCAR:"
   - Atualize informações de contato, endereços e horários

3. 🖼️ IMAGENS DOS SABORES:
   - No HTML: substitua <span class="ice-cream-icon">🍓</span> por <img src="imagens/morango.jpg" alt="Morango" class="ice-cream-icon">
   - No CSS: descomente as configurações de imagem na classe .ice-cream-icon
   - Ajuste width e height para o tamanho desejado

4. 📱 TAMANHOS RESPONSIVOS:
   - Para desktop: altere font-size em .ice-cream-icon (linha ~185 do CSS)
   - Para mobile: altere font-size no @media query (linha ~450 do CSS)

5. 🔧 FUNCIONALIDADES:
   - Para o PDF real: substitua a função downloadPDF() por um link direto
   - Para redes sociais: atualize os links no HTML (procure por href="#")
   - Para WhatsApp: use https://wa.me/5541991494538 (substitua pelo seu número)

6. 🚀 SEO E PERFORMANCE:
   - Adicione meta tags de descrição e palavras-chave
   - Otimize as imagens antes de usar (recomendado: 80x80px para ícones)
   - Considere adicionar Google Analytics

*/

/* ======================================= */
/* FINAL DO ARQUIVO JS - GELATO PREMIUM   */
/* ======================================= */