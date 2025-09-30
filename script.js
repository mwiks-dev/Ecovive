document.addEventListener("DOMContentLoaded", function() {

    /**
     * Calculates the height of the fixed navbar and adds top padding to the body
     * to prevent content from being hidden underneath it.
     */
    function adjustBodyPadding() {
        const navbar = document.querySelector('#eco-nav .navbar.fixed-top');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            document.body.style.paddingTop = `${navbarHeight}px`;
        }
    }

    /**
     * Fetches HTML content from a URL and injects it into a specified placeholder element.
     * @param {string} url - The URL of the HTML component to load.
     * @param {string} placeholderId - The ID of the div where the content will be placed.
     */
    const loadComponent = (url, placeholderId) => {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.error(`Placeholder element with ID "${placeholderId}" not found.`);
            return Promise.reject(`Placeholder not found: ${placeholderId}`);
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
            });
    };

    // --- Load Navbar ---
    // Make sure your placeholder div in your HTML has id="eco-nav"
    loadComponent("navbar.html", "eco-nav")
        .then(() => {
            // Set the active link
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll("#eco-nav .nav-link");
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href");
                if (linkHref === currentPage) {
                    link.classList.add("active");
                    if(link.closest('.dropdown-menu')) {
                        link.closest('.dropdown').querySelector('.dropdown-toggle').classList.add('active');
                    }
                }
            });
            
            // Adjust body padding after the navbar is loaded
            adjustBodyPadding(); 
            // Re-adjust on window resize
            window.addEventListener('resize', adjustBodyPadding);
        })
        .catch(error => console.error('Error loading the navbar:', error));

    // --- Load Footer ---
    // Make sure your placeholder div in your HTML has id="footer-placeholder"
    loadComponent("footer.html", "eco-footer")
        .catch(error => console.error('Error loading the footer:', error));
});

// // After the code that loads navbar.html successfully:
// adjustBodyPadding();

// Add an event listener to call it again on resize:
// window.addEventListener('resize', adjustBodyPadding);