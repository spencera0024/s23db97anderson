var Gem = require('../models/gems')

//List of all Gems
exports.gem_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Gem list');
};

//for a specific Gem
exports.gem_details = function(req, res) {
    res.send('NOT IMPLEMENTED: Gem detail: ' + req.params.id);
};

//Handle Gem create on POST
exports.gem_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Gem create POST');
};

//Handle Gem delete form on DELETE
exports.gem_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Gem delete DELETE' + req.params.id);
};

//Handle Gem update form on PUT
exports.gem_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Gem update PUT' + req.params.id);
};

