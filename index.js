import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import chat from "./models/chat.js"
const app=express();

import methodOverride from "method-override";
app.use(methodOverride('_method'));  // important

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine","ejs"); 

app.listen(3000,()=>{
    console.log("Connected");

})

app.get("/",(req,res)=>{
    res.send("App working");
})
 
main().then((res)=>{
console.log("Connected to database");
}).catch((err)=>{
    console.log("error occured");
})
async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
}
 
app.get("/chats",async(req,res)=>{
    let c= await chat.find();
    res.render("index.ejs",{c});
})
app.get("/chats/new",(req,res)=>{
    res.render("New.ejs");
})
app.post("/chats/new",async (req,res)=>{
  await chat.create({from:`${req.body.from}`,to:`${req.body.to}`,msg:`${req.body.msg}`,created_at:new Date()});
   res.redirect("/chats");
})
app.get("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let data=await chat.findById(`${id}`);
    res.render("Edit.ejs",{data})
})
app.put("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let data=req.body;
  await chat.findByIdAndUpdate(`${id}`,data,{new:true});
  res.redirect("/chats");
})
app.delete("/chats/:id/delete",async (req,res)=>{
 let {id}=req.params;
 await chat.findByIdAndDelete(`${id}`);
 res.redirect("/chats");
});
