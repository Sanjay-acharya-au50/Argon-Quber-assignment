const mongoose = require('mongoose');

const UserPostModel = mongoose.Schema({
    post : String,
    blog : String,
    UserName : {
        type: mongoose.Schema.Types.ObjectId, 
        // model reference
        ref : 'AorgonNormalAccount',
    }

},{timestamps : true})

const UserPost = mongoose.model('ManualUserPost', UserPostModel);
module.exports = UserPost;