var express             = require('express');
var router              = express.Router();
let indexController     = require('../controllers/indexController');
//let productsController  = require('../controllers/productsController');


/* GET home page. */
router.get('/', indexController.get);

// POST de productos
//router.post('/products', productsController.post);


module.exports = router;
