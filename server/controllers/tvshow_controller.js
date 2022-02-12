const models = require('../models/sequelize/relationships.js')
const { Op } = require("sequelize");
const path = require("path");


function getMovies(req, res){

    models.TvShow.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then((result) => {
            console.log(result)
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}


function getMovieById(req, res){
    // console.log(req.params.movie_id)
    console.log('finding', req.params.movie_id)

    models.TvShow.findOne( {
            where: { id: req.params.movie_id },
            include: [ models.Episode, models.Comment, models.Rating, models.Review, models.Actor ],
        })
        .then((result) => {
            console.log("in controller")
            console.log(result)
            res.json(result);
        }).catch((err) => {
            res.status(404).json({ 'error': 'Movie Not Found', err})
        })

}

async function getLatestMovies(req, res){
    try{
        let movie =  await models.TvShow.findAll(
    {
                limit: 20,
                order: [
                    ['createdAt', 'DESC']
                ]
            },
        )
        res.json(movie);
    } catch(err){
        res.status(404).json({ 'error': 'Movie Not Found',})
    }

}

async function getRandomMovies(req, res){
    try{
        let movie =  await models.TvShow.findAll({ limit: 20, } )
        res.json(movie);
    } catch(err){
        res.status(404).json({ 'error': 'Movie Not Found',})
    }

}

async function getMovieByName(req, res){
    try{
        let movie =  await models.TvShow.findAll( {
            where: {
                name: {
                    [Op.like]: '%'+ req.params.movie_name+'%'
                }
            },
        })
        res.json(movie);
    } catch(err){
        res.json({ "error": "Could not find movie", err })
    }
}

function addMovie(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.name ) {
        res.status(500).json({ 'error': "Needs at least a name" })
    }

    console.log(req.files)

    let image_upload = ''
    if(req.files){
        image_upload = (req.files.poster) ? req.files.poster : '';
    }
    let slug = Date.now() + '_' + image_upload.name;
    let save_path = "server/public/" + slug;
    let img_url = "http://localhost:4000/images/" + slug;

    models.TvShow.create({
        name: req.body.name,
        release_date: req.body.release_date,
        genre: req.body.genre,
        trailer_link: req.body.trailer_link,
        description: req.body.description,
        poster: (image_upload) ? img_url : '../assets/img/default-poster.png',
    })
        .then((result) => {
            if(image_upload) {
                image_upload.mv(save_path, (err) => {
                    if (err) { return res.status(500).send(err); }
                });
            }
            return res.json({ message: "Record created successfully!" });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: "Unable to create a record!" });
        });
}

async function updateMovie(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let movie =  await models.TvShow.findOne( {where: { id: req.params.movie_id } })

        await movie.update(req.body)
        await movie.save();

        res.status(200).json(movie)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


 async function deleteMovie(req, res){

    try {
        let movie =  await models.TvShow.findOne( {where: { id: req.params.movie_id } })
        await movie.destroy()
        res.json({ "success": "Movie deleted" })
    } catch (err){
        res.json({ "error": "Could not find", err })
    }

}

module.exports = { getMovies, getMovieById, getLatestMovies, getRandomMovies, getMovieByName, addMovie, updateMovie, deleteMovie }