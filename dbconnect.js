var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017';

// Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     //HURRAY!! We are connected. :)
//     console.log('Connection established to', url);

//     // do some work here with the database.

//     //Close connection
//     db.close();
//   }
// });
MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    var db = client.db('TeeHee');
    // Get the documents collection
    var collection = db.collection('Products');
    var pro1 = {ProID: 'P3', ProName: 'Class Uniform 1', Price: 170000, isshow: true, numofpro: 14, imglink: "imgs/"};
    var pro2 = {ProID: 'P4', ProName: 'Class Uniform 2', Price: 170000, isshow: true, numofpro: 14, imglink: "imgs/"};
    collection.insertMany([pro1, pro2], async (err, result) => {
      if (err) console.log(err)
      else console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
    })
    // Insert some users
    collection.find().toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
        // result.forEach(element => {
        //   console.log(element['ProName']);
        // });
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      client.close();
    });
  }
});
