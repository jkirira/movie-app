const { Actor, TvShow, ActorTvShows } = require('../models/sequelize/relationships.js')
const sequelize =  require("../config/database.js");


function getActors(req, res){

    Actor.findAll({
        include: TvShow
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}

function getShowActors(req, res){

    ActorTvShows.findAll({
        where: { TvShowId : req.params.show_id },
        include: TvShow
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}



async function getActor(req, res){
    try{
        let actor =  await Actor.findOne( {
            where: { id: req.params.actor_id },
            include: TvShow
        })
        res.json(actor);
    } catch(err){
        res.status(404).json({ 'error': 'Actor Not Found',})
    }
}


function addActor(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs show id and user id" })
    }

    Actor.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_id: req.body.user_id,
        show_id: req.body.show_id,
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


async function updateActor(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let actor =  await Actor.findOne( {where: { id: req.params.actor_id } })

        await actor.update(req.body)
        await actor.save();

        res.status(200).json(actor)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


async function deleteActor(req, res){

    try {
        let actor =  await Actor.findOne( {where: { id: req.params.actor_id } })
        await actor.destroy()
        res.json({ "success": "Actor deleted" })
    } catch (err){
        res.json({ "error": "Could not find", err })
    }

}

module.exports = { getActors, getActor, addActor, updateActor, deleteActor }