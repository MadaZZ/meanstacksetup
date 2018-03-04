var express = require('express'); 
var router = express.Router();
//var port= process.env.PORT || '3000';
var mongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;

//Connection to db
const connection = (closure)=>{
    return mongoClient.connect('mongodb://localhost:27017/meansetupdb',(err, db)=>{
        if(err){
            return console.log(err);
        }
        closure(db);
    });
}
// Response Handeling
let response ={
    status : 200,
    data : [],
    message : null
}
// Error handler
var sendError = (err,res) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    res.status(501).json(response);
}

//getting data
router.get('/students',(req,res)=>{
    connection((db)=>{
        db.collection('students').find().toArray().then((students)=>{
            response.data=students;
            //response.message=`The database is rendered without error on port-${port}`;
            res.json(response);
        })
        .catch((err)=>{
            sendError(err,res);
        });
    });
});

module.exports = router;
