import './style.css';
import { renderHomePage } from './pages/home.js';
//import {renderOrdersPage} from './pages/order.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHomePage();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authButtons = document.getElementById('authButtons');     
  const profileButtons = document.getElementById('profileButtons'); 

  if (isLoggedIn) {
    authButtons.style.display = 'none';
    profileButtons.style.display = 'block';
  } else {
    authButtons.style.display = 'block';
    profileButtons.style.display = 'none';
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      location.reload();
    });
  }

  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      alert('Profile clicked!');
    });
  }


  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href="cart.html"
    });
  }
  
  const orderHistoryBtn=document.getElementById("orderHistoryBtn");
  if (orderHistoryBtn)
  {
    orderHistoryBtn.addEventListener("click",(e)=>{
      e.preventDefault();
      window.location.href="order.html"

    })
  }
});
