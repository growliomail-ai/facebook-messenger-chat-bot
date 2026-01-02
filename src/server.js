require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// VERIFY TOKEN
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'verify_token';

// Health check
app.get('/', (req, res) => {
  res.send('Facebook Messenger Bot is running 🚀');
});

// Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook messages
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// IMPORTANT: Render port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`App is running at the port ${PORT}`);
});
