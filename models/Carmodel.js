var mongoose = require('mongoose');
var CarSchema = mongoose.Schema({
    name : [String],
    dom: Date,
    brand: String,
    price: Number,
    image: String,
    detail: String,
    seller: String,
    
});

var CarModel = mongoose.model('car', CarSchema, 'car');
module.exports = CarModel;