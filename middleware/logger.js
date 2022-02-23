const express = require('express')



exports.log = function (req,res,next){
    for (var key in req.body){
        if (key === "password") req.body.password = "SUPRESSED"
    }
    console.log(req.method, req.originalUrl, req.body)
    next()
}