const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader)
    if (!authHeader){
        req.isAuth = false;
        return next();
    }
    const token =authHeader.split(" ")[1];
    console.log(token)
    if(!token || token === ""){
        req.isAuth = false;
        return next;
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        
    } catch (error) {
        req.isAuth =false;
        return next();
    }
    if (!decodedToken){
        req.isAuth =false;
        return next();
    }
    req.isAuth = true;
    req.UserId = decodedToken.userId;
    return next();
}