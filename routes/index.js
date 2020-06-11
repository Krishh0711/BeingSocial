const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('route is  running');

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//for any other roytes
//  router.user('/routerName,require('./routerFile'));


module.exports = router;