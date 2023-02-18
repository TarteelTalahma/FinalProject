const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
firstName: String,
lastName: String,
email: { type: String, unique: true},
password: String,
recommendation: [{name:"", count:""}]
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;