const mongoose = require('mongoose');

const manualUser = mongoose.Schema(
    { userName : String,
     firstName : String,
     lastName : String,
     email : String,
     password : String,
    } 
)

const Manualuser = mongoose.model('AorgonNormalAccount', manualUser);

module.exports = Manualuser;