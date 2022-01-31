const { v3: uuidv3 } = require('uuid');

function Rating(movie_id, rating_value, user_id){
    this.id = uuidv3(),
    this.movie_id = movie_id,
    this.value = rating_value,
    this.user = user_id
}

module.exports = Rating
