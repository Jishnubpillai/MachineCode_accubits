const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');


const db = require("./app/models");
const Role = db.role;

const redis = require('redis');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://jishnu:bQYtAQB5s53LekKp@cluster0.khcwb.mongodb.net/node_angular?retryWrites=true&w=majority").then(() =>{
  console.log("Connected to DB")
  initial();
}).catch((err) =>{
  console.log("Connection Failed" + err);
});

//connect redis

//***************Please uncomment to use redis***************
// const redisPort = 6379
// const client = redis.createClient(redisPort);

// client.on("error", (err) => {
//     console.log(err);
// })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
