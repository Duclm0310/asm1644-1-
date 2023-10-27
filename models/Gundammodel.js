var mongoose = require('mongoose');
var GundamSchema = mongoose.Schema({
    name : [String],
    dom: Date,
    brand: String,
    price: Number,
    image: String,
    detail: String
});

var GundamModel = mongoose.model('gundam', GundamSchema, 'gundam');
module.exports = GundamModel;