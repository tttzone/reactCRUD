<<<<<<< HEAD
var mongo = require("mongoose");
var db = mongo.connect("mongodb://localhost:27017/account", function(err, response){
   if(err){ console.log('Failed to connect to ' + db); }
   else{ console.log('Connected to ' + db, ' + ', response); }
});

module.exports =db;

// reactcrud is database name
// 192.168.1.71:27017 is your mongo server name
=======
var mongo = require("mongoose");
var db = mongo.connect("mongodb://localhost:27017/account", function(err, response){
   if(err){ console.log('Failed to connect to ' + db); }
   else{ console.log('Connected to ' + db, ' + ', response); }
});

module.exports =db;

// reactcrud is database name
// 192.168.1.71:27017 is your mongo server name
>>>>>>> 1a262d336f1690c675653a5f7436e239e7510850
