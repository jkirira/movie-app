const { v2: uuidv2 } = require('uuid');

function Movie(name, image_name, trailer_link, actors){
    this.id = uuidv2(),
    this.name = name,
    this.image = image_name,
    this.trailer = trailer_link ? trailer: null,
    this.actors = actors ? actors : null,
    this.rating = null
    // this.slug = name
}

module.exports = Movie