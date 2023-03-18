
const {crawlChapterComic,crawlComicDetail,crawlListComicInPage,crawlComicCategories} = require("../crawlerData/crawlerDataNhatTruyen");

const express = require('express');
const router = express.Router();
router.get("/comic-list",async function(req,res){
    let page = req.query.page ? req.query.page : 1;
    return res.json(await crawlListComicInPage(Number(page)));
})

router.get("/comic/:name/:chapter",async function(req,res){
    const comicName = req.params.name;
    const comicChapter = req.params.chapter;
    return res.json({ComicName: req.params.name, comicChapter});
})

router.get("/comic/:name",async function(req,res){
    const comicName = req.params.name;
    return res.json({ComicName: req.params.name});
})

router.get("/comic-categories",async function(req,res){
    const comicCategories = "all";
    return res.json({comicCategories});
})

router.get("/comic-categories/:type",async function(req,res){
    const comicCategories = req.params.type ? req.params.type : "all";
    return res.json({comicCategories});
})

router.get("/comic-categories-list",async function(req,res){
    return res.json(await crawlComicCategories());
})

router.get("/search",function(req,res){
    const searchTxt = req.query.q ? req.query.q : "Error";
    return res.json(searchTxt);
})
module.exports = router;