const {Comment, TvShow } = require('../models/sequelize/relationships.js')


function getComments(req, res){

    Comment.findAll({
        where: { show_id: req.params.show_id },
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


async function getComment(req, res){
    try{
        let comment =  await Comment.findOne( {where: { id: req.params.comment_id } })
        res.json(comment);
    } catch(err){
        res.status(404).json({ 'error': 'Comment Not Found',})
    }

}


function addComment(req, res){

    // if( !validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    if( !req.body.text || !req.body.show_id || !req.body.user_id ) {
        res.status(500).json({ 'error': "Needs text, show id and user id" })
    }


    Comment.create({
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


async function updateComment(req, res){

    // if( validateRequest(req.body).isValid ) {
    //     res.status(400).json({ 'error': validateRequest(req.body).error, })
    // }

    try{
        let comment =  await Comment.findOne( {where: { id: req.params.comment_id } })

        await comment.update(req.body)
        await comment.save();

        res.status(200).json(comment)

    } catch (err) {
        res.json({"error": "Could not find", err})
    }

}


async function deleteComment(req, res){

    try {
        let comment =  await Comment.findOne( {where: { id: req.params.comment_id } })
        await comment.destroy()
        res.json({ "success": "Comment deleted" })
    } catch (err){
        res.json({ "error": "Could not find", err })
    }

}

module.exports = { getComments, getComment, addComment, updateComment, deleteComment }