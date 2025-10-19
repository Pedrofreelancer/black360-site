// HEADER – muda ao rolar
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ROLAGEM SUAVE ENTRE SEÇÕES
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// ANIMAÇÕES SCROLLREVEAL
ScrollReveal().reveal('.hero .content', { delay: 200, distance: '60px', origin: 'bottom', duration: 1000 });
ScrollReveal().reveal('.sobre h2, .sobre p', { delay: 200, distance: '40px', origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.beneficios .card', { delay: 200, distance: '40px', origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.cases .case', { delay: 200, distance: '40px', origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.empresas h2, .upload-container, .empresa-item', { delay: 200, distance: '40px', origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.formulario form, .formulario h2, .formulario p', { delay: 200, distance: '40px', origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.contato h2, .contato p', { delay: 200, distance: '40px', origin: 'bottom', interval: 100 });

// EFEITO DIGITANDO (TYPING EFFECT)
const typedTextSpan = document.getElementById('typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
  "Transforme sua marca com a Black 360°",
  "Estratégia, Performance e Resultados.",
  "Seu negócio no próximo nível digital."
];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (textArray.length) setTimeout(type, 1000);
});

// ENVIO DIRETO PARA WHATSAPP
document.querySelector('.lead-form').addEventListener('submit', e => {
  e.preventDefault();

  const nome = document.querySelector('input[name=nome]').value;
  const email = document.querySelector('input[name=email]').value;
  const telefone = document.querySelector('input[name=telefone]').value;
  const mensagem = document.querySelector('textarea[name=mensagem]').value;

  const numero = '5534991504537';
  const texto = `Olá, sou ${nome}! 👋%0A` +
                `E-mail: ${email}%0A` +
                (telefone ? `Telefone: ${telefone}%0A` : '') +
                `Mensagem: ${mensagem}%0A%0A` +
                `Enviado via site da Black 360° 🚀`;

  const url = `https://wa.me/${numero}?text=${texto}`;
  window.open(url, '_blank');

  e.target.reset();
});

// EMPRESAS GERENCIADAS – adiciona logo e nome direto pelo site
const empresaUpload = document.getElementById('empresaUpload');
const empresaGrid = document.getElementById('empresaGrid');

const savedEmpresas = JSON.parse(localStorage.getItem('empresasBlack360')) || [];
savedEmpresas.forEach(({ src, nome }) => addEmpresa(src, nome));

empresaUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(ev) {
    const logoSrc = ev.target.result;
    const nome = prompt("Digite o nome da empresa:");

    if (!nome) return;

    addEmpresa(logoSrc, nome);
    savedEmpresas.push({ src: logoSrc, nome });
    localStorage.setItem('empresasBlack360', JSON.stringify(savedEmpresas));
  };
  reader.readAsDataURL(file);

  e.target.value = ''; // limpa input
});

function addEmpresa(src, nome) {
  const container = document.createElement('div');
  container.classList.add('empresa-item');

  const img = document.createElement('img');
  img.src = src;
  img.alt = nome;

  const label = document.createElement('span');
  label.textContent = nome;

  container.appendChild(img);
  container.appendChild(label);
  empresaGrid.appendChild(container);
}
