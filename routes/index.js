var express = require('express');
var router = express.Router();

var Pusher = require('pusher');




/* GET home page. */
router.get('/', function(req, res, next) {
  var pusher = new Pusher({
    appId: '550508',
    key: '582cbdbfe6a34aeda1da',
    secret: 'fb0e5960cb59ae746f3c',
    cluster: 'ap1',
    encrypted: true
  });
  
pusher.trigger('my-channel', 'my-event', {
      "message": "hello Umar",
    }, function(){
      res.render('index', { 
        page_title: "Customer - Node.js",
        title: 'Megan Express' ,
        name: 'Anton Beundro'
      })
});


 

});

module.exports = router;
