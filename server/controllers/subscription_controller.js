const models = require('../models/sequelize/relationships.js')
const Op = require('sequelize')


function getSubscriptions(req, res){

    models.Subscription.findAll({include: models.TvShow})
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res.json({ message: 'Unable to fetch records!'});
        });
}


async function getShowSubscriptions(req, res){
    try{
        let subs =  await models.Subscription.findAll( {
            where: { show_id: req.params.show_id },
            include: [models.TvShow, models.User]
        })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function getUserSubscriptions(req, res){
    // console.log(req)
    try{
        let subs =  await models.Subscription.findAll( { where: { user_id: req.params.user_id } })
        res.json(subs);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}


async function getSubscriptionById(req, res){
    try{
        let subs =  await models.Subscription.findAll( {where: { id: req.params.sub_id } })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function addSubscription(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id and user id" })
    }

    try {
        let fav = await models.Subscription.findOne( {
            where: {
                [Op.and]: [
                    {show_id: req.body.show_id},
                    {user_id: req.body.user_id},
                ]
            }
        })

        if (fav){ res.status(500).json({message: "Entry already exists"}) }

        await models.Subscription.create({
            show_id: req.body.show_id,
            showId: req.body.show_id,
            user_id: req.body.user_id,
            userId: req.body.user_id
        })

        return res.json({ message: "Added to Subscriptions", });

    } catch(err) {
        res.json({ "error": "There was an error", err })
    }

}


async function removeSubscription(req, res){

    try {
        let subs =  await models.Subscription.findOne( {
            where: {
                [Op.and]: [
                    { show_id: req.params.show_id },
                    { user_id: req.params.user_id }
                ]
            }
        })
        await subs.destroy()
        res.json({ "success": "Unsubscribed" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

async function deleteSubscription(req, res){

    try {
        let subs =  await models.Subscription.findOne( {where: { id: req.params.sub_id } })
        await subs.destroy()
        res.json({ "success": "Subscription Deleted" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getShowSubscriptions, getSubscriptionById, getSubscriptions, getUserSubscriptions, addSubscription, removeSubscription, deleteSubscription }