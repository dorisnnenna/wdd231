document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year & Last Modified
    const yearSpan = document.querySelector('#year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modSpan = document.querySelector('#last-modified');
    if (modSpan) {
        modSpan.textContent = document.lastModified;
    }

    // 2. Wayfinding: Highlight Active Navigation Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. LocalStorage Visit Counter
    const visitCountDisplay = document.querySelector('#visit-count');
    if (visitCountDisplay) {
        let visitCount = Number(localStorage.getItem('dna_visit_count')) || 0;
        visitCount++;
        localStorage.setItem('dna_visit_count', visitCount);

        if (visitCount === 1) {
            visitCountDisplay.textContent = "Welcome to DNA Frozens & Condiments! Glad you're here.";
        } else {
            visitCountDisplay.textContent = `Back again? This is visit number ${visitCount} to our site.`;
        }
    }

    // 4. Responsive Navigation (Hamburger Menu Toggle)
    const menuBtn = document.querySelector('#menu-btn');
    const nav = document.querySelector('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });
    }

    // 5. Fetch API & Dynamic Product Rendering (with try...catch)
    const productGrid = document.querySelector('#product-grid');

    if (productGrid) {
        let allProducts = [];

        async function loadProducts() {
            try {
                const response = await fetch('data/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                allProducts = await response.json();
                displayProducts(allProducts);
            } catch (error) {
                console.error('Failed to load products:', error);
                productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Sorry, we were unable to load the product catalog at this time.</p>`;
            }
        }

        // Render product cards with proper CSS classes and lazy-loaded images
        function displayProducts(productsToDisplay) {
            productGrid.innerHTML = '';

            if (productsToDisplay.length === 0) {
                productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No products found in this category.</p>`;
                return;
            }

            const cardsHTML = productsToDisplay.map(product => `
        <article class="product-card">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy" 
            width="300" 
            height="200"
            onerror="this.onerror=null; this.src='https://placehold.co/300x200/173f35/f8f5ed?text=${encodeURIComponent(product.name)}';"
          >
          <div class="product-card-body">
            <h3>${product.name}</h3>
            <p class="unit">${product.unit}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="desc">${product.description}</p>
            <button class="view-details-btn" data-id="${product.id}">View Details</button>
          </div>
        </article>
      `).join('');

            productGrid.innerHTML = cardsHTML;
            setupModal(allProducts);
        }

        // Filter Category Handler
        const categoryFilter = document.querySelector('#category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const selectedCategory = e.target.value;
                if (selectedCategory === 'all') {
                    displayProducts(allProducts);
                } else {
                    const filtered = allProducts.filter(p => p.category === selectedCategory);
                    displayProducts(filtered);
                }
            });
        }

        // Modal Dialog Setup
        function setupModal(products) {
            const modal = document.querySelector('#product-modal');
            const modalDetails = document.querySelector('#modal-details');
            const closeModalBtn = document.querySelector('#close-modal');

            if (!modal) return;

            document.querySelectorAll('.view-details-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    const product = products.find(p => p.id === productId);

                    if (product) {
                        modalDetails.innerHTML = `
              <h3 style="color: var(--color-primary); margin-bottom: 0.5rem; font-size: 1.4rem;">${product.name}</h3>
              <p style="margin-bottom: 0.5rem;"><strong>Category:</strong> ${product.category.toUpperCase()}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Price:</strong> $${product.price.toFixed(2)} (${product.unit})</p>
              <p style="margin-bottom: 0.5rem;"><strong>Customer Rating:</strong> ⭐ ${product.rating} / 5.0</p>
              <p style="margin-top: 1rem; color: var(--color-text);">${product.description}</p>
            `;
                        modal.showModal();
                    }
                });
            });

            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    modal.close();
                });
            }
        }

        loadProducts();
    }
});


// 6. Handle Form Submission Query Parameters on submit.html
const orderResults = document.querySelector('#order-results');
if (orderResults) {
    const params = new URLSearchParams(window.location.search);

    const setName = document.querySelector('#display-name');
    const setEmail = document.querySelector('#display-email');
    const setPhone = document.querySelector('#display-phone');
    const setProduct = document.querySelector('#display-product');
    const setComments = document.querySelector('#display-comments');

    if (setName && params.get('fullname')) setName.textContent = params.get('fullname');
    if (setEmail && params.get('email')) setEmail.textContent = params.get('email');
    if (setPhone && params.get('phone')) setPhone.textContent = params.get('phone') || 'None provided';
    if (setProduct && params.get('product')) setProduct.textContent = params.get('product');
    if (setComments && params.get('comments')) setComments.textContent = params.get('comments');
}