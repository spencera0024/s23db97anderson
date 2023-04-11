var express = require('express');
const gem_controllers = require('../controllers/gems')
var router = express.Router();

/* GET home page. */
router.get('/', gem_controllers.gem_view_all_page);

module.exports = router;
