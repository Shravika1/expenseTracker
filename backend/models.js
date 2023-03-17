import mongoose from "mongoose";

const expense = new mongoose.Schema({
    userId:String,
    title:String,
    price:Number,
    description:String,
    date:Date
});

const user = new mongoose.Schema({
    userId:String,
    password:String,
})

const Expense = mongoose.model('password',expense);
const User = mongoose.model('users',user);

export {User,Expense};
