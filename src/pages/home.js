// src/pages/home.js

import { fetchProducts } from "../api/products.js";
import { createProductCard } from "../components/productCard.js";
import { addToCart } from "../pages/cart.js"; 

export async function renderHomePage() {
  try {
    console.log("here")
    const products = await fetchProducts();
    const container = document.getElementById("product-container");

    if (!container) {
      console.error("No container found with ID 'product-container'");
      return;
    }
    console.log("🧪 Products fetched:", products);
console.log("📦 Type of products:", typeof products);

    container.innerHTML = products.map(createProductCard).join('');

    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
        };

        // ✅ Use central addToCart function to handle logic
        addToCart(product);
      });
    });
  } catch (error) {
    console.error("Failed to render home page:", error);
  }
}
