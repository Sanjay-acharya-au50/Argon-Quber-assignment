const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
  displayName: String,
  firstName : String,
  lastName : String,
  emails: String,
  photos: Array,
  provider: String,
 
})

const user = mongoose.model('AorgonSocialAccount', UserSchema);

module.exports = user;