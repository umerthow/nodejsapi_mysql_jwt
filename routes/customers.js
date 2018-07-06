var express = require('express')
var app = express();
 
app.get('/', function(req, res, next) {
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM customer ORDER BY id DESC', function(err,rows){
            if(err) {
            req.flash('error', err);
            console.log("Error Selection : %s", err);
            
            }

           // req.flash('success', 'List Customer Successfull onloaded')
            res.render('customers',
                {
                    page_title: "Customer - Node.js",
                    data: rows
                }
            );
    
        });   
            
     });
});

app.get('/add', function add(req, res, next) {
    res.render('add_customer',
        {
        page_title: "Customer Add - Node.js" 
        }
    );
});


app.post('/add',function (req,res,next){

    req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('address', 'address is required').notEmpty()             //Validate address
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors();
    var input = JSON.parse(JSON.stringify(req.body));
    if( !errors ) {
                    req.getConnection(function (err,connection){
                        var data = {
                            name : input.name,
                            address : input.address,
                            email : input.email,
                            phone : input.email
                        };

                    var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
                        {
                            if(err) {
                                req.flash('error', err);
                                console.log("Error Inserting : %s", err)
                            }
                            req.flash('success', 'Data added successfully!')
                            res.redirect('/customers');
                        });
                    });
                } else {

                    //Display errors to user
                    var error_msg = ''
                    errors.forEach(function(error) {
                        error_msg += error.msg + '<br>'
                    })				
                    req.flash('error', error_msg);	
                    res.render('add_customer',
                        {
                        page_title: "Customer Add - Node.js" 
                        }
                    );
                }
});

app.get('/edit/:id', function (req,res,next){
    var id = req.params.id;

    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM customer WHERE id=?',[id],function(err,rows)
            {
                if(err){
                    console.log("Error selecting row : %s",err);
                    req.flash('error', err);
                }

               
                res.render('edit_customer',
                    {
                        page_title : "Edit Customer - Node.js",
                        data : rows
                    }
                );
            });
    });
})

app.post('/edit/:id', function(req,res,next){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err,connection){
        var data = {
            name : input.name,
            address : input.address,
            email : input.email,
            phone : input.phone
        };

    var query = connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
            if(err) {
                console.log("Error Updating : %s", err)
                req.flash('error', err);
            }
            req.flash('success', 'Success Updating data');
            res.redirect('/customers');
        });
    });
})

app.get('/delete/:id', function(req,res,next){
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
       {
           
            if(err) {
                console.log("Error deleting : %s ",err );
                req.flash('error', err);
            }

            req.flash('success', 'Success Deleting data');
            res.redirect('/customers');
            
       });
       
    });
})

module.exports = app