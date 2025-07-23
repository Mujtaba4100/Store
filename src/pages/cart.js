// src/pages/cart.js
const backendURL = import.meta.env.VITE_BACKEND_URL;
// Utility: get unique cart key per user
function getCartKey() {
  const userEmail = localStorage.getItem("userEmail");
  return userEmail ? `cart_${userEmail}` : "cart_guest";
}

// ✅ Add product to cart
export function addToCart(product) {
  const cartKey = getCartKey();
  let cart = [];

  try {
    const storedCart = JSON.parse(localStorage.getItem(cartKey));
    if (Array.isArray(storedCart)) {
      cart = storedCart;
    }
  } catch (err) {
    console.error("Failed to parse cart:", err);
  }

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  showToast("Product added to cart!");
}

// ✅ Get all cart items
export function getCartItems() {
  const cartKey = getCartKey();
  try {
    const cart = JSON.parse(localStorage.getItem(cartKey));
    return Array.isArray(cart) ? cart : [];
  } catch (err) {
    console.error("Failed to parse cart:", err);
    return [];
  }
}

// ✅ Clear cart
export function clearCart() {
  const cartKey = getCartKey();
  localStorage.removeItem(cartKey);
}

// ✅ Toast UI
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className =
    "fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-md z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ✅ Render Cart Page with + / - buttons
export function renderCartPage() {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("❌ main-content element not found!");
    return;
  }

  const cartKey = getCartKey();
  mainContent.innerHTML = "";

  let cart = [];
  try {
    const storedCart = JSON.parse(localStorage.getItem(cartKey));
    if (Array.isArray(storedCart)) {
      cart = storedCart;
    }
  } catch (err) {
    console.error("Failed to parse cart:", err);
  }

  const cartContainer = document.createElement("div");
  cartContainer.className = "p-4";

  const heading = document.createElement("h2");
  heading.className = "text-2xl font-semibold mb-4";
  heading.textContent = "Your Cart";
  cartContainer.appendChild(heading);

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "text-gray-600";
    emptyMsg.textContent = "Your cart is empty.";
    cartContainer.appendChild(emptyMsg);
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className =
        "flex justify-between items-center mb-4 border-b pb-2";

      const itemInfo = document.createElement("div");
      itemInfo.innerHTML = `
        <p class="font-medium">${item.name}</p>
        <p class="text-sm text-gray-500">Price: $${item.price}</p>
      `;

      const qtyControls = document.createElement("div");
      qtyControls.className = "flex items-center gap-2";

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "−";
      minusBtn.className = "bg-gray-300 px-2 py-1 rounded";
      minusBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
          localStorage.setItem(cartKey, JSON.stringify(cart));
          renderCartPage();
        }
      });

      const qtyDisplay = document.createElement("span");
      qtyDisplay.textContent = item.quantity || 1;
      qtyDisplay.className = "px-2";

      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.className = "bg-gray-300 px-2 py-1 rounded";
      plusBtn.addEventListener("click", () => {
        item.quantity += 1; // Optional: Add limit check here
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCartPage();
      });

      qtyControls.appendChild(minusBtn);
      qtyControls.appendChild(qtyDisplay);
      qtyControls.appendChild(plusBtn);

      const removeBtn = document.createElement("button");
      removeBtn.className =
        "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCartPage();
      });

      itemDiv.appendChild(itemInfo);
      itemDiv.appendChild(qtyControls);
      itemDiv.appendChild(removeBtn);

      cartContainer.appendChild(itemDiv);
    });

    const clearAllBtn = document.createElement("button");
    clearAllBtn.className =
      "mt-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded";
    clearAllBtn.textContent = "Clear All";
    clearAllBtn.addEventListener("click", () => {
      localStorage.removeItem(cartKey);
      renderCartPage();
    });

    cartContainer.appendChild(clearAllBtn);
  }

  mainContent.appendChild(cartContainer);
}

document.getElementById('placeOrderBtn')?.addEventListener('click', async () => {
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  if (!userEmail || !userId) return alert('Please login first');

  const cartKey = 'cart_' + userEmail;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) return alert('Your cart is empty');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const response = await fetch(`${backendURL}/api/orders`, {
    method: 'POST',
    headers: {
  'ngrok-skip-browser-warning': 'true',
  'Content-Type': 'application/json'
}
,
    body: JSON.stringify({
      userId: userId,
      items: cart,
      total
    })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem(cartKey, JSON.stringify([])); // clear cart
    alert('✅ Order placed!');
    renderCartPage(); // re-render cart
  } else {
    alert('❌ Failed to place order');
  }
});



document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});

