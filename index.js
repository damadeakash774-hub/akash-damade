index.js     
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'VoiceAgent Backend Running' });
});

app.post('/make-call', async (req, res) => {
  try {
    const { to, from, message, accountSid, authToken } = req.body;
    const client = twilio(accountSid, authToken);
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say language="hi-IN">${message}</Say></Response>`;
    const call = await client.calls.create({ twiml, to, from });
    res.json({ success: true, sid: call.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
