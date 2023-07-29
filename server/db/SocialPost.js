const mongoose = require('mongoose');

const UserPostModel = mongoose.Schema({
    post : String,
    blog : String,
    socialUserName : {
        type: mongoose.Schema.Types.ObjectId, 
        // model reference
        ref : 'AorgonSocialAccount',
    }

},{timestamps : true})

const socialUserPost = mongoose.model('socialUserPost', UserPostModel);
module.exports = socialUserPost;