const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const logger = require("./utils/logger");

const app = express();  

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ashu6020",
  database: "login_app"
});

db.connect((err)=>{
  if(err){
    console.log("Database connection error", err);
  }else{
    console.log("Database connected");
  }
});


// LOGIN API
app.post("/api/login",(req,res)=>{

 const {email,password} = req.body;

 logger.info("Login request received");

 db.query(
  "SELECT * FROM users WHERE email=? AND password=?",
  [email,password],
  (err,result)=>{

   if(err){
    logger.error("Database error: " + err);
    return res.json({success:false});
   }

   if(result.length>0){
    logger.info("Login successful for " + email);
    res.json({success:true});
   }else{
    logger.warn("Invalid login attempt: " + email);
    res.json({success:false});
   }

  }
 );

});


// SERVER START
app.listen(5000, "0.0.0.0", () => {
  logger.info("Server running on port 5000");
});
app.post("/add-customer",(req,res)=>{

 const {name,village,phone} = req.body;

 logger.info(`Customer Data: ${name} ${village} ${phone}`);

 db.query(
  "INSERT INTO customers (name,village,phone) VALUES (?,?,?)",
  [name,village,phone],
  (err,result)=>{

   if(err){
    logger.error("Database error: " + err);
    return res.json({success:false});
   }

   logger.info("Customer added successfully");

   res.json({success:true});

  }
 );

});
app.post("/milk-entry",(req,res)=>{

 const {
  agentId,
  name,
  can,
  ltr,
  fat,
  snf,
  rate,
  total,
  type,
  date
 } = req.body;

 console.log("Milk Entry:",req.body);

 db.query(
  "INSERT INTO milk_entries (agentId,name,can,ltr,fat,snf,rate,total,type,date) VALUES (?,?,?,?,?,?,?,?,?,?)",
  [agentId,name,can,ltr,fat,snf,rate,total,type,date],
  (err,result)=>{

   if(err){
    console.log("DB Error:",err);
    return res.json({
     success:false,
     message:"Database error"
    });
   }

   res.json({
    success:true,
    message:"Milk entry saved"
   });

  }
 );

});