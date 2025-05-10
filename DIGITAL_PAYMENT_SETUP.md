# Digital Payment Setup

This guide explains how to set up the digital payment options for your photography book.

## Setting Up Payment Information

1. **Update Payment Links**

   Open `index.html` and update the payment links with your actual account information:

   ```html
   <a href="https://venmo.com/yourusername" target="_blank" class="payment-option venmo">Venmo</a>
   <a href="https://cash.app/$yourusername" target="_blank" class="payment-option cashapp">Cash App</a>
   <a href="#" class="payment-option zelle" onclick="alert('Send $5 to your-email@example.com via Zelle'); return false;">Zelle</a>
   ```

   Replace `yourusername` with your actual Venmo username, `$yourusername` with your Cash App username, and `your-email@example.com` with your Zelle email or phone number.

2. **Add Your Digital Book File**

   Place your actual PDF book file in the `assets` folder:
   
   - Filename: `they-said-you-cant-digital.pdf`
   - Location: `/assets/they-said-you-cant-digital.pdf`

   This is the file that users will download after confirming payment or using the promo code.

## Promo Code

The promo code "456" is currently set up to provide free access to the digital book. You can modify this in the `script.js` file:

```javascript
// Promo code that gives free access
const validPromoCodes = ['456'];
```

You can add more promo codes by adding them to the array:

```javascript
const validPromoCodes = ['456', 'FREEBOOK', 'SPECIAL2024'];
```

## How It Works

1. User clicks "Buy Digital" on the Digital Edition card
2. A modal appears showing payment options (Venmo, Cash App, Zelle)
3. User makes payment through one of these services outside your website
4. User clicks "I Swear I Paid $5" to access the download
5. The PDF download link appears

Alternatively, users can enter the promo code "456" to get instant access without payment.

## Honor System

This solution uses an honor system approach. Since there is no automatic verification of payments, some users might download without paying. If this becomes a concern, consider:

1. Updating the PDF periodically with a custom watermark
2. Adding a page that mentions the honor system and encourages honest payment
3. Implementing a more complex system with unique download links (would require server-side code)

## Testing

Before publishing:

1. Test each payment link to ensure it leads to the correct account
2. Verify the PDF download works
3. Test the promo code functionality
4. Test on different devices and browsers 