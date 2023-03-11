const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {

    res.sendFile(__dirname + "/signup.html");

});

// app.get("/styles.css" , function(req, res) {

//     res.sendFile ( __dirname + "/styles.css");
  
// })

// app.get("/images/Logo.png", function(req, res) {

//     res.sendFile(__dirname + "/images/Logo.png");

// });



app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    };
   
    const jsonData = JSON.stringify(data);
    // console.log(jsonData); // {"email_address":"makkyz@gmail.com","status":"subscribed","merge_fields":{}}

    const url = "https://us10.api.mailchimp.com/3.0/lists/042f33c6a3/members"

    const options = {
      method: "POST",
      auth: "ChokerHub:d55e1aecd29cdd6414bd260d7688788b-us10"
    };
   
    const request = https.request(url, options, function(response) {

      if (response.statusCode === 200) {
        // res.send("Successfully subscribed!");
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      response.on("data", function(data) {
        console.log(JSON.parse(data))
      })
    });
   
    // request.write(jsonData);
    request.end();
   
  });

  app.post("/failure", function(req, res) {
    res.redirect("/");
  });

app.listen(3000, function (){
    console.log("Server is running on port 3000");
});


// API KEY

// d55e1aecd29cdd6414bd260d7688788b-us10


// List 

// 042f33c6a3 