var express = require('express');
var router = express.Router();
const GundamModel = require('../models/Gundammodel');


router.get('/', async (req, res) => {

    var gundams = await GundamModel.find();
    res.render('gundams/index', {gundams: gundams});
})

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var gundam = await GundamModel.findById(id);
    res.render('gundams/detail', {gundam: gundam});
}) 

router.get('/delete/:id', async (req, res) => {
var id = req.params.id;
await GundamModel.findByIdAndDelete(id);
console.log('Delete gundam sc');
res.redirect('/gundams/list');
});

router.get('/add',  (req, res) => {
res.render('gundams/add');
})

router.post('/add', async (req, res) => {
var gundam = req.body;
await GundamModel.create(gundam);
console.log('Add Success!');
res.redirect('/gundams/list');
});

router.get('/edit/:id', async (req, res) => {
var id = req.params.id;
var gundam = await GundamModel.findById(id);
res.render('gundams/edit', {gundam: gundam})
});

router.get('/edit/:id', async (req, res) => {
var id = req.params.id;
var gundam = req.body;
await GundamModel.findByIdAndUpdate(id, gundam);
console.log('Edit Success!');
res.redirect('/gundams')
})


router.get('/list', async (req, res) =>{
    var gundams = await GundamModel.find();
    res.render('gundams/list', {gundams: gundams});
})


router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var gundams = await GundamModel.find({name: new RegExp (keyword, 'i')});
    res.render('gundams/list', {gundams: gundams});
})


router.post('/searchi', async (req, res) => {
    var keyword = req.body.name;
    var gundams = await GundamModel.find({ name: new RegExp(keyword, 'i') });
    res.render('index', {  gundams: gundams });
  });



router.get('/nameasc', async (req, res) => {
    var gundams = await GundamModel.find().sort({name: 1})
    res.render('gundams/list', {gundams: gundams});

})

router.get('/namedesc', async (req, res) => {
    var gundams = await GundamModel.find().sort({name: -1})
    res.render('gundams/list', {gundams: gundams});

})


module.exports = router;
