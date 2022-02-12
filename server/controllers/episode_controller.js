const {TvShow, Subscription, Episode, User} = require('../models/sequelize/relationships.js')
const { sendNotification } = require('../config/mail.js')


function getEpisodes(req, res){

    Episode.findAll({
        include: [ TvShow ]
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}

function getShowEpisodes(req, res){

    Episode.findAll({
        where: { TvShowId : req.params.show_id },
        include: [ TvShow ],
        order: [
            ['createdAt', 'DESC']
        ]
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
        let episode =  await Episode.findOne( {
            where: { id: req.params.episode_id },
            include: [ TvShow ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.json(episode);
    } catch(err){
        res.status(404).json({ 'error': 'Episode Not Found',})
    }

}

async function getEpisodeByName(req, res){
    try{
        let episode =  await Episode.findAll( {
            where: { name: req.params.episode_name },
            include: [ TvShow ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.json(episode);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}

function addEpisode(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }
    if( !req.body.episode_name || !req.params.show_id ) {
        res.status(500).json({ 'error': "Needs episode_name and show id" })
    }

    let subscribers = []


    Episode.create({
        name: req.body.episode_name,
        description: req.body.description,
        release_date: req.body.release_date,
        runtime: req.body.runtime,
        TvShowId: req.params.show_id,
    })
        .then(() => {
            console.log({ message: "Record created successfully!", });
            Subscription.findAll( {
                where: { TvShowId: req.params.show_id },
                include: [ User ],
            }).then((response) => {
                if (response.length > 0) {
                    response.forEach((umodel)=> {
                        // console.log(umodel.user.email)
                        subscribers.push(umodel.user.email)
                    })
                }
            }).catch((err) => {
                console.log("Could not find tv Show associated with it.", err)
            })
        })
        .then(() => {
            if(subscribers.length > 0){
                subscribers.forEach((email) => { sendNotification(email) } );
                return res.json({ message: "Emails sent successfully!", });
            } else {
                console.log('No subscribers')
            }
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

module.exports = { getEpisodes, getShowEpisodes, getEpisodeById, getEpisodeByName, addEpisode, updateEpisode, deleteEpisode }