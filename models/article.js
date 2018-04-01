const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  url: { type: String, required: true },
  headline: { type: String, required: true },
  byline: String,
  date: { type: String, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
