const express = require("express");
const path = require("path");
const app = express();
require("dotenv/config");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("DB Connected!!");
})

//ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/event", (req, res) => {
  res.render("event");
});

app.get("/union_members", (req, res) => {
  res.render("union_members");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/student_id", (req, res) => {
  res.render("student_id");
});

app.get("/gcelt", (req, res) => {
  res.render("gcelt");
});

app.get("/rc-gcelt", (req, res) => {
  res.render("rc-gcelt");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/signup", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    stream: req.body.stream,
    passing_year: req.body.passing_year,
    password: req.body.password,
    message: req.body.message,
  });

  try {
    const newStudent = await student.save();
    console.log(newStudent);
    res.send(newStudent);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("runnnnninnngggg");
});