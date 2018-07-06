const express 			= require('express');
const router 			= express.Router();
var db = require('../config/db');
var getSqlConnection = db.getSqlConnection;
var querySql = db.querySql;
var jwt     = require('jsonwebtoken');
var config = ('../config_key');
var bcrypt = require('bcrypt');

var _       = require('lodash');

var secretKey = "don't share this key";

function createToken(user) {
   // return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60*60*5 });

    return jwt.sign(_.omit(user, 'password'), secretKey,{ expiresIn: 60*60*5 });
  }

function getUserDB(username, done) {
  Promise.resolve().then(function () {
    querySql('SELECT * FROM users WHERE username=? LIMIT 1', [username])
        .then(function (rows){
                done(rows[0]);
        }).catch(function (err) {
            return Promise.reject(err);
        })
  })
}


router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Umar Test API", data:{"version_number":"v1.0.0"}})
  });


router.post('/user/signup', function(req,res,next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    getUserDB(req.body.username, function(user){
        if(!user) {
          user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            email: req.body.email
          };

          return querySql('INSERT INTO users SET ?', [user])
            .then(function (result){
                newUser = {
                    id: result.insertId,
                    username: user.username,
                    password: user.password,
                    email: user.email
                  };
                  res.status(200).send({
                    id_token: createToken(newUser),
                    message:'respone jwt'
                  });
            }).catch(function (err) {
                console.error("got error: " + err);
                if (err instanceof Error) {
                res.status(400).send("A user with that username already exists");
                } else {
                res.status(200).json({ "code": 1000, "message": err });
                }
             });

        }
        else res.status(400).send({
            status:400,
            message:"A user with that username already exists"
        });
    })

})


router.post('/user/login', function(req,res,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).send("You must send the username and the password");
  }

  getUserDB(req.body.username, function(user){
    const password = req.body.password;

    
    //process.exit()

    if(!user){
      res.status(401).send("The username is not existing");
    }
    if(!bcrypt.compareSync(password, user.password)){
      res.status(401).send("The username or password don't match");
    }
    res.status(201).send({
      id_token: createToken(user),
      message:'respone jwt'
    });

  })
})

router.get('/user/check/:username',function(req,res,next){
  if(!req.params.username){
    res.status(400).send("You must set a username");
  }

  getUserDB(req.params.username,function(user){
    if(!user) res.status(200).send({username: "user available"})
    else
    res.status(400).send({error: "username already exists"})
  })
})

router.post('/user/login', function(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send("You must send the username and the password");
    }
    getUserDB(req.body.username, function(user){
      if (!user) {
        return res.status(401).send("The username is not existing");
      }
      if (user.password !== req.body.password) {
        return res.status(401).send("The username or password don't match");
      }
      res.status(201).send({
        id_token: createToken(user)
      });
    });
  });


module.exports = router;