var express = require('express');
var router = express.Router();
const CarModel = require('../models/Carmodel');

router.get('/', async (req, res) => {

    var cars = await CarModel.find();
    res.render('cars/index', {cars: cars});
})

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var car = await CarModel.findById(id);
    res.render('cars/detail', {car: car});
})

router.get('/delete/:id', async (req, res) => {
var id = req.params.id;
await CarModel.findByIdAndDelete(id);
console.log('Delete Car sc');
res.redirect('/cars/list');
});

router.get('/add',  (req, res) => {
res.render('cars/add');
})

router.post('/add', async (req, res) => {
var car = req.body;
await CarModel.create(car);
console.log('Add Success!');
res.redirect('/cars/list');
});

router.get('/edit/:id', async (req, res) => {
var id = req.params.id;
var car = await CarModel.findById(id);
res.render('cars/edit', {car: car})
});

router.get('/edit/:id', async (req, res) => {
var id = req.params.id;
var car = req.body;
await CarModel.findByIdAndUpdate(id, car);
console.log('Edit Success!');
res.redirect('/Cars')
})


router.get('/list', async (req, res) =>{
    var cars = await CarModel.find();
    res.render('cars/list', {cars: cars});
})


router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var cars = await CarModel.find({name: new RegExp (keyword, 'i')});
    res.render('cars/list', {cars: cars});
})

router.post('/searchi', async (req, res) => {
    var keyword = req.body.name;
    var cars = await CarModel.find({ name: new RegExp(keyword, 'i') });
    res.render('index', { cars: cars});
  });


router.get('/nameasc', async (req, res) => {
    var cars = await CarModel.find().sort({name: 1})
    res.render('cars/list', {cars: cars});

})

router.get('/namedesc', async (req, res) => {
    var cars = await CarModel.find().sort({name: -1})
    res.render('cars/list', {cars: cars});

})


module.exports = router;
