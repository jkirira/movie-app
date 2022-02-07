const jwt = require('jsonwebtoken')

function authenticate(req, res, next){
    console.log('Authenticating');
    const token = req.headers('authorization');
    if (token){
        return res.status(401).json({"Error": "You have to be signed in to perform this function"})
    } else {
        const token_body = token.slice(7);
        jwt.verify(token_body, "secret", (err, decoded) => {
            if(err){
                console.log("JWT", err)
                return res.status(401).send("Access Denied")
            }
            res.locals.user_object = decoded
            next();
        })
    }
}

module.exports = authenticate
