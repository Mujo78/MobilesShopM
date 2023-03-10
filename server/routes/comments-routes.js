const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const {Comments} = require("../models");
const { createComment } = require("../validators/COMMENT.JS");

router.get("/comments", async(req, res) => {
    const allComments = await Comments.findAll();

    return res.json(allComments);
})

router.get("/comments/:id", async(req, res) => {
    const id = req.params.id;

    const allWithRequestedId = await Comments.findOne({where: {id: id}})
    if(allWithRequestedId == null){
        return res.status(401).json("Ne postoji komentar!");
    }else{
        return res.status(200).json(allWithRequestedId);
    }
})  

router.post("/post-comment",createComment, async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).json(errors);
        }else{
            const body = req.body;
            const newComment = await Comments.create(body);
    
            res.status(200).json(newComment);
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

module.exports = router;