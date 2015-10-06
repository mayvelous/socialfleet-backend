var sails = require('sails');
var Twit = require('twit');

sails.load(function(){
    //checkPosts();
    setInterval(function(){
        checkPosts();
    }, configs.schedulerInterval);
});

function checkPosts(){

    Post.find().where({
        scheduledFor: {'<': new Date()},
        isPosted: false
    }).populate('owner').exec(function(err, posts){
        console.log(posts);
        posts.forEach(function(post){
            sendTweet(post.owner.twitterToken, post.owner.twitterSecret, post.message, function(){
                updateSentPost(post);
            });
        })
    })
}

function sendTweet(token, secret, message, cb){
    var T = new Twit({
        consumer_key: configs.TWITTER_KEY
        , consumer_secret: configs.TWITTER_SECRET
        , access_token: token  //'3227636880-L8Pj9fqbgu6YVBjz57lSXkWe9vbjKNsbQGOHmUI'
        , access_token_secret: secret  //'UDDrE3dKRoWj6trDA7AaL6qFs7FEmtkwYWR2IDqJwE7TU'
    });

    T.post('statuses/update', {
        status: message
    }, function(err, data, response) {
        console.log('sent successfully', err);
        cb();
        //res.send(200).end();
    });
}

function updateSentPost(post){
    post.isPosted = true;
    post.save(function(){
        console.log('post updated');
    })
}