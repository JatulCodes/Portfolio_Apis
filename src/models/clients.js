const mongoose = require("mongoose");
const validator = require("validator");


const portfolioApi = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        minlength: 2,

    },
    email: {
        
        type: String,
        required: true,
        index:true,
        sparse:true,
        unique: [true, "Email is already exist"],
        validate(value) {
    if (!validator.isEmail(value)) {
    throw new Error("invalid email id")
    }
}
            },

    Subject:{
        type:String,
        required:true,
        
    },
    Message:{
        type:String,
    }
})

const Clients = new mongoose.model('Clients',portfolioApi);

module.exports = Clients;