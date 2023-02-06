const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookshopSchema = new Schema({
    bookShopeID: Number,
    bookShopeName: String,
    address: String,
    phoneNumber: String,
    email: String,
    password: String
});

const BookShops = mongoose.model("BookShops", bookshopSchema);
module.exports = BookShops;