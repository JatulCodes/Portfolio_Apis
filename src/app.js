const express = require("express");
const app = express();
require("./db/conns");
const Clients = require("./models/clients");
const port = process.env.PORT || 3000;


app.use(express.json());
//create a clents connection
// app.post("/clients",(req,res)=>{
//     console.log(req.body)
//     const user = new Clients(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// })

app.post("/clients", async (req, res) => {

    try {
        const user = new Clients(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) { res.status(400).send(e); }


})
app.get("/", async (req, res) => {
    try {
        const ClientList = await Clients.find();
        res.status(200).send(ClientList);

    } catch (e) { res.status(400).send(e); }

})
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
    console.log(`chal gaya bc ${port}`);
})
