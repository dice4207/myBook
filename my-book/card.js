// Set up Stripe.js
const stripe = Stripe('your_publishable_key');
const elements = stripe.elements();

// Create the card input element
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Create token or handle payment intent
  const {paymentMethod, error} = await stripe.createPaymentMethod(
    'card', cardElement
  );

  if (error) {
    // Display error.message
  } else {
    // Send paymentMethod.id to your server to finish the purchase
  }
});