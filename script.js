document.addEventListener('DOMContentLoaded', () => {
    // ... (existing: currentYear, bookingModal logic, slotsTracker) ...

    // --- Smooth Scroll for "Reserve for Event Pickup" buttons ---
    const reserveButtons = document.querySelectorAll('.reserve-physical-btn');
    const eventsSection = document.getElementById('events');

    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (eventsSection) {
                eventsSection.scrollIntoView({
                    behavior: 'smooth'
                });
                // Optional: Pre-select edition in modal based on which card was clicked
                const card = button.closest('.edition-card');
                const editionName = card.querySelector('.edition-name').textContent;
                const price = card.querySelector('.edition-price').textContent;
                const bookingModalSelect = document.getElementById('book-choice');
                if (bookingModalSelect) {
                   const optionToSelect = Array.from(bookingModalSelect.options).find(opt => opt.text.includes(editionName));
                   if(optionToSelect) {
                       optionToSelect.selected = true;
                   } else { // If card text doesn't exactly match option text
                        if (card.classList.contains('standard')) {
                           bookingModalSelect.value = "Standard Edition - $20";
                       } else if (card.classList.contains('deluxe')) {
                           bookingModalSelect.value = "Deluxe Edition - $50";
                       }
                   }
                }
            }
        });
    });
    
    // --- Lightbox for Photo Sampler ---
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');

    if (lightbox && lightboxImage && lightboxCloseBtn) { // Check if elements exist
        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                const fullImageSrc = item.dataset.full;
                if (fullImageSrc) {
                    lightboxImage.src = fullImageSrc;
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        function closeLightbox() {
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImage.src = ""; // Clear image src
            document.body.style.overflow = '';
        }

        lightboxCloseBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (event) => { // Close if overlay is clicked
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
         document.addEventListener('keydown', (event) => { // Close with Escape key
            if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }


    // --- <details> dropdown accessibility improvements (optional visual cues) ---
    // The <details> element is natively accessible. This is just for styling the arrow.
    // CSS handles the arrow rotation now. JS is not strictly needed for basic open/close arrow state.

    // --- Digital Purchase Link ---
    // Placeholder for #digital-payment-link
    // Ensure any link with `target="_blank"` has `rel="noopener noreferrer"` for security.
    const digitalBuyButton = document.querySelector('.buy-digital-btn');
    if (digitalBuyButton && digitalBuyButton.getAttribute('href') === '#digital-payment-link') {
        console.warn("Digital payment link is a placeholder. Please update with your actual payment gateway URL.");
        // You could even prevent default and show a message if it's not configured:
        // digitalBuyButton.addEventListener('click', (e) => {
        // if (digitalBuyButton.getAttribute('href') === '#digital-payment-link') {
        // e.preventDefault();
        // alert("Digital payment coming soon!");
        // }
        // });
    }
});