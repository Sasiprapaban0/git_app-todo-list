var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TodoSchema = new Schema({
    description:{
        type: String,
        require: true
    } ,
    done: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type:Date,
        default: Date.now
    }
});

mongoose.model('Todo',TodoSchema);