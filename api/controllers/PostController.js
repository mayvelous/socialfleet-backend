/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tweet: function(req, res){

        User.findOne(req.userId, function (err, user) {

            var objToPost = {};
            objToPost.message = req.body.message;
            objToPost.scheduledFor = req.body.scheduledFor;
            objToPost.owner = req.userId;
            objToPost.isPosted = false;

            Post.create(objToPost).exec(function(err, post){
                //res.send(post);
                console.log('working',  post, err);
                res.send(200).end();
            });


        });

    },

    myposts: function(req, res){
        Post.find({owner: req.userId}, function(err, posts){
            res.json(posts);
        });
    }



};

