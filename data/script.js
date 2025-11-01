// scripts.js
const grid = document.getElementById('product-grid');
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalStock = document.getElementById('modal-stock');
const modalSizes = document.getElementById('modal-sizes');
const modalClose = document.getElementById('modal-close');
const contactBtn = document.getElementById('contact-btn');

let currentProduct = null;

async function loadProducts(){
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('No se pudo cargar products.json');
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    grid.innerHTML = '<p>Error al cargar productos.</p>';
    console.error(err);
  }
}

function renderProducts(products){
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}" />
      <h4>${escapeHtml(p.name)}</h4>
      <p>$${Number(p.price).toLocaleString()}</p>
      <div class="card-footer">
        <button data-id="${p.id}">Ver</button>
        <small>Stock: ${p.stock}</small>
      </div>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
}

function openModal(product){
  currentProduct = product;
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalName.textContent = product.name;
  modalDesc.textContent = product.description;
  modalPrice.textContent = product.price;
  modalStock.textContent = product.stock;
  modalSizes.textContent = product.sizes.join(', ');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  currentProduct = null;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Contact button - arma mailto:
contactBtn.addEventListener('click', () => {
  if (!currentProduct) return;
  const sellerEmail = 'vendedor@mitienda.com'; // cambiar por el real
  const subject = encodeURIComponent(Consulta por producto ${currentProduct.id} - ${currentProduct.name});
  const bodyLines = [
    Hola,,
    ``,
    Me interesa el producto ${currentProduct.name} (ID: ${currentProduct.id}).,
    Precio: $${currentProduct.price},
    Talles disponibles: ${currentProduct.sizes.join(', ')},
    ``,
    Quisiera consultar sobre: [agregar consulta aquí],
    ``,
    Saludos,,
    [Tu nombre]
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailto = mailto:${sellerEmail}?subject=${subject}&body=${body};
  window.location.href = mailto;
});

// util
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

loadProducts();