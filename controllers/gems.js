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
exports.gem_details = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        result = await Gem.findById(req.params.id);
        res.send(result);
    }
    catch(error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`)
    }
};

//Handle Gem create on POST
exports.gem_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Gem();
    document.name = req.body.name;
    document.color = req.body.color;
    document.hardness = req.body.hardness;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`)
    }
};

//Handle Gem delete form on DELETE
exports.gem_delete = async function(req, res) {
    console.log("delete " + req.params.id);
    try {
        result = await Gem.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

//Handle Gem update form on PUT
exports.gem_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Gem.findById(req.params.id);
        //Do updates of properties
        if(req.body.name) {
            toUpdate.name = req.body.name;
        }

        if(req.body.color) {
            toUpdate.color = req.body.color;
        }

        if(req.body.hardness) {
            toUpdate.hardness = req.body.hardness;
        }

        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }

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

//Handle a show one view with id specified by query
exports.gem_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Gem.findById(req.query.id);
        res.render('gemdetail', {title: 'Gem Detail', toShow: result});
    } catch (err) {
        res.status(500);
        res.send(`{'error: ${err}'}`);
    }
}

//Handle building the view for creating a gem
exports.gem_create_Page = function(req, res) {
    console.log("create view");
    try {
        res.render('gemcreate', {title: 'Gem Create'})
    } catch(err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

//Handle building the view for updating a gem
exports.gem_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Gem.findById(req.query.id);
        res.render('gemupdate', {title: 'Gem Update', toShow: result});
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

//Handle a delete one view with id from query
exports.gem_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id);
    try {
        result = await Gem.findById(req.query.id);
        res.render('gemdelete', {title: 'Gem Delete', toShow: result});
    } catch(err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}