var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = "D:/Documents/Study material/LTI/lbj_webStudy2/public/students.csv";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //help to avoid .ejs HTML page
app.use(express.static("public"));

const csvWriter = createCsvWriter({
  path: 'D:/Documents/Study material/LTI/lbj_webStudy2/public/students.csv',
  header: [
    {id: 'sid', title: 'Student Id'},
    {id: 'sname', title: 'Name'},
  ]
});



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
	res.render("viewStudent");

	console.log('Reading CSV file');
	fs.createReadStream(path)
  	.pipe(csv())
  	.on('data', (row) => { 
  		console.log(row);})
  	.on('end', () => {
    	//console.log('CSV file successfully processed');
  	});

});

app.post("/addNewStudent", function(req, res){
	var sid = req.body.sid;
	var sname = req.body.sname;
	console.log("\nData received from input: " + req.body.sid + " " + req.body.sname);

 	const data = [{sid: sid, sname: sname}]; //can add multiple values with help of object
 	csvWriter
  	.writeRecords(data)
  	.then(()=> console.log('\nThe CSV file was written successfully\n'));

	res.redirect("/");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server started!");
});