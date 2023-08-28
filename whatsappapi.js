
const express = require('express')
var client = require("./whatsapp.js");
var con = require("./database.js");
const app = express()
const port = 8888
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


app.get('/', async (req, res) => {

  const result =  await executeQuery(`SELECT * FROM bot`)
  console.log(result);
  client.on('message', msg => {


    if (msg.body == result[0].message.toString()) {


        msg.reply(result[0].reply);
    }
  
    console.log(msg.body);
  });
  
  res.render('home')
})

app.post('/send-message', (req, res) => {
  try {
    const { number, message } = req.body;

    const formattedNumber = '91' + number.toString();


    console.log(formattedNumber);

    client
      .sendMessage(`${formattedNumber}@c.us`, message)
      .then(() => res.json({ status: 'ok' })) // Send JSON response with "ok"
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ status: 'error' }); // Send JSON response with "error"
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error' }); // Send JSON response with "error"
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
