 
var express = require("express");
var path = require("path");
var mongo = require("mongoose"); 
var bodyParser = require('body-parser'); 
var morgan = require("morgan");
var db = require("./config.js");

var app = express();
// var port = process.env.port || 5000;
app.set('port', (process.env.PORT || 5000));
var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));  
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));


var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var accountSchema = new Schema({    
    fullname: { type: String   },     
    username: { type: String   },   
    password : { type: String },     
    email: { type: String },     
},{ versionKey: false });
  
var lokerSchema = new Schema({    
    loker: { type: String   },     
    perusahaan: { type: String   },   
    divisi : { type: String },     
    jobdesc: { type: String },    
    kota: { type: String },     
},{ versionKey: false });
 
var model = mongoose.model('account', accountSchema, 'account');
var model2 = mongoose.model('loker', lokerSchema, 'loker');

// call Login page
app.get("/login",function(req,res){ 
    res.sendFile(srcpath +'/login.html');
})

// call Home page
app.get("/home",function(req,res){ 
    res.sendFile(srcpath +'/home.html');
})

// call Register page
app.get("/register",function(req,res){ 
    res.sendFile(srcpath +'/register.html');
})

// call Account page
app.get("/account",function(req,res){ 
    res.sendFile(srcpath +'/account.html');
})

// call Job List page
app.get("/joblist",function(req,res){ 
    res.sendFile(srcpath +'/joblist.html');
})

// call Logout
app.get("/logout",function(req,res){ 
    res.sendFile(srcpath +'/login.html');
})

//api for get data from database
app.get("/api/getdata",function(req,res){ 
 model.find({},function(err,data){
            if(err){
                res.send(err);
            }
            else{           
                res.send(data);
                }
        });
})

//api for get Job/Loker from database
app.get("/api/getjob",function(req,res){ 
 model2.find({},function(err,data){
            if(err){
                res.send(err);
            }
            else{           
                res.send(data);
                }
        });
})

//api for get data from database
app.post("/api/getLogin",function(req,res){  
	model.find( { $and: [ { username: req.body.username }, { password: req.body.password } ] },function(err,data){
		if(err){
			res.send(err);
		}
		else{         
			if(data.length === 0){
				res.send({data:"Data tidak ditemukan"}); 
			}else{
				res.send({data:"Sukses Login"}); 
			}
		}
	});
})


//api for Delete data from database
app.post("/api/Removedata",function(req,res){ 
 model.remove({ _id: req.body.id }, function(err) {
            if(err){
                res.send(err);
            }
            else{  
                   res.send({data:"Record has been Deleted..!!"});           
               }
        });
})


//api for Update data from database
app.post("/api/Updatedata",function(req,res){ 
 model.findByIdAndUpdate(req.body.id, { fullname:  req.body.fullname, username: req.body.username, password: req.body.password,email:req.body.email }, 
function(err) {
 if (err) {
 res.send(err);
 return;
 }
 res.send({data:"Record has been Updated..!!"});
 });
})  


//api for Insert data from database
app.post("/api/savedata",function(req,res){ 
     
    var mod = new model(req.body);
        mod.save(function(err,data){
            if(err){
                res.send(err);              
            }
            else{      
                 res.send({data:"Record has been Inserted..!!"});
            }
        });
})

//api for Delete Job/loker from database
app.post("/api/Removejob",function(req,res){ 
 model2.remove({ _id: req.body.id }, function(err) {
            if(err){
                res.send(err);
            }
            else{  
                   res.send({data:"Record has been Deleted..!!"});           
               }
        });
})


//api for Update Job/Loker from database
app.post("/api/Updatejob",function(req,res){  
 model2.findByIdAndUpdate(req.body.id, { loker: req.body.loker, perusahaan: req.body.perusahaan, divisi: req.body.divisi,jobdesc:req.body.jobdesc,kota:req.body.kota }, 
function(err) {
 if (err) {
 res.send(err);
 return;
 }
 res.send({data:"Record has been Updated..!!"});
 });
})  


//api for Insert Job/Loker from database
app.post("/api/savejob",function(req,res){  
    var mod2 = new model2(req.body);
        mod2.save(function(err,data){
            if(err){
                res.send(err);              
            }
            else{      
                 res.send({data:"Record has been Inserted..!!"});
            }
        });
})
    
// call by default index.html page
app.get("*",function(req,res){ 
    res.sendFile(srcpath +'/index.html');
})    

//server stat on given port
// app.listen(port,function(){ 
    // console.log("server start on port"+ port); 
// })  
.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});