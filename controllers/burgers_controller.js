var burger = require("../models/burger.js");
var express = require("express");
var router = express.Router();

//add burger to database
router.post("/", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    res.json({
      id: result.insertId 
    });
  });
});

//update burger info
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  console.log("condition: " , condition);
  
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if(result.changedRows == 0) {
      return res.status(404).end();
    }else {
      res.status(200).end();
    }
  });
});

module.exports = router;