var express = require('express');
const gem_controllers = require('../controllers/gems')
var router = express.Router();

/* GET home page. */
router.get('/', gem_controllers.gem_view_all_page);

// GET detail gem page 
router.get('/detail', gem_controllers.gem_view_one_Page);

// GET create gem page 
router.get('/create', gem_controllers.gem_create_Page);

// GET create update page 
router.get('/update', gem_controllers.gem_update_Page);

// GET delete gem page
router.get('/delete', gem_controllers.gem_delete_Page);

module.exports = router;
