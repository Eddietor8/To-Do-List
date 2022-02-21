const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Start your day"];
let workItems = [];
let goalItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("List", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {


console.log(req.body);

  let item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }

  if (req.body.list === "Goals"){
    goalItems.push(item);
    res.redirect("/goals");
  }else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/goals", function(req, res) {
    res.render("list", {listTitle: "Goals List", newListItems: goalItems});
});
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");

});

// app.post("/work", function(req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// })

app.listen(3001, function() {
  console.log("Server started on port 3001");
});
