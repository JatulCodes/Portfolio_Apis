const mongoose = require("mongoose");
const validator = require("validator");


const clientsdata = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 4,

    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already exist"],
        validate(value) {
    if (!validator.isEmail(value)) {
    throw new Error("invalid email id")
            }
        }
    },
    subject:{
        type:String,
        required:true,
        max:10,
        min:20
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
   
    textArea:{
        type:String,
        max:10,
        min:20
    }
})

const Clients = new mongoose.model('Clients',clientsdata);

module.exports = Clients;