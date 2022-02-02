const MovieModel = require('../models/sequelize/MovieModel.js')


function getMovies(req, res){

    MovieModel.findAll()
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Unable to fetch records!'});
        });
}


async function getMovieById(req, res){
    try{
        let movie =  await MovieModel.findOne( {where: { id: req.body.movie_id } })
        res.json(movie);
    } catch(err){
        res.status(404).json({ 'error': 'Movie Not Found',})
    }

}

async function getMovieByName(req, res){
    try{
        let movie =  await MovieModel.findOne( {where: { name: req.body.movie_name } })
        res.json(movie);
    } catch(err){
        res.json({ "error": "There was an error", err })
    }
}

function addMovie(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    MovieModel.create({
        name: req.body.movie_name,
        type:req.body.movie_type,
        release_date: req.body.release_date,
        runtime: req.body.runtime,
        trailer_link: req.body.trailer_link,
        description: req.body.description,
        poster: req.body.poster,
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

async function updateMovie(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let movie =  await MovieModel.findOne( {where: { id: req.params.movie_id } })

        await movie.update(req.body)
        await movie.save();

        res.status(200).json(movie)

    } catch (err) {
        res.json({"error": "There was an error", err})
    }

}


 async function deleteMovie(req, res){

    try {
        let movie =  await MovieModel.findOne( {where: { id: req.params.movie_id } })
        await movie.destroy()
        res.json({ "success": "Movie deleted" })
    } catch (err){
        res.json({ "error": "There was an error", err })
    }

}

module.exports = { getMovies, getMovieById, getMovieByName, addMovie, updateMovie, deleteMovie }