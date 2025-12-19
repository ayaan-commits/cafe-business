// ===== MENU FILTER FUNCTIONALITY =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const menuCategories = document.querySelectorAll('.menu-category');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        if (filter === 'all') {
            // Show all categories and items
            menuCategories.forEach(cat => {
                cat.style.display = 'block';
            });
            menuItems.forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('show');
            });
        } else {
            // Show only matching category
            menuCategories.forEach(cat => {
                if (cat.id === filter) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });

            // Show only matching items
            menuItems.forEach(item => {
                if (item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        }

        // Smooth scroll to menu content
        const menuContent = document.querySelector('.menu-content');
        if (menuContent) {
            const headerOffset = 150;
            const elementPosition = menuContent.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATION FOR MENU ITEMS =====
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

menuItems.forEach(item => {
    menuObserver.observe(item);
});

// ===== SMOOTH SCROLL FOR CATEGORY LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 150;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
