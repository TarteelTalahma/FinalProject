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
const admins = require("../model/adminSchema")
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { assert, count } = require("console");
const { findOne } = require("../model/userSchema");
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
      recommendation:[{name:"" , count:0}]

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


app.post("/adminLogin", async(req, res) =>{
  const {email, password} = req.body;
  const admin = await admins.findOne({email});
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
    admins.findOne({email: adminEmail}).then((data)=>{
      res.send({status: "ok", data: data});
    }).catch((error)=>{
      res.send({status: "error", data: error})
    })
  } catch (error) {
  }
})

app.get("/users", (err, res) => {
  users.find({}).exec(function (err, result) {
    res.send(result);
  });
});

app.get("/bookshops", (err, res) => {
  bookshops.find({}).exec(function (err, result) {
    res.send(result);
  });
});

app.post("/addBook", async(req, res) =>{
  const {bookName, category, publisher, author, bookShopeID} = req.body;
  try {
    await books.create({
      bookName,
      category,
      publisher,
      author,
      bookShopeID,
    })
    res.send({status: "ok"})
  } catch (error) {
    res.send({status: "ok"})
  }
})

app.post("/addBookshop", async(req, res) =>{
  const {bookShopeID, bookShopeName, address, phoneNumber, email} = req.body;
  try {
    await bookshops.create({
      bookShopeID, 
      bookShopeName, 
      address, 
      phoneNumber, 
      email,
    })
    res.send({status: "ok"})
  } catch (error) {
    res.send({status: "ok"})
  }
})

app.post("/addAdmin", async(req, res) =>{
  const {email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldAdmin = await admins.findOne({email});
    if(oldAdmin){
      return res.json({error: "admin Exists"})
    }
    await admins.create({
      email,
      password: encryptedPassword,
    })
    res.send({status: "ok"})
  } catch (error) {
    res.send({status: "ok"})
  }
})

app.get(("/recommendation"),  async (req,response)=>{
  let count2 = 0;
  users.findOne({email: req.query.email}).
  then(async (value)=>{
let rec =value.recommendation
    console.log(value)
    if(value.recommendation.length==0){
rec.push({name:req.query.categoryName, count: 1})

  console.log(value)
  }
else if(value.recommendation.find((q)=>q.name==req.query.categoryName)==undefined)
rec.push({name:req.query.categoryName, count: 1})

else{
    value.recommendation.forEach(e=>{
      if(e.name==req.query.categoryName){
       e.count=e.count+1
        }
  })
  }
    const user = await users.findOneAndUpdate({email: req.query.email},{recommendation:rec})})
   response.end() 
})

app.get(("/recommendedBooks/:email"), async(req,res)=>{
  let user = await users.find({email: req.params.email});
  let recommendedBook = user[0].recommendation;
  recommendedBook.sort((a,b)=>a.count-b.count)
  console.log(recommendedBook[recommendedBook.length-1])
  let allRecBooks1 = await books.find({category: recommendedBook[recommendedBook.length-1].name}).limit(3);
  let allRecBooks2 = await books.find({category: recommendedBook[recommendedBook.length-2].name}).limit(2);
  let allRecBooks3 = await books.find({category: recommendedBook[recommendedBook.length-3].name}).limit(1);
  console.log(recommendedBook)
  allRecBooks1 = [...allRecBooks1, ...allRecBooks2, ...allRecBooks3]
  res.send({recommendation: allRecBooks1});
})



app.get('/search', async(req, res) => {
  const searchTerm = req.query.q;
  searchResults = await books.find({})
  searchResults = searchResults.filter(result => result.bookName.includes(searchTerm));
  res.json(searchResults);
});

app.listen(port, function () {
  console.log(`Server running in port${port}`);
});