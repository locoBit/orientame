var express             = require('express');
var router              = express.Router();
let indexController     = require('../controllers/indexController');
let materiasController     = require('../controllers/materiasController');
//let productsController  = require('../controllers/productsController');


/* GET home page. */
router.get('/api', indexController.get);

// POST de productos
//router.post('/products', productsController.post);


// Materias API
router.get('/api/materias/:att/:val', materiasController.get);
router.get('/api/materias', materiasController.get);


module.exports = router;
