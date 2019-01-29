var express = require('express');
var Friends = require('../model/friends');
var router = express.Router();


//adding the /friends route to our /api router
router.route('/')
    //retrieve all friends from the database
    .get(function(req, res) {
        //looks at our Friends Schema
        Friends.find(function(err, friends) {
            if (err) {
                res.send(err);
            }
            else {
                //responds with a json object of our database friends.
                res.json(friends);
            }
        });
    })
    
    //post new comment to the database
    .post(function(req, res) {
        var friend = new Friends();
        friend.user_id = req.body.user_id;
        friend.email = req.body.email;
        friend.nickname = req.body.nickname;
        friend.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'friend successfully added!'
                });
            }
        });
    });

//server.js
//Add this after our get and post routes
//Adding a route to a specific friend based on the database ID
router.route('/:friend_id')

    .get(function(req, res) {
        //looks at our Friends Schema
       Friends.find(function(err, friends) {
            if (err) {
                res.send(err);
            }
            else {
                var friendArray = [];
                friends.map(friend => {
                    if(friend.user_id === req.params.friend_id){
                        friendArray.push(friend);
                    }
                });
                res.json(friendArray);
            }
        });
    })
    .post(function(req, res) {
            Friends.findById(req.params.user_id, function(err, friend) {
                if (err) {
                    res.send(err);
                }
                else {
                    friend.comments.push(req.body);
                
                friend.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }
                    else {
                        return res.json({
                            message: 'friend has been added'
                        });
                    }
                });
                }
            });
        });
    
    
    //delete method for removing a friend from our database
    
    router.route('/:friend_id/:comment_id')
    //The put method gives us the chance to update our friend based on 
    //the ID passed to the route
    .put(function(req, res) {
        Friends.findById(req.params.friend_id, function(err, friend) {
            if (err) {
                res.send(err);
            }
            else {
                friend.comments.map(comment => {
                    if (comment.id === req.params.comment_id) {
                    //nothing was changed we will not alter the field.
                    (req.body.author) ? comment.author = req.body.author: null;
                    (req.body.text) ? comment.text = req.body.text: null;
                    }
                });
            }
            //save friend
            friend.save(function(err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        message: 'comment has been updated'
                    });
                }
            });
        });
    })
    .delete(function(req, res) {
        Friends.findById(req.params.friend_id, function(err, friend) {
            if (err) {
                res.send(err);
            }
            else {
                var commentsArray = friend.comments;
                friend.comments.map(comment => {
                    if (comment.id === req.params.comment_id) {
                        commentsArray.splice(comment.__index, 1);
                    }
                });
            }
            friend.save(function(err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        message: 'comment has been deleted'
                    });
                }
            });
        })
    });
    
module.exports = router;