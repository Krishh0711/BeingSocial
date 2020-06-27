const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('route is  running');

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//for any other roytes
//  router.user('/routerName,require('./routerFile'));

//for api routes
router.use('/api',require('./api'));


module.exports = router;