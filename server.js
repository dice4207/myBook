// server.js
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const querystring = require('querystring');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: set this in your hosting environment variables
// You get this from SendGrid (or similar email service).
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Simple IPN verification helper
function verifyIpn(ipnData, callback) {
  const verificationBody = {
    ...ipnData,
    cmd: '_notify-validate'
  };

  const body = querystring.stringify(verificationBody);

  const req = https.request(
    {
      host: 'ipnpb.paypal.com',
      path: '/cgi-bin/webscr',
      method: 'POST',
      headers: {
        'Content-Length': body.length,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
    (res) => {
      let response = '';
      res.on('data', (chunk) => (response += chunk));
      res.on('end', () => {
        callback(null, response === 'VERIFIED');
      });
    }
  );

  req.on('error', (err) => callback(err, false));
  req.write(body);
  req.end();
}

app.post('/paypal/ipn', (req, res) => {
  // Respond quickly so PayPal knows we received it
  res.status(200).send('OK');

  const ipnData = req.body;

  // Verify IPN with PayPal
  verifyIpn(ipnData, async (err, isValid) => {
    if (err || !isValid) {
      console.error('Invalid IPN or error verifying', err);
      return;
    }

    // Make sure payment is completed and to the right receiver
    const paymentStatus = ipnData.payment_status;
    const receiverEmail = ipnData.receiver_email;
    const itemName = ipnData.item_name;
    const amount = ipnData.mc_gross;

    if (
      paymentStatus === 'Completed' &&
      receiverEmail === 'dicejones47@gmail.com' &&
      itemName.includes('Tracks of a Modern-Day Hobo') &&
      amount === '24.99'
    ) {
      console.log('✅ Valid payment for the book:', ipnData);

      // Buyer email from PayPal data
      const buyerEmail = ipnData.payer_email;

      // OPTIONAL: send a custom thank-you email via SendGrid (or similar)
      try {
        await sgMail.send({
          to: buyerEmail,
          from: 'no-reply@your-domain.com', // must be verified in SendGrid
          subject: 'Thanks for buying Tracks of a Modern-Day Hobo',
          text: `Thank you for your purchase!

We’ve received your payment of $24.99 for “Tracks of a Modern-Day Hobo.”

If you have any questions, just reply to this email.
`,
        });
        console.log('Custom receipt email sent to', buyerEmail);
      } catch (emailErr) {
        console.error('Error sending email', emailErr);
      }

      // Here you could also:
      // - Save order to a database
      // - Mark user’s account as “paid”
    } else {
      console.log('IPN received but did not match expected book payment', ipnData);
    }
  });
});

// Use the port provided by hosting, or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('PayPal IPN listener running on port', PORT);
});