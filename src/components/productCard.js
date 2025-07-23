export function createProductCard(product) {
  return `
    <div class="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="w-full h-52 object-cover rounded-xl mb-4"
      />

      <div class="space-y-2">
        <h2 class="text-lg font-bold text-gray-800 truncate">
          ${product.name || "Unnamed Product"}
        </h2>
        
        <p class="text-sm text-gray-600 line-clamp-2">
          ${product.description || "No description available."}
        </p>

        <div class="flex justify-between text-sm text-gray-500">
          <span>Brand: ${product.brand || "N/A"}</span>
          <span>Category: ${product.category || "Uncategorized"}</span>
        </div>

        <div class="flex items-center justify-between mt-2">
          <p class="text-xl font-semibold text-green-600">
            Rs ${product.price || "N/A"}
          </p>
          <p class="text-sm text-yellow-500 flex items-center">
            ⭐ ${product.rating ?? 0} 
            <span class="ml-1 text-gray-400">(${product.numReviews ?? 0})</span>
          </p>
        </div>

        <p class="text-sm text-gray-600">Stock: ${product.countInStock ?? "N/A"}</p>

        <button 
  class="add-to-cart w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl mt-3 transition duration-200"
  data-id="${product._id}"
  data-name="${product.name}"
  data-price="${product.price}"
>
  Add to Cart
</button>

      </div>
    </div>
  `;
}
