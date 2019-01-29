var express = require('express');
var Room = require('../model/rooms');
var router = express.Router();


//adding the /rooms route to our /api router
router.route('/')
    //retrieve all rooms from the database
    .get(function(req, res) {
        //looks at our Room Schema
        Room.find(function(err, rooms) {
            if (err) {
                res.send(err);
            }
            else {
                //responds with a json object of our database rooms.
                res.json(rooms);
            }
        });
    })
    
    //post new comment to the database
    .post(function(req, res) {
        var room = new Room();
        room.name = req.body.name;
        room.comments = req.body.comments;
        room.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'room successfully added!'
                });
            }
        });
    });

//server.js
//Add this after our get and post routes
//Adding a route to a specific room based on the database ID
router.route('/:room_id')

    .get(function(req, res) {
        //looks at our Room Schema
        Room.findById(req.params.room_id, function(err, room) {
            if (err) {
                res.send(err);
            }
            else {
                //responds with a json object of our database rooms.
                res.json(room);
            }
        });
    })
    .post(function(req, res) {
            Room.findById(req.params.room_id, function(err, room) {
                if (err) {
                    res.send(err);
                }
                else {
                    room.comments.push(req.body);
                
                room.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }
                    else {
                        return res.json({
                            message: 'comment has been added'
                        });
                    }
                });
                }
            });
        });
    
    
    //delete method for removing a room from our database
    
    router.route('/:room_id/:comment_id')
    //The put method gives us the chance to update our room based on 
    //the ID passed to the route
    .put(function(req, res) {
        Room.findById(req.params.room_id, function(err, room) {
            if (err) {
                res.send(err);
            }
            else {
                room.comments.map(comment => {
                    if (comment.id === req.params.comment_id) {
                    //nothing was changed we will not alter the field.
                    (req.body.author) ? comment.author = req.body.author: null;
                    (req.body.text) ? comment.text = req.body.text: null;
                    }
                });
            }
            //save room
            room.save(function(err) {
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
        Room.findById(req.params.room_id, function(err, room) {
            if (err) {
                res.send(err);
            }
            else {
                var commentsArray = room.comments;
                room.comments.map(comment => {
                    if (comment.id === req.params.comment_id) {
                        commentsArray.splice(comment.__index, 1);
                    }
                });
            }
            room.save(function(err) {
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