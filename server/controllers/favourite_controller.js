const FavouriteModel = require('../models/sequelize/FavouriteModel.js')


async function getFavourites(req, res){
    try{
        let subs =  await FavouriteModel.findAll( {where: { user_id: req.params.user_id } })
        res.json(subs);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}


async function getFavouriteById(req, res){
    try{
        let subs =  await FavouriteModel.findAll( {where: { id: req.params.fav_id } })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

function addToFavourites(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id and user id" })
    }

    FavouriteModel.create({
        show_id: req.body.show_id,
        user_id: req.body.user_id,
    })
        .then((result) => {
            return res.json({ message: "Added to Favourites", });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: "Unable to create a record!", error });
        });
}


async function removeFromFavourites(req, res){

    try {
        let subs =  await FavouriteModel.findOne( {where: { id: req.params.show_id } })
        await subs.destroy()
        res.json({ "success": "Removed from favourites" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

async function deleteFavourite(req, res){

    try {
        let subs =  await FavouriteModel.findOne( {where: { id: req.params.fav_id } })
        await subs.destroy()
        res.json({ "success": "Favourite Deleted" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getFavourites, getFavouriteById, addToFavourites, removeFromFavourites, deleteFavourite }