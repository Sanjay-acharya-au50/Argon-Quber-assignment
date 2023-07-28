const mongoose = require('mongoose');

const DB = 'mongodb+srv://sanjayacharya992:san123@cluster0.w330uji.mongodb.net/argon_internship'
mongoose.connect(DB).then(()=>{console.log('data Base Loading..')}).catch((e)=>console.log(e))