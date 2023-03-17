import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User, Expense } from "./models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticate from "./authetication.js";
dotenv.config();

const app = express();

//server configuration
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://shravika:sIRXS8PCYlPzZ82d@cluster0.tyhpmkf.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
mongoose.connect(url, (err) => {
    if (!err) {
        console.log("connection sucessfull");
    }
    else {
        console.log(err);
    }
});


const server_error = {
    InternalError: "inter server error",
    userNotFound: "user NotFound",
}


app.post("/userSignup", async (req, res) => {
    const userName = req.body.userName;
    const passcode = req.body.passcode;

    try {
        const result = await User.findOne({ userId: userName });
        if (!result) {
            try {
                User.create({ userId: userName, password: passcode });
                const token = jwt.sign({userId:userName},process.env.TOKEN,{expiresIn:'5m'});

                res.status(200).json({ token: token });
            }
            catch {
                res.status(500).json(server_error.InternalError);
            }
        }
        else {
            res.status(400).json({ mssg: "user already exsists" })
        }
    }
    catch {
        res.status(500).json(server_error.InternalError);
    }

});

app.post("/userLogin", (req, res) => {
    const { userName, passcode } = req.body;
    User.findOne({ userId: userName }, (err, result) => {
        if (!err) {

            if (!result) {
                res.status(400).json(server_error.userNotFound);
            }
            else {
                console.log(result);
                if (result.password === passcode) {
                   
                    const token = jwt.sign({userId:userName},process.env.TOKEN,{expiresIn:'1d'});
                    res.status(200).json({ token:token });
                }
                else {
                    res.status(404).json({ mssg: "invalid user credentials" });
                }
            }
        }
        else {
            res.status(500).json(server_error.InternalError);
        }
    })
});


app.post("/addNewTransaction",authenticate, (req, res) => {
    
    const { title, price, description } = req.body;
    try{
        Expense.create({ 
            userId: req.userId, 
            title: title,
            price: price, 
            description: description, 
            date:(new Date().toLocaleDateString())
        });
        res.status(200).json({mssg:"created a new transaction"});
    }
    catch(e){
        
        res.status(500).json(server_error.InternalError);
    }
});

app.get("/transactions",authenticate,(req,res)=>{

    const userName = req.userId;
    Expense.find({userId:userName},(err,result)=>{
        if(!err){
            res.status(200).json(result);
        }
        else{
           res.status(500).json(server_error.InternalError);
        }
    })

    
})

function getDate(date){
    var datearray = date.split("/");
    var newdate = datearray[0] + '/' + datearray[1] + '/' + datearray[2];
    return new Date(newdate).toLocaleDateString();
}

app.post("/filterByoptions",authenticate,(req,res)=>{
    const {price,currentDate,beforeDate,afterDate} = req.body;
    const userName = req.userId;

    var query = {}
    console.table(req.body);
    query.userId = userName

    if(price!==undefined){
        query.price = {$gte:price}
    }
    if(currentDate!==''&&currentDate!==undefined){
        query.date = getDate(currentDate)
    }
    if(beforeDate!==''&&beforeDate!==undefined){
        query.date = {$lte:getDate(beforeDate)}
    }
    if(afterDate!==''&&afterDate!==undefined){
        query.date = {$gte: getDate(afterDate)}
    }
    if((beforeDate!==''&&beforeDate!==undefined)&&(afterDate!==''&&afterDate!==undefined)){
        query.date ={ $gte: getDate(afterDate), $lte: getDate(beforeDate) }
    }
    console.log(query);
    Expense.find(query,(err,result)=>{
        if(!err){
            res.status(200).json(result);
        }
        else{
            console.log(err);
            res.status(500).json(server_error.InternalError);
        }
    })
    
});

app.delete("/transaction",authenticate,async (req,res)=>{
    const data = await Expense.findByIdAndDelete({_id:req.body.id,userId:req.userId});
    res.status(200).json(data);
});

app.listen(5000, (err) => {
    if (!err) {
        console.log("server has started on port http://localhost:5000");
    }
    else {
        console.log("server has some problem");
    }
});
