const http = require("http");
var fs = require("fs");
var path = require("path");
const express = require('express');
const app = express();
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb+srv://teeheeadmin:01011994@cluster0.bjskh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//  /A/B/C/D/.........
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
      mongo.connect(url, { useNewUrlParser: true ,  
          useUnifiedTopology: true },
          async (err, db) => {
              if (err) {
                  console.log("\n ERR: ", err);
                  process.exit(0);
              }
              console.log("\n Connected !");
              const db1 = db.db('TeeHee');
              const items = await db1.collection('Products').find({}).toArray();
              console.log(items);
              res.render("products", { products : items });
              db.close();
          }
  );
});


router.get( "/about", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> About page ! </h1>");

});


router.get( "/login", 
    (req, res) => {

                res.writeHead(200);
                res.end("<h1> Login page ! </h1>");

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