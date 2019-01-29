var express = require('express');
var Comment = require('../model/comments');
var router = express.Router();


//adding the /comments route to our /api router
router.route('/')
    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            else {
                //responds with a json object of our database comments.
                res.json(comments);
            }
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var comment = new Comment();
        //body parser lets us use the req.body
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'Comment successfully added!'
                });
            }
        });
    });

//server.js
//Add this after our get and post routes
//Adding a route to a specific comment based on the database ID
router.route('/:comment_id')
    //The put method gives us the chance to update our comment based on 
    //the ID passed to the route
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            else {
                //setting the new author and text to whatever was changed. If 
                //nothing was changed we will not alter the field.
                (req.body.author) ? comment.author = req.body.author: null;
                (req.body.text) ? comment.text = req.body.text: null;
            }
            //save comment
            comment.save(function(err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        message: 'Comment has been updated'
                    });
                }
            });
        });
    })
    //delete method for removing a comment from our database
    .delete(function(req, res) {
        //selects the comment by its ID, then removes it.
        Comment.remove({
            _id: req.params.comment_id
        }, function(err, comment) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'Comment has been deleted'
                });
            }
        });
    });
    
module.exports = router;