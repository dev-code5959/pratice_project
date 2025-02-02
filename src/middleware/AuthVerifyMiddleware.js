let jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{
    try {
        let token = req.headers["token-key"];

        if (!token) {
            return res.status(401).json({ status: "unauthorized", error: "Token missing" });
        }


        const decoded = jwt.verify(token, "key12345");

        // get username from decoded token add with request header
       let username = decoded['data']['UserName'];
       req.headers.username= username;


        next();
    } catch (err) {
        return res.status(401).json({ status: "unauthorized", error: "Invalid or expired token" });
    }
}