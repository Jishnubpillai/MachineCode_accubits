const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.getAllUserDetails =  (req, res, next) => {
    User.find({
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
              }
          
              if (users && users.length === 0 ) {
                res.status(400).send({ message: "Failed! Failed to fetch user details!" });
                return;
              }
      });
    users.forEach(user =>{
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          
    })
      

     

      
};