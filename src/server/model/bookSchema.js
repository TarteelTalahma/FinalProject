const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: String,
    category: String,
    publisher: String,
    author: String,
    bookShopeID: Number
});

const Books = mongoose.model("Books", bookSchema);
module.exports = Books;