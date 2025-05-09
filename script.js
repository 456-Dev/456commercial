document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Modal Functionality ---
    const modal = document.getElementById('booking-modal');
    const modalEventNameDisplay = document.getElementById('modal-event-name');
    const formEventNameHiddenInput = document.getElementById('form-event-name-hidden');
    const bookSlotButtons = document.querySelectorAll('.book-slot-btn');
    const closeModalButton = document.querySelector('.modal-close-btn');

    bookSlotButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return; // Don't open modal for sold out events

            const eventCard = button.closest('.event-card');
            const eventName = eventCard.dataset.eventName;
            
            modalEventNameDisplay.textContent = `Book Slot for: ${eventName}`;
            if (formEventNameHiddenInput) { // Check if element exists
                formEventNameHiddenInput.value = eventName;
            }
            
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    if(closeModalButton) closeModalButton.addEventListener('click', closeModal);

    // Close modal if overlay is clicked
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Clicked on the overlay itself
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
    
    // --- Formspree Thank You (Basic) ---
    // If you want a custom thank you page/message, Formspree allows redirecting.
    // This basic JS is just to clear the form after an assumed successful submission.
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // You might want to disable the submit button here to prevent multiple submissions
            // e.target.querySelector('button[type="submit"]').disabled = true;

            // After submission (Formspree handles the actual send)
            // To give a visual cue - you could replace this with a redirect or more complex UI update.
            setTimeout(() => {
                // e.target.reset(); // Clears the form
                // closeModal(); // Close modal
                // alert("Thanks for your reservation! We'll email you confirmation."); // Basic alert
                // Better to handle this on Formspree redirect if possible for UX.
            }, 500); // Small delay
        });
    }

    // --- Slots Tracker Update (Client-side visual update) ---
    // This is just for VISUAL representation. Actual slot tracking is backend/manual.
    document.querySelectorAll('.event-card').forEach(card => {
        const totalSlots = parseInt(card.dataset.eventSlotsTotal, 10);
        const bookedSlots = parseInt(card.dataset.eventSlotsBooked, 10);
        const availableSlots = totalSlots - bookedSlots;
        
        const slotsAvailableDisplay = card.querySelector('.slots-available');
        if (slotsAvailableDisplay) {
            slotsAvailableDisplay.textContent = availableSlots;
        }

        const slotsBarFilled = card.querySelector('.slots-bar-filled');
        if (slotsBarFilled && totalSlots > 0) {
            const percentageBooked = (bookedSlots / totalSlots) * 100;
            slotsBarFilled.style.width = `${percentageBooked}%`;

            if (availableSlots === 0) {
                card.classList.add('sold-out');
                slotsBarFilled.style.backgroundColor = 'var(--pixel-red)';
                const button = card.querySelector('.book-slot-btn');
                if(button) {
                    button.disabled = true;
                    button.textContent = 'Sold Out';
                }
            } else if (percentageBooked > 75) {
                slotsBarFilled.style.backgroundColor = 'var(--pixel-yellow)';
            } else {
                slotsBarFilled.style.backgroundColor = 'var(--pixel-green)';
            }
        }
    });

});