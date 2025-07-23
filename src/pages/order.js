// src/pages/order.js
const backendURL = import.meta.env.VITE_BACKEND_URL;
const ordersContainer = document.getElementById('ordersContainer');
const userId = localStorage.getItem('userId');

if (!userId) {
  ordersContainer.innerHTML = '<p>Please login to see your orders.</p>';
} else {
  fetch(`${backendURL}/api/orders/${userId}`, {
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
    .then(orders => {
      if (!orders.length) {
        ordersContainer.innerHTML = '<p>No orders found.</p>';
        return;
      }
console.log("here")
      orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'border p-4 rounded shadow';

        const date = new Date(order.createdAt).toLocaleString();

        orderDiv.innerHTML = `
          <p class="font-semibold">Order ID: ${order._id}</p>
          <p>Date: ${date}</p>
          <ul class="mt-2">
            ${order.items.map(item => `<li>🛒 ${item.name} x${item.quantity}</li>`).join('')}
          </ul>
        `;
        ordersContainer.appendChild(orderDiv);
      });
    })
    .catch(err => {
  console.error("❌ Error fetching orders:", err);
  ordersContainer.innerHTML = '<p>Error loading orders</p>';
});

}
