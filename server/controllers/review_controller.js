const models = require('../models/sequelize/relationships.js')
const { Op } = require("sequelize");


function getReviews(req, res){

    models.Review.findAll({
        where: { show_id: req.params.show_id }
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}


async function getReview(req, res){
    try{
        let review =  await models.Review.findOne( {where: { id: req.params.review_id } })
        res.json(review);
    } catch(err){
        res.status(404).json({ 'error': 'Review Not Found',})
    }

}


function addReview(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.text || !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs text, show id and user id" })
    }



    models.Review.create({
        text: req.body.text,
        user_id: req.params.user_id,
        show_id: req.params.show_id,
    })
        .then((result) => {
            return res.json({
                message: "Record created successfully!",
            });
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                message: "Unable to create a record!",
            });
        });
}


async function updateReview(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let review =  await models.Review.findOne( {where: { id: req.params.review_id } })

        await review.update(req.body)
        await review.save();

        res.status(200).json(review)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


async function deleteReview(req, res){

    try {
        let review =  await models.Review.findOne( {where: { id: req.params.review_id } })
        await review.destroy()
        res.json({ "success": "Review deleted" })
    } catch (err){
        res.json({ "error": "Could not find", err })
    }

}

module.exports = { getReviews, getReview, addReview, updateReview, deleteReview }