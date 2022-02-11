const models = require('../models/sequelize/relationships.js')
const { Op } = require("sequelize");


async function getFavourites(req, res){
    try{
        let favs =  await models.Favourite.findAll( {
            where: { userId: req.params.user_id },
            include: models.TvShow
        })
        res.json(favs);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}


async function getFavourite(req, res){
    try{
        let favs =  await models.Favourite.findAll( {where: { id: req.params.fav_id } })
        res.json(favs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function addToFavourites(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id and user id" })
    }

    let fave = ''
    try {
        fave = await models.Favourite.findOne({
            where: {
                TvShowId: req.body.show_id,
                userId: req.body.user_id,
            }
        })
        if (fave){ return res.status(500).json({message: "Entry already exists"}) }
    } catch(err) {
        console.log("new Favourite", err)
    }

    try{
        await models.Favourite.create({
            TvShowId: req.body.show_id,
            userId: req.body.user_id
        })
        return res.status(200).json({ message: "Added to favourites", });
    } catch(err) {
        return res.status(500).json({ "error": "There was an error", err })
    }
}


async function removeFromFavourites(req, res){

    try {
        let favs =  await models.Favourite.findOne( {
            where: {
                TvShowId: req.params.show_id,
                userId: req.params.user_id
            }
        })
        await favs.destroy()
        res.json({ "success": "Removed from favourites" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }
}

async function deleteFavourite(req, res){

    try {
        let favs =  await models.Favourite.findOne( {where: { id: req.params.fav_id } })
        await favs.destroy()
        res.json({ "success": "Favourite Deleted" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getFavourites, getFavourite, addToFavourites, removeFromFavourites, deleteFavourite }