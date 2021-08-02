const mongoose = require("mongoose");
// const validator = require("validator");


const portfolioApi = new mongoose.Schema({
    
    Name: {
        type: String,
        required: true,
        minlength: 2

    },
    email: {
        type: String,
        required: true,
        unique:true
    },

    Subject:{
        type:String,
        required:true
        
    },
    Message:{
        type:String,
        required:true
    }
    
})




const Clients = new mongoose.model('Clients',portfolioApi);

module.exports = Clients;