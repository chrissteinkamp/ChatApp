var express = require('express');

var router = express.Router();

// fetch user and test password verification

var User = require('../model/users');

router.route('/')
    //retrieve all users from the database
    .get(function(req, res) {
        User.find(function(err, userList) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(userList);
            }
        });
    })
    .post(function(req, res) {
                
                var exists = false; //var to see if user is exists in database
                var diffName = false;   //var to check if username stored in database is consistent (fb login vs. local and google)
                var username;   //var to store username in database to be used if requested username is different from what is stored
                
                User.find(function(err, userList) {
                    if (userList.length !== 0) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            //loop to find if the user exists and has the same username they originally signed up with
                            userList.forEach(function(user) {
                                if (user.email === req.body.email) {
                                    exists = true;
                                    if(user.nickname !== req.body.nickname){
                                        diffName = true;
                                        username = user.nickname;
                                    }
                                }
                            });
                        }
                    }
                    
                    
                    if (exists && !diffName) {      //returns success
                        return res.json({
                            message: 'User Found!',
                            diffName: diffName
                        });
                    } else if(exists && diffName){      //returns success, but with stored username
                        return res.json({
                            message: 'User Found with but with different username!',
                            diffName: diffName,
                            nickname: username
                        });
                    }
                    else {                          //returns an error message or a newly created user account
                        var user = new User();
                        //body parser lets us use the req.body
                        user.email = req.body.email;
                        user.nickname = req.body.nickname;
                        user.save(function(err) {
                            if (err) {
                                return res.json({
                                    message: err.name + " " + err.message
                                });
                            }
                            else {
                                return res.json({
                                    message: 'User successfully added!',
                                    diffName: diffName
                                });
                            }
                        });
                    }
    
                });
       
    });

    module.exports = router;