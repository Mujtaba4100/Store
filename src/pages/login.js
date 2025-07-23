// src/pages/login.js
import { loginUser } from "../api/auth.js";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const credentials = {
    email: form.email.value,
    password: form.password.value
  };

  try {
    const result = await loginUser(credentials);

    // ✅ Only run this if login was truly successful
    if (result.token) {
      localStorage.setItem('token', result.token);              // Save JWT token
      localStorage.setItem('isLoggedIn', 'true');               // Optional flag
      localStorage.setItem('userEmail', result.user.email);     // Save user info
      localStorage.setItem('userName', result.user.name);
      alert('Login successful!');
      window.location.href = '../index.html';
    } else {
      alert(result.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});
