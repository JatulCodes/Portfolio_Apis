const express = require("express");
const cors = require('cors')
const app = express();
require ('./db/conns');
const Clients = require("./models/clients");
const port = process.env.PORT || 8000;




app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())


app.get("/clients", async (req, res) => {
    try {
        const ClientList = await Clients.find();
        res.status(200).send(ClientList);

    } catch (e) { res.status(400).send(e); }

})
app.post("/clients",async (req, res) => {
        const {Name, email, Subject,Message} =req.body
    
        if(!Name|| !email|| !Subject||  !Message){
            return res.status(422).json({error: "Plase fill the complete form!"})
        }
        try{
            const userExist = await Clients.findOne({email:email });
            if(userExist){
                return res.status(422).json({alert:"Email already exist plase try some other Email Address"});
            }
            const user= new Clients({Name, email, Subject,Message});

            await user.save();
            res.status(201).json({message:"User registerd successfuly"});

        }catch(err){
            console.log(err);

        }
});
app.get("/clients/:id", async (req, res) => {
    try {
        const _id = (req.params.id);
        const clientsListbyid = await Clients.findById(_id);
        if (!clientsListbyid) {
            return res.status(400).send();
        } else {
            res.send(clientsListbyid);
        }
    }
    catch (e) {
        res.send(e);
    }
})
app.patch("/clients/:id", async (req, res) => {
    try {
        const _id = (req.params.id);
        const clientsUpdate = await Clients.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(clientsUpdate);
    }
    catch (e) {
        status(500).send(e);
    }
})
//Delete clients
app.delete("/clients/:id", async (req, res) => {
    try {
        const deleteClients = await Clients.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(deleteClients);

    } catch (e) {
        res.status(400).send(e);
    }

})


//server connection
app.listen(port, () => {
    console.log(`server running on ${port}`);
})
