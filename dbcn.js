const mongo = require("mongodb").MongoClient;

const url = "mongodb+srv://teeheeadmin:01011994@cluster0.bjskh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";




mongo.connect(url, { useNewUrlParser: true ,  
    useUnifiedTopology: true },
    async (err, db) => {
        if (err) {
            console.log("\n ERR: ", err);
            process.exit(0);
        }
        console.log("\n Connected !");
        const db1 = db.db('TeeHee');
        // execute find query
        var pro1 = {ProID: 'P3', ProName: 'Class Uniform 1', Price: 170000, isshow: true, numofpro: 14, imglink: "imgs/"};
        var pro2 = {ProID: 'P4', ProName: 'Class Uniform 2', Price: 170000, isshow: true, numofpro: 14, imglink: "imgs/"};
        db1.collection('Products').insertMany([pro1, pro2], async (err, result) => {
          if (err) console.log(err)
          else console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        })
        const items = await db1.collection('Products').find({}).toArray();
        console.log(items);
        db.close();
    }
);