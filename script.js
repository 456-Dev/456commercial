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
        let gameEnded = false;
        let frameCount = 12;
        let startTime;
        let frameDuration = 500;
        
        // Frame image URLs - updated to use image_lottery folder
        const frameImages = {
            1: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame1.png?raw=true",
            2: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame2.png?raw=true",
            3: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame3.png?raw=true",
            4: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame4.png?raw=true",
            5: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame5.png?raw=true",
            6: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame6.png?raw=true",
            7: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame7.png?raw=true",
            8: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame8.png?raw=true",
            9: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame9.png?raw=true",
            10: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame10.png?raw=true",
            11: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame11.png?raw=true",
            12: "https://github.com/456-Dev/456commercial/blob/main/image_lottery/frame12.png?raw=true"
        };
        
        const frameMessages = {
            1: "Diego Sanchez's Page from the section [Meditations]",
            2: "Untitled Photo from the section [Don't play water]",
            3: "λ = NotMYdog from the section [HFIλ]",
            4: "Untitled Photo from the section [Don't play water]",
            5: "why? GOD. from the section [odds & ends pt.17]",
            6: "Untitled Photo from the section [ROAD KILL]",
            7: "Untitled Photo from the section [ROAD KILL]",
            8: "5G from the section [Video Screenshots of America]",
            9: "λ = inverted from the section [HFIλ]",
            10: "Untitled Photo from the section [DOUBLE UP!!]",
            11: "Elvis's Jet from the section [Video Screenshots of America]",
            12: "Untitled Photo from the section [DOUBLE UP!!]"
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

                if (gameEnded) {
                    return; // Do nothing if game has ended
                }

                if (!isPlaying) {
                    // First click - start playing
                    interactiveGif.src = animatedSrc;
                    startTime = Date.now();
                    isPlaying = true;
                    
                    if (gifBlurb) {
                        gifBlurb.textContent = "Click again to capture a frame";
                    }
                } else {
                    // Second click - stop and show specific frame
                    const timeElapsed = Date.now() - startTime;
                    const currentFrame = Math.floor((timeElapsed % (frameCount * frameDuration)) / frameDuration) + 1;
                    
                    // Use the specific frame image instead of trying to capture from GIF
                    interactiveGif.src = frameImages[currentFrame];
                    
                    // Show the frame message
                    frameMessage.textContent = frameMessages[currentFrame] || "You caught an interesting moment!";
                    frameMessage.classList.add('visible');

                    if (gifBlurb) {
                        gifBlurb.textContent = `Frame ${currentFrame} captured!`;
                    }

                    isPlaying = false;
                    gameEnded = true; // End the game
                    interactiveGif.style.cursor = 'default'; // Remove pointer cursor
                }
            });
        });

        // Prevent default touch behavior
        interactiveGif.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

});