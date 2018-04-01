const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Articles collection and inserts the articles below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist"
);

db.Article
  .remove({})
  .then( process.exit(0) )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
