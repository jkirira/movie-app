const models = require('../models/sequelize/relationships.js')
const { adminSendNotification } = require('../config/mail.js')
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
            where: { TvShowId: req.params.show_id },
            include: [models.TvShow, models.User]
        })
        res.json(subs);
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function adminMail(req, res){
    try{

        if(!req.body.subscribers){
            return res.json({message: "did not receive any subscribers"})
        }

        if(!req.body.email_text){
            return res.json({message: "did not receive email body"})
        }

        let subscribers = req.body.subscribers
        let emailText = req.body.email_text

        // return res.json(subscribers)
        if(subscribers.length > 0){
            subscribers.forEach((email) => { adminSendNotification(email, emailText) } );
            return res.json({ message: "Emails sent successfully!", });
        } else {
            console.log('An error occurred')
            return res.json({ message: "An error occurred when sending emails!", });
        }
    } catch(err){
        res.status(404).json({ 'error': "An error occurred", err})
    }
}

async function getUserSubscriptions(req, res){
    // console.log(req)
    try{
        let subs =  await models.Subscription.findAll( {
            where: { userId: req.params.user_id },
            include: [models.User, models.TvShow]
        })
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

    let sub = ''
    try {
        sub = await models.Subscription.findOne({
            where: {
                TvShowId: req.body.show_id,
                userId: req.body.user_id,
            }
        })
        if (sub){ res.status(500).json({message: "Entry already exists"}) }
    } catch(err) {
        console.log("new subscription", err)
    }

    try{
        await models.Subscription.create({
            TvShowId: req.body.show_id,
            userId: req.body.user_id
        })
        return res.status(200).json({ message: "Added to Subscriptions", });
    } catch(err) {
        res.status(500).json({ "error": "There was an error", err })
    }

}


async function removeSubscription(req, res){

    try {
        let subs =  await models.Subscription.findOne( {
            where: {
                TvShowId: req.params.show_id,
                userId: req.params.user_id
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

module.exports = { getShowSubscriptions, getSubscriptionById, getSubscriptions, getUserSubscriptions, adminMail, addSubscription, removeSubscription, deleteSubscription }