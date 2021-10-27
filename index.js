const http = require("http");
var fs = require("fs");
var path = require("path");
const express = require('express');
const app = express();
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const { urlencoded } = require("express");
const { stringify } = require("querystring");
const mongoose = require('mongoose');
const multer = require('multer');
mongoose.connect("mongodb+srv://teeheeadmin:01011994@cluster0.bjskh.mongodb.net/TeeHee?retryWrites=true&w=majority",{useNewUrlParser:true}, {useUnifiedTopology:true});
var db=mongoose.connection;
//define disk
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/imgs');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload=multer({
    storage:storage
})

//view engine setup 

app.set("views", path.join(__dirname, "views")); //setting views directory for views. 
app.set("view engine", "hbs"); //setting view engine as handlebars 

/// PUBLIC FILEs
app.use(express.static('public'))

/// Khai bao cac Config, Params
const hostname = "localhost";
const port = process.env.PORT || 3000;

/// Khai bao Variables
var solan = 0;

/// REQ chung 
app.use(
    (req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type","text/html");
        console.log("--- ", Date.now(), " \t request !!!", solan++ , req.url);
        next();
    }
);

/// Error-Handling
app.use(
    (err, req, res, next) => {
        res.statusCode = 500;
        console.log("--- ERR", Date.now(), " \t request !!!", solan++ , req.url, err);
        res.end("Broking !!!");
    }
);


/// Khai Bao CODE Xu Ly cho URL dua vao Express - Router

router.get( "/home", 
    (req, res) => {

        res.writeHead(200);
        var data = fs.readFileSync("./views/home.html");
        res.end(data.toString());
});

router.get( "/order", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> Order page ! </h1>");

});


router.get( "/products", 
  (req, res) => {
        db.collection('Products').find({}, async (err, docs) => {
            if (err){
                console.log("\n ERR: ", err);
                process.exit(0);
            }
            else {
                result = await docs.toArray();
                console.log(result);
                res.render("products", { products : result });
            }
        });
          
    }
);


router.get( "/about", 
    (req, res) => {
        res.render("About");

});

//connect mongodb
//need to have this dont know why
app.use(bodyParser.urlencoded({extended:true}));


app.get( "/admin", 
    (req, res) => {

        res.render('admin')
        

});



//view all products
router.get( "/adminview", 
    (req, res) => {
        db.collection('Products').find({}, async (err, docs) => {
            if (err){
                console.log("\n ERR: ", err);
                process.exit(0);
            }
            else {
                result = await docs.toArray();
                console.log(result);
                res.render("adminview", { adminview : result });
            }
        });       
    });



//Get info from admin form
router.post("/addcloth",upload.single('image') ,function(req,res){
    var name =req.body.ProName;
    var id = req.body.ProID;
    var price = req.body.Price;
    var quantity =req.body.numofpro;
    var des =req.body.Description;
  
    var image = "imgs/" +req.file.filename;
    var data ={
        "ProID": id,
        "ProName":name,
        "Price": price,
        "numofpro": quantity,
        "Description": des,
        "imglink": image,
        
    }
    //insert into mongodb
    db.collection('Products').insertOne(data, function(err,collection){
        if (err) throw err;
        console.log("added"); 
           
    });
    //return to admin page
    
    return res.redirect('admin')
})

//update data ( BETA )
router.post('/update', function(req,res){
    res.send("test update")
})

//delete
router.get("/deletepro",function(req,res){
    db.collection("Products").deleteOne({ "ProID": req.query.id }, function(err) {
        if (!err) {
                return res.redirect('adminview/')
        }
        else {
                return res.redirect('products')
        }
    });
});

router.get("/prodetail", function(req,res){
    db.collection("Products").findOne({"ProID": req.query.id}, async (err, docs) => {
        if (err){
            console.log("\n ERR: ", err);
            process.exit(0);
        }
        else {
            result = await docs;
            console.log(result);
            res.render("product_detail", { products : result });
        }
    });       
});

router.get( "/signin", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> Signin page ! </h1>");

});


router.get( "/logout", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> logout page ! </h1>");

});


router.get( "/contact", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> Contact page ! </h1>");

});



/// gan root URL vao Router
app.use("/", router);

/// Open Server - Listen PORT
app.listen( port, () => {
    console.log("Start SERVER - LISTEN ", port);
});