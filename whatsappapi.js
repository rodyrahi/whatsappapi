
const express = require('express')
var client = require("./whatsapp.js");

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


// app.get('/', async (req, res) => {

//   const result =  await executeQuery(`SELECT * FROM bot`)
//   console.log(result);
//   client.on('message', msg => {


//     if (msg.body.toLocaleLowerCase() == result[0].message.toString().toLocaleLowerCase()) {


//         msg.reply(result[0].reply);
//     }
  
//     console.log(msg.body);
//   });
  
//   res.render('home')
// })


// app.post('/message', async (req, res) => {

//   const {message , reply} = req.body

//   const result =  await executeQuery(`INSERT INTO bot (message, reply) VALUES ('${message}', '${reply}')`)
  

//   // console.log(result);
//   // client.on('message', msg => {


//   //   if (msg.body.toLocaleLowerCase() == result[0].message.toString().toLocaleLowerCase()) {


//   //       msg.reply(result[0].reply);
//   //   }
  
//   //   console.log(msg.body);
//   // });
  
//   res.redirect('/')
// })




app.post('/send-message', (req, res) => {
  try {
    const { number, message } = req.body;
    const formattedNumber = '91' + number.toString();

    console.log(formattedNumber);

    client.on('ready', () => {
      console.log('Client is ready!');

      client
        .sendMessage(`${formattedNumber}@c.us`, message)
        .then(() => {
          console.log('Message sent successfully');
          res.json({ status: 'ok' }); // Send JSON response with "ok"
        })
        .catch((error) => {
          console.error('Error:', error);
          res.status(500).json({ status: 'error' }); // Send JSON response with "error"
        })
        .finally(() => {
          client.destroy(); // Close the client after the message is sent or an error occurs
        });
    });

    client.initialize();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error' }); // Send JSON response with "error"
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
