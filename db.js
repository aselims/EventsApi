var databaseURI = "localhost:27017/events-db";
var collections = ["users", "events"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;

// in the module
//var db = require("./db");
