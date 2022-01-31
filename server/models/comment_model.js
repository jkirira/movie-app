const { v3: uuidv3 } = require('uuid');

function Comment(movie_id, comment_text, user_id){
    this.id = uuidv3(),
        this.movie_id = movie_id,
        this.text = comment_text,
        this.user = user_id
}

module.exports = Comment
