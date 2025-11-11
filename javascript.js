const products = [
  { name: "Arroz Branco 5kg", desc: "Arroz tipo 1 de alta qualidade", price: 23.90 },
  { name: "Feijão Carioca 1kg", desc: "Feijão novo e selecionado", price: 9.90 },
  { name: "Leite Integral 1L", desc: "Leite integral pasteurizado", price: 5.49 },
  { name: "Café Torrado 500g", desc: "Café moído torrado de sabor intenso", price: 14.50 },
  { name: "Açúcar Refinado 1kg", desc: "Açúcar cristal refinado", price: 4.20 },
  { name: "Óleo de Soja 900ml", desc: "Óleo de soja puro", price: 8.30 },
  { name: "Sabão em Pó 1kg", desc: "Para roupas mais limpas e perfumadas", price: 12.90 },
  { name: "Detergente Líquido 500ml", desc: "Poder desengordurante", price: 3.20 },
  { name: "Shampoo 350ml", desc: "Limpeza e brilho para seus cabelos", price: 9.90 },
  { name: "Desodorante Spray 150ml", desc: "Proteção 48h contra o suor", price: 11.90 },
  { name: "Refrigerante Cola 2L", desc: "Bebida gaseificada sabor cola", price: 8.99 },
  { name: "Suco de Laranja 1L", desc: "Suco natural e refrescante", price: 6.50 },
  { name: "Maçã 1kg", desc: "Maçãs vermelhas selecionadas", price: 7.90 },
  { name: "Banana 1kg", desc: "Banana prata fresca", price: 6.40 },
  { name: "Queijo Mussarela 500g", desc: "Fatiado e fresco", price: 21.90 },
  { name: "Presunto 200g", desc: "Presunto fatiado de qualidade", price: 9.50 },
];

const list = document.getElementById("product-list");
const cart = [];
const cartCount = document.getElementById("cart-count");
const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
const pixModal = new bootstrap.Modal(document.getElementById("pixModal"));

function renderProducts() {
  list.innerHTML = products.map((p, i) => `
    <div class="col-md-3 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text small flex-grow-1">${p.desc}</p>
          <h6 class="fw-bold mb-3">R$ ${p.price.toFixed(2)}</h6>
          <button class="btn btn-primary mt-auto" onclick="addToCart(${i})">Adicionar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(i) {
  const item = products[i];
  const found = cart.find(p => p.name === item.name);
  if (found) found.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((sum, p) => sum + p.qty, 0);
  cartCount.textContent = total;
}

document.getElementById("cart-btn").addEventListener("click", showCart);

function showCart() {
  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='text-center'>Carrinho vazio.</p>";
  } else {
    cartItems.innerHTML = `
      <table class="table">
        <thead><tr><th>Produto</th><th>Qtd</th><th>Preço</th><th></th></tr></thead>
        <tbody>
          ${cart.map((p, i) => `
            <tr>
              <td>${p.name}</td>
              <td>${p.qty}</td>
              <td>R$ ${(p.price * p.qty).toFixed(2)}</td>
              <td><button class="btn btn-sm btn-danger" onclick="removeItem(${i})">x</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  document.getElementById("cart-total").textContent = cart.reduce((s, p) => s + p.price * p.qty, 0).toFixed(2);
  cartModal.show();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCartCount();
  showCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0).toFixed(2);
  if (total > 0) {
    const pixUrl = `https://quickchart.io/qr?text=Pagamento%20Pix%20R$${total}%20para%2051999667430&size=200`;
    document.getElementById("pix-qrcode").src = pixUrl;
    pixModal.show();
  }
});

renderProducts();
