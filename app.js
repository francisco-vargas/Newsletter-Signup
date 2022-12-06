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

     const url = "https://us9.api.mailchimp.com/3.0/lists/e1b9bbd604"
     const options = {
          method: "POST",
          auth: "francisco:9d0bcbc7d457c8d11b87c3a3ed0b9c89-us9"
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
// 9d0bcbc7d457c8d11b87c3a3ed0b9c89-us9

// list ID
// e1b9bbd604
