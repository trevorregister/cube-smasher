const express = require('express')



exports.log = function (req,res,next){
    console.log(req.method, req.originalUrl, req.body)
    next()
}