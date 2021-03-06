var mongoose = require("mongoose")
var Schema = mongoose.Schema;


var users = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    online: {type: Boolean, default: false},
    facebookID : String,
    avatar: String,
    notifications:[],
    read_notification:{type: Boolean, default: false},
    unreaded_count:{type: Number, default: 0},
    access_token: String,
    following: [{type: Schema.ObjectId, ref: "users"}],
    blocking: [{type: Schema.ObjectId, ref: "users"}],
});

users.index({name: 'text'});

mongoose.model("users", users);
