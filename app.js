const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const contactBtn = document.getElementById("contactBtn");

// Abrir modal
document.querySelectorAll(".ver-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".card");

    const name = card.dataset.name;
    const desc = card.dataset.desc;
    const img = card.dataset.img;

    modalImg.src = img;
    modalName.textContent = name;
    modalDesc.textContent = desc;

    // Mensaje para WhatsApp
    //const mensaje = encodeURIComponent("Hola, estoy interesado/a en el producto:" + $(name) + ". ¿Está disponible?");

    //contactBtn.href = "https://wa.me/5493492216758?text="+$(mensaje);

    modal.classList.remove("hidden");
  });
});

// Cerrar modal
modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Cerrar clickeando fuera
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});