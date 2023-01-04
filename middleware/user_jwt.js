const { response, request } = require('express');
const jwt = require('jsonwebtoken');

module.exports = async function(req,res,next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'no token, Authorization Denied'
        });
    }

    try {
        await jwt.verify(token,process.env.jwtUserSecret, (err,decoded) => {
            if (err) {
                response.status(401).json({
                    msg: 'Token not valid'
                });
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } catch (error) {
        console.log('middleware'+error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}