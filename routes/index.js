var express = require('express');
var router = express.Router();
const CarModel = require('../models/Carmodel');
const GundamModel = require('../models/Gundammodel');
const UserModel = require('../models/Usermodel');


router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  var cars = await CarModel.find({ name: new RegExp(keyword, 'i') });
  var gundams = await GundamModel.find({ name: new RegExp(keyword, 'i') });
  res.render('index', { cars: cars, gundams: gundams });
  })

  
router.get('/index', async (req, res) =>{
  var cars = await CarModel.find();
  var gundams = await GundamModel.find();
  res.render('index',  {cars: cars, gundams: gundams});
});



router.get('/', (req, res) => {
    res.render('login')
})


router.post('/', async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    let data = await UserModel.findOne({ username: req.body.username, password: req.body.password });
    if (!data) {
      res.send("<script>alert('Username or Password wrong!!!!');history.back();</script>");
    } else {
      if (username === data.username && password === data.password ) {
        res.redirect('/index');
      } else {
        res.redirect('/');
      }
    }
  })


module.exports = router;
