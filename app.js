const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public")); //static purpose is to load any local files (css, images) into our server. All these files must be inside the folder declared between parentheses.
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
     res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
     const email = req.body.email;
     console.log(firstName, lastName, email);

     const data = {
          members: [
               {
                    email_address:email,
                    status: "subscribed",
                    merge_fields: {
                         FNAME: firstName,
                         LNAME: lastName
                    }
               }
          ]
     }

     const jsonData = JSON.stringify(data);
     // First part number (us-xx) is the last part of your API key. The last part after lists/ is your list ID
     const url = "https://us21.api.mailchimp.com/3.0/lists/fec3e05118"
     const options = {
          method: "POST",
          auth: "francisco:9de2d1802820abdda1cc0fb12deeea63-us21" //API key
     }

     const request = https.request(url, options, function(response){

          if (response.statusCode === 200) { //200 means success
               res.sendFile(__dirname + "/success.html");
          } else {
               res.sendFile(__dirname + "/failure.html"); //In case of error, show text
          }

          response.on("data", function(data){
               console.log(JSON.parse(data));
          });
     });

     request.write(jsonData);
     request.end();

});

app.post("/failure", function(req, res){
     res.redirect("/");
});
//the process command is for when we upload our app live and we don't the server. So we set a dynamic Port
// we add || so we can test locally as well
app.listen(process.env.PORT || 3000, function(){
     console.log("server is running on port 3000");
});


// mail chimp API key
// 9de2d1802820abdda1cc0fb12deeea63-us21

// list(Audience) ID
// fec3e05118
