require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Student = require("./model/studentModel");
const app = express();
const port = process.env.PORT || 5000;



//use all requirements for app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))


//database connect

mongoose.connect(process.env.LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("student database connect");
}).catch((err) => {
    console.log(err);
});







//route work
app.get("/", async(req, res) => {

    const data = await Student.find();
    res.render("home", { studentData: data })
})


app.get("/new-student", (req, res) => {
    res.render("insert")
})


app.post("/", (req, res) => {
    const name = req.body.fullname;
    const email = req.body.email;
    const studentID = req.body.studentID;
    Student.create({ name, email, studentID });

    res.redirect("/")


})



app.listen(port, () => {
    console.log("server run at " + port);
});