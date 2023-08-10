
const express = require('express')
var client = require("./whatsapp.js");

const app = express()
const port = 8888

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:number/[:message]', (req, res) => {
  const number = req.params.number;
  const formattedNumber = '91' + number.toString();
  const message = req.params.message.replace(/['\[\]]/g, ''); // Remove single quotes, square brackets from the message

  console.log(formattedNumber);

  client
    .sendMessage(`${formattedNumber}@c.us`, message)
    .then(() => res.json({ status: 'ok' })) // Send JSON response with "ok"
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ status: 'error' }); // Send JSON response with "error"
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
