const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminsSchema = new Schema({
email: { type: String, unique: true},
password: String
});

const admins = mongoose.model("admins", adminsSchema);
module.exports = admins;