document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Laptop Pro", category: "electronics", price: 1200, rating: 4.5, image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg" },
        { id: 2, name: "The Great Novel", category: "books", price: 25, rating: 4.8, image: "https://cloudfront.penguin.co.in/wp-content/uploads/2020/08/unnamed-file-3138.jpg" },
        { id: 3, name: "Wireless Headphones", category: "electronics", price: 150, rating: 4.2, image: "https://m.media-amazon.com/images/I/61XuLr92V3L._UF1000,1000_QL80_.jpg" },
        { id: 4, name: "Summer T-Shirt", category: "clothing", price: 30, rating: 4.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1PvCfOSsRDi9JPpS2FaLF6ULHoVSeHMGT0w&s" },
        { id: 5, name: "Smartwatch X", category: "electronics", price: 299, rating: 4.7, image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg" },
        { id: 6, name: "Cooking Basics Guide", category: "books", price: 18, rating: 4.3, image: "https://www.ubuy.co.in/productimg/?image=aHR0cHM6Ly9pbWFnZXMtY2RuLnVidXkuY28uaW4vNjM2Zjc0MmY0NjQ2ZWE2MzYxNmZmZGQwLWNvb2tpbmctYmFzaWNzLWZvci1kdW1taWVzLXBhcGVyYmFjay5qcGc.jpg" },
        { id: 7, name: "Denim Jeans", category: "clothing", price: 55, rating: 4.1, image: "https://www.mumkins.in/cdn/shop/products/denim-jeans-for-kids-bl0612345-darkblue-1.jpg?v=1649143010&width=1080" },
        { id: 8, name: "E-Reader Lite", category: "electronics", price: 99, rating: 4.6, image: "https://m.media-amazon.com/images/I/61UVHKbbKNL._UF1000,1000_QL80_.jpg" },
    ];

    const productListDiv = document.getElementById('productList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const noProductsMessage = document.getElementById('noProductsFound');

    let currentFilter = 'all';
    let currentSort = 'price-asc'; // Default sort

    // Function to render products
    function renderProducts(filteredProducts) {
        productListDiv.innerHTML = ''; // Clear existing products
        if (filteredProducts.length === 0) {
            noProductsMessage.style.display = 'block';
            return;
        } else {
            noProductsMessage.style.display = 'none';
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.name} is a high-quality product in the ${product.category} category.</p>
                <div class="category">Category: ${product.category}</div>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button>Add to Cart</button>
            `;
            productListDiv.appendChild(productCard);
        });
    }

    // Function to apply filters and sorting
    function applyFiltersAndSort() {
        let filtered = products;

        // 1. Apply Filtering
        if (currentFilter !== 'all') {
            filtered = products.filter(product => product.category === currentFilter);
        }

        // 2. Apply Sorting
        filtered.sort((a, b) => {
            if (currentSort === 'price-asc') {
                return a.price - b.price;
            } else if (currentSort === 'price-desc') {
                return b.price - a.price;
            } else if (currentSort === 'name-asc') {
                return a.name.localeCompare(b.name);
            } else if (currentSort === 'name-desc') {
                return b.name.localeCompare(a.name);
            }
            return 0; // Should not happen
        });

        renderProducts(filtered);
    }

    // Event Listeners for Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.category;
            applyFiltersAndSort();
        });
    });

    // Event Listener for Sort Select
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndSort();
    });

    // Initial load of products
    applyFiltersAndSort();
});