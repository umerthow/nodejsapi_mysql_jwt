var express = require('express')
var app = express();
var profile = require('../controller/ProfileController');

app.get('/',function(req,res,next){

    const users = ['rizafahmi', 'adhywiranata', 'tamatamvan','umerthow'];
    users.map((user) => {
        profile.get(user);
    })
    
});

module.exports = app;