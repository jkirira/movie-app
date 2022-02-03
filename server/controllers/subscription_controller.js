const SubscriptionModel = require('../models/sequelize/SubscriptionModel.js')


function getSubscriptions(req, res){

    SubscriptionModel.findAll()
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
        let subs =  await SubscriptionModel.findAll( {where: { show_id: req.params.show_id } })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function getUserSubscriptions(req, res){
    try{
        let subs =  await SubscriptionModel.findAll( {where: { user_id: req.params.user_id } })
        res.json(subs);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}


async function getSubscriptionById(req, res){
    try{
        let subs =  await SubscriptionModel.findAll( {where: { id: req.params.sub_id } })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

function addSubscription(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id and user id" })
    }

    SubscriptionModel.create({
        show_id: req.body.show_id,
        user_id: req.body.user_id,
    })
        .then((result) => {
            return res.json({ message: "Subscription created successfully!", });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: "Unable to create a record!", error });
        });
}


async function unsubscribe(req, res){

    try {
        let subs =  await SubscriptionModel.findOne( {where: { id: req.params.show_id } })
        await subs.destroy()
        res.json({ "success": "Unsubscribed" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

async function deleteSubscription(req, res){

    try {
        let subs =  await SubscriptionModel.findOne( {where: { id: req.params.sub_id } })
        await subs.destroy()
        res.json({ "success": "Subscription Deleted" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getShowSubscriptions, getSubscriptionById, getSubscriptions, getUserSubscriptions, addSubscription, unsubscribe, deleteSubscription }