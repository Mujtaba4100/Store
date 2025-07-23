//const backendURL ='http://localhost:5000'

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log("✅ backendURL:", backendURL);

export async function fetchProducts() {
  try {
    console.log("mere")
   const res = await fetch(`${backendURL}/api/products`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  console.log("res",res)
   console.log("res url",res.url)
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    
    }

    const data = await res.json();
    console.log("✅ Data received:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return [];
  }
}



