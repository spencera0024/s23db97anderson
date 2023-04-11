var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var gem_controller = require('../controllers/gems');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// GEM ROUTES ///
// POST request for creating a Gem.
router.post('/gems', gem_controller.gem_create_post);

// DELETE request to delete Gem.
router.delete('/gems/:id', gem_controller.gem_delete);

// PUT request to update Gem.
router.put('/gems/:id', gem_controller.gem_update_put);

// GET request for one Gem.
router.get('/gems/:id', gem_controller.gem_details);

// GET request for list of all Gem items.
router.get('/gems', gem_controller.gem_list);

module.exports = router;