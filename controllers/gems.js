var Gem = require('../models/gems')

//List of all Gems
exports.gem_list = async function(req, res) {
    try {
        let theGems = await Gem.find();
        res.send(theGems);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error:" ${err}}`)
    }
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

//VIEWS 
//Handle a show all view
exports.gem_view_all_page = async function(req, res) {
    try {
        theGems = await Gem.find();
        res.render('gems', {title: 'Gem Search Results', results: theGems})
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`)
    }
}