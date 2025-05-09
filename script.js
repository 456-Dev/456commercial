document.addEventListener('DOMContentLoaded', () => {
    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Booking Modal Logic ---
    const bookingModal = document.getElementById('booking-modal');
    const modalCloseBtn = bookingModal ? bookingModal.querySelector('.modal-close-btn') : null;
    const bookSlotButtons = document.querySelectorAll('.book-slot-btn');
    const bookingForm = document.getElementById('booking-form');
    const modalEventNameDisplay = document.getElementById('modal-event-name');
    const formEventNameHiddenInput = document.getElementById('form-event-name-hidden');

    function openModal(eventName) {
        if (bookingModal && modalEventNameDisplay && formEventNameHiddenInput) {
            modalEventNameDisplay.textContent = `Book Slot for ${eventName}`;
            formEventNameHiddenInput.value = eventName;
            bookingModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModal() {
        if (bookingModal) {
            bookingModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (bookingForm) bookingForm.reset(); // Optional: reset form on close
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (event) => {
            if (event.target === bookingModal) { // Click on overlay itself
                closeModal();
            }
        });
    }

    bookSlotButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventCard = button.closest('.event-card');
            const eventName = eventCard.dataset.eventName;
            const slotsAvailable = parseInt(eventCard.querySelector('.slots-available').textContent, 10);
            if (slotsAvailable > 0) {
                openModal(eventName);
            } else {
                alert("Sorry, all slots for this event are booked!");
            }
        });
    });
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // Formspree will handle the submission.
            // You might want to add a delay and then show a "thank you" message or close the modal.
            // For now, we'll just let it submit.
            // Example: setTimeout(closeModal, 500); after validation if not using AJAX
        });
    }

    // --- Slots Tracker (Update visual from data attributes) ---
    document.querySelectorAll('.event-card').forEach(card => {
        const totalSlots = parseInt(card.dataset.eventSlotsTotal, 10);
        const bookedSlots = parseInt(card.dataset.eventSlotsBooked, 10);
        const availableSlots = totalSlots - bookedSlots;
        const barFilled = card.querySelector('.slots-bar-filled');
        const slotsAvailableSpan = card.querySelector('.slots-available');

        if (slotsAvailableSpan) slotsAvailableSpan.textContent = availableSlots;
        if (barFilled) {
            const percentageBooked = (bookedSlots / totalSlots) * 100;
            barFilled.style.width = `${percentageBooked}%`;
        }
        if (availableSlots <= 0) {
            const bookButton = card.querySelector('.book-slot-btn');
            if (bookButton) {
                bookButton.disabled = true;
                bookButton.textContent = "Fully Booked";
                bookButton.style.backgroundColor = 'var(--pixel-grey)';
            }
        }
    });

    // --- Smooth Scroll for "Reserve for Event Pickup" buttons ---
    const reserveButtons = document.querySelectorAll('.reserve-physical-btn');
    const eventsSection = document.getElementById('events');

    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: 'smooth' });
                
                const card = button.closest('.edition-card');
                const bookingModalSelect = document.getElementById('book-choice');
                if (bookingModalSelect) {
                   if (card.classList.contains('standard')) {
                       bookingModalSelect.value = "Standard Edition - $20";
                   } else if (card.classList.contains('deluxe')) {
                       bookingModalSelect.value = "Deluxe [Worse] Edition - $50";
                   }
                }
            }
        });
    });
    
    // --- Lightbox for Photo Sampler (Kept from original but not actively used by new HTML) ---
    const photoItems = document.querySelectorAll('.photo-item'); // This class is not in the new HTML directly.
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCloseBtn = lightbox ? lightbox.querySelector('.lightbox-close-btn') : null;

    if (lightbox && lightboxImage && lightboxCloseBtn) {
        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                const fullImageSrc = item.dataset.full;
                if (fullImageSrc) {
                    lightboxImage.src = fullImageSrc;
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeLightbox() {
            if (lightbox) {
                lightbox.setAttribute('aria-hidden', 'true');
                if (lightboxImage) lightboxImage.src = "";
                document.body.style.overflow = '';
            }
        }

        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        
        if (lightbox) {
            lightbox.addEventListener('click', (event) => {
                if (event.target === lightbox) closeLightbox();
            });
        }
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }

    // --- <details> dropdown accessibility (CSS handles arrow, this is just for record) ---
    // Native <details> is generally accessible.

    // --- Digital Purchase Link Placeholder Check ---
    const digitalBuyButton = document.querySelector('.buy-digital-btn');
    if (digitalBuyButton && digitalBuyButton.getAttribute('href') === '#digital-purchase-form') {
        console.warn("Digital payment link is a placeholder. Update with your payment gateway URL or form.");
        // digitalBuyButton.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     alert("Digital purchase form/link coming soon!");
        // });
    }

    // --- NEW: Interactive GIF Logic ---
    const interactiveGif = document.getElementById('interactive-gif');
    const frameMessage = document.getElementById('frame-message');
    
    if (interactiveGif && frameMessage) {
        let isPlaying = false;
        let hasStoppedOnce = false;
        let frameCount = 12;
        let startTime;
        let frameDuration = 500;
        
        const frameMessages = {
            1: "Frame 1: [Describe what's happening in first frame - e.g., 'The journey begins...']",
            2: "Frame 2: [Second frame context - e.g., 'A subtle shift appears...']",
            3: "Frame 3: [Third frame description - e.g., 'The transformation continues...']",
            4: "Frame 4: [Fourth frame moment - e.g., 'Colors start to blend...']",
            5: "Frame 5: [Fifth frame observation - e.g., 'A new pattern emerges...']",
            6: "Frame 6: [Sixth frame highlight - e.g., 'Halfway through the cycle...']",
            7: "Frame 7: [Seventh frame detail - e.g., 'The rhythm builds...']",
            8: "Frame 8: [Eighth frame feature - e.g., 'A dramatic shift...']",
            9: "Frame 9: [Ninth frame element - e.g., 'The pieces align...']",
            10: "Frame 10: [Tenth frame moment - e.g., 'Almost complete...']",
            11: "Frame 11: [Eleventh frame detail - e.g., 'The final transition...']",
            12: "Frame 12: [Twelfth frame finale - e.g., 'The cycle completes!']"
        };

        // Store the original animated and static sources
        const animatedSrc = interactiveGif.dataset.animatedSrc;
        const staticSrc = interactiveGif.dataset.staticSrc;

        // Start with static image
        interactiveGif.src = staticSrc;
        
        // Make sure the cursor shows this is clickable
        interactiveGif.style.cursor = 'pointer';

        // Update the initial blurb
        const gifBlurb = document.querySelector('.gif-blurb');
        if (gifBlurb) {
            gifBlurb.textContent = "Click to start animation";
        }

        // Handle both click and touch events
        ['click', 'touchend'].forEach(eventType => {
            interactiveGif.addEventListener(eventType, (e) => {
                e.preventDefault();

                if (!isPlaying) {
                    // First click - start playing
                    interactiveGif.src = animatedSrc;
                    startTime = Date.now();
                    isPlaying = true;
                    
                    if (gifBlurb) {
                        gifBlurb.textContent = "Click again to capture a frame";
                    }
                } else if (!hasStoppedOnce) {
                    // Second click - stop and show message
                    const timeElapsed = Date.now() - startTime;
                    const currentFrame = Math.floor((timeElapsed % (frameCount * frameDuration)) / frameDuration) + 1;

                    // Create static image of current frame
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = interactiveGif.width;
                    canvas.height = interactiveGif.height;
                    ctx.drawImage(interactiveGif, 0, 0);
                    interactiveGif.src = canvas.toDataURL('image/png');

                    // Show the frame message
                    frameMessage.textContent = frameMessages[currentFrame] || "You caught an interesting moment!";
                    frameMessage.classList.add('visible');

                    if (gifBlurb) {
                        gifBlurb.textContent = `Frame ${currentFrame} captured!`;
                    }

                    isPlaying = false;
                    hasStoppedOnce = true;
                }
            });
        });

        // Prevent default touch behavior
        interactiveGif.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

});