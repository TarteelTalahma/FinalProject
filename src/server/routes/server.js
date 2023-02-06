const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const session = require("express-session");
const { request, response } = require("express");
const path = require("path");
const users = require("../model/userSchema");
const books = require("../model/bookSchema");
const bookshops = require("../model/bookshopSchema");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET ="DUSIGFILSDIUGSNIJLSDIGFUEJLWHIODWEKLWEHIUDHSLND";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "node_modules")));
mongoose.connect("mongodb://localhost/onlineBooks", { useNewUrlParser: true });
mongoose.set('strictQuery', true);
const port = 3000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});

app.post("/register", async(req, res) =>{
  const {firstName, lastName, email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await users.findOne({email});
    if(oldUser){
      return res.json({error: "User Exists"})
    }
    await users.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    })
    res.send({status: "ok"})
  } catch (error) {
    res.send({status: "ok"})
  }
})

app.post("/loginUser", async(req, res) =>{
  const {email, password} = req.body;
  const user = await users.findOne({email});
  if(!user){
    return res.json({error: "User Not Found"})
  }
  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({email: user.email}, JWT_SECRET);

    if(res.status(201)){
      return res.json({status: "OK", data: token});
    }
    else{
      return res.json({erroe: "error"})
    }
  }
  res.json({status: "error", error: "Invalid Password"})
})


app.post("/adminLoginUser", async(req, res) =>{
  const {email, password} = req.body;
  const admin = await bookshops.findOne({email});
  if(!admin){
    return res.json({error: "admin Not Found"})
  }
  if(await bcrypt.compare(password, admin.password)){
    const token = jwt.sign({}, JWT_SECRET);

    if(res.status(201)){
      return res.json({status: "OK", data: token});
    }
    else{
      return res.json({erroe: "error"})
    }
  }
  res.json({status: "error", error: "Invalid Password"})
})

app.get("/books", (err, res) => {
  books.find({}).exec(function (err, result) {
    res.send(result);
  });
});

app.get("/categories",async (req, res) => {
  const category =await books.aggregate([
    {$group:{_id :"$category"}}
  ])
    res.send(category);
})

app.get("/categoriesWithBooks", async(req, res) => {
  const bookData =await books.aggregate([
    {$group:{_id :"$category"}}
  ])
  let arr=[];
  bookData.forEach((e)=>{
    arr.push(e);
    books.find({category: e._id},(err,result)=>{
      console.log(result)

     arr.push(result.bookName)
     })
  })  
 

  res.send(arr);
})

app.get("/categories/:name",async (req, response) => {
  const NameOfCategory = req.params.name
  console.log(NameOfCategory)
 books.find({category: NameOfCategory},(err,res)=>{
  response.send(res)
 })
})
/*app.get("/libraryOfBook/:NameOfBook",async (req , response)=>{
  const NameOfBook= req.params.NameOfBook;
    const book =  books.findOne({bookName: NameOfBook}, (err,res)=>{
    bookshops.findOne({bookShopeID: res.bookShopeID}, (err,result)=>{
      response.send(result);
    })
  })
})*/

app.get("/libraryOfBook/:bookShopId",async (req , response)=>{
  const IdOfbookShop= req.params.bookShopId;
  bookshops.find({bookName: IdOfbookShop}, (err,result)=>{
    response.send(result);
  })
  console.log(IdOfbookShop)
})

app.post("/userData", async(req, res)=>{
  const {token} = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    users.findOne({email: userEmail}).then((data)=>{
      res.send({status: "ok", data: data});
    }).catch((error)=>{
      res.send({status: "error", data: error})
    })
  } catch (error) {
  }
})

app.post("/adminData", async(req, res)=>{
  const {token} = req.body;
  try {
    const admin = jwt.verify(token, JWT_SECRET);
    const adminEmail = admin.email;
    bookshops.findOne({email: adminEmail}).then((data)=>{
      res.send({status: "ok", data: data});
    }).catch((error)=>{
      res.send({status: "error", data: error})
    })
  } catch (error) {
  }
})

app.listen(port, function () {
  console.log(`Server running in port${port}`);
});