var express = require('express')
var router = express.Router();
var db = require('../config/db');
var getSqlConnection = db.getSqlConnection;
var querySql = db.querySql;
var jwt     = require('express-jwt');
var secretKey = "don't share this key";
var jwtCheck  = jwt({
    secret : secretKey
})

router.use('/v1/customers',jwtCheck);
router.get('/v1/customers',function(req,res,next){
    Promise.resolve().then(function () {
        var userQuery = "SELECT * FROM customer ORDER BY id DESC";
        return querySql(userQuery)
           .then(function(rows){
              if (rows.length == 0) {
                return Promise.reject("did not find customer");
              }
      
              var customers = rows;
              return customers;
           });
      }).then(function (customers){
        //res.send(JSON.stringify({"status": 200, "error": null, "response": customers}));
        res.status(200).json({ "status": 200,"code": 0, "message": "success", "customers": customers});
      })
      .catch(function (err) {
        console.error("got error: " + err);
        if (err instanceof Error) {
          res.status(400).send("General error");
        } else {
          res.status(200).json({ "code": 1000, "message": err });
        }
      });
});

router.get('/v1/customers/detail',function(req,res,next){
  res.status(200).json({ "status": 200,"code": 0, "message": "success"});
})

module.exports = router;