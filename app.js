var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const csv = require('csv-parser');
const fs = require('fs');
var csvWriter = require('csv-write-stream')
var writer = csvWriter()

const path = "students.csv";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //help to avoid .ejs HTML page
app.use(express.static("public"));


app.get("/", function(req, res){
	res.render("index");
});

app.get("/addStudent", function(req, res){
	res.render("addStudent");
});

app.get("/searchStudent", function(req, res){
	res.render("searchStudent");
});

app.get("/viewStudent", function(req, res){
	console.log('Reading CSV file');
	fs.createReadStream(path)
  	.pipe(csv())
  	.on('data', (row) => { 
  		console.log(row);
  	})
  	.on('end', () => {
    	//console.log('CSV file successfully processed');
  	});
  	res.render("viewStudent");
});

app.post("/addNewStudent", function(req, res){
	var sid = req.body.sid;
	var sname = req.body.sname;
	console.log("\nData received from input: " + req.body.sid + " " + req.body.sname);

	var writer = csvWriter({sendHeaders: false})
	writer.pipe(fs.createWriteStream(path, {flags: 'a'}))
	writer.write({
		Student_Id: sid, 
		name: sname
	})
	writer.end()

	res.redirect("/");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server started!");
});