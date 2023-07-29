
const express = require('express')
var client = require("./whatsapp.js");

const app = express()
const port = 8888

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:number/:message', (req, res) => {
   
    var number = req.params.number
    number = '91'+ number.toString()
    const message = req.params.message
    console.log(+number);
    client
      .sendMessage(`${+number}@c.us`, message)
      .then(async () =>  res.sendStatus(200))
      .catch((error) => res.sendStatus(500));

  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
