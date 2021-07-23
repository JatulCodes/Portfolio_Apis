const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://portfolio:PortfolioApi@cluster0.guvyi.mongodb.net/portfolioApi?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,  
    useFindAndModify:false
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("No connection");
})
