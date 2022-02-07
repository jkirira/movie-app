const models = require('../models/sequelize/relationships.js')
const { Op } = require("sequelize");


async function getRatings(req, res){
    try{
        let rats =  await models.Rating.findAll( {where: { show_id: req.params.show_id } })
        res.json(rats);
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

async function addRating(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id || !req.body.amount ) {
        res.status(500).json({ 'error': "Needs show id, user id and amount" })
    }

    try {
        let fav = await models.Rating.findOne( {
            where: {
                [Op.and]: [
                    {show_id: req.body.show_id},
                    {user_id: req.body.user_id},
                ]
            }
        })

        if (fav){ res.status(500).json({message: "Entry already exists"}) }

        await models.Rating.create({
            amount: req.body.amount,
            show_id: req.body.show_id,
            user_id: req.body.user_id,
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

module.exports = { getRatings, getRating, addRating, updateRating, deleteRating }