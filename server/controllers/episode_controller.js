const {Subscription, Episode, User} = require('../models/sequelize/relationships.js')
const { getShowSubscriptions } = require ('./subscription_controller'.js)
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d7328e61c5c745",
        pass: "cc2b377e911ead"
    }
});


function sendMail(user_object, show_name ){

    var mailOptions = {
        from: '"TvShow App" <tvshowapp@example.com>',
        to: user_object.email,
        subject: 'New Episode',
        text: 'Hey there, '+ user_object.name + ' ! ' + show_name + ' Has a new Episode ! ',
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


function getEpisodes(req, res){

    Episode.findAll({
        where: {show_id: req.params.show_id},
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}


async function getEpisodeById(req, res){
    try{
        let episode =  await Episode.findOne( {where: { id: req.params.episode_id } })
        res.json(episode);
    } catch(err){
        res.status(404).json({ 'error': 'Episode Not Found',})
    }

}

async function getEpisodeByName(req, res){
    try{
        let episode =  await Episode.findOne( {where: { name: req.params.episode_name } })
        res.json(episode);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}

function addEpisode(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }
    if( !req.body.name || !req.body.show_id ) {
        res.status(500).json({ 'error': "Needs name and show id" })
    }

    Episode.create({
        name: req.body.name,
        description: req.body.description,
        release_date: req.body.release_date,
        runtime: req.body.runtime,
        show_id: req.body.show_id,
    })
        .then((result) => {
            let episode_subscriptions = Subscription.findAll({
                            where: { show_id: req.body.show_id },
                            include: User
                        })
            let subscriber_emails = []
            episode_subscriptions.forEach((sub) => {
                subscriber_emails.push(sub.user.email)
            })
            subscriber_emails.forEach((email) => {
                sendMail(email, req.body.name);
            })
            return res.json({ message: "Record created successfully!", });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: "Unable to create a record!", });
        });
}

async function updateEpisode(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let episode =  await Episode.findOne( {where: { id: req.params.episode_id } })

        await episode.update(req.body)
        await episode.save();

        res.status(200).json(episode)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


async function deleteEpisode(req, res){

    try {
        let episode =  await Episode.findOne( {where: { id: req.params.episode_id } })
        await episode.destroy()
        res.json({ "success": "Episode deleted" })
    } catch (err){
        res.json({ "error": "Could not find", err })
    }

}

module.exports = { getEpisodes, getEpisodeById, getEpisodeByName, addEpisode, updateEpisode, deleteEpisode }