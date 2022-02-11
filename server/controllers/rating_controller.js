const models = require('../models/sequelize/relationships.js')
const { Op } = require("sequelize");


async function getMovieRating(req, res){
    try{
        let rats =  await models.Rating.findAll( {where: { TvShowId: req.params.show_id } })
        if(rats.length > 0){
            let total = 0
            rats.forEach((rat) => {
                total += rat.amount;
            })
            return res.json( (total/rats.length).toFixed(1) );
        }
        return res.json(0)

    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}


async function getRating(req, res){
    try{
        let rat =  await models.Rating.findAll( {where: { id: req.params.rating_id } })
        res.json(rat);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function getUserRating(req, res){
    if( !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id, user id and amount" })
    }

    try{
        let rat =  await models.Rating.findOne( {
            where: { UserId: req.body.user_id }
        })
        res.json(rat)
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}

async function addRating(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id || !req.body.amount ) {
        res.status(500).json({ 'error': "Needs show id, user id and amount" })
    }

    let rat = ''
    try {
        rat = await models.Rating.findOne({
            where: {
                TvShowId: req.body.show_id,
                userId: req.body.user_id,
            }
        })
        if (rat){
            await rat.update(req.body)
            await rat.save();
            return res.json({ message: "Rating Changed", });
        }
    } catch(err) {
        console.log("new Rating", err)
    }

    try{
        await models.Rating.create({
            amount: req.body.amount,
            TvShowId: req.body.show_id,
            userId: req.body.user_id,
        })

        return res.json({ message: "Added to Ratings", });

    } catch(err) {
        res.json({ "error": "There was an error", err })
    }

}

async function updateRating(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let rat =  await models.Rating.findOne( {where: { id: req.params.rating_id } })

        await rat.update(req.body)
        await rat.save();

        res.status(200).json(rat)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


async function deleteRating(req, res){

    try {
        let rat =  await models.Rating.findOne( {where: { id: req.params.rating_id } })
        await rat.destroy()
        res.json({ "success": "Removed from favourites" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getMovieRating, getUserRating, getRating, addRating, updateRating, deleteRating }