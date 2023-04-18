const { readFileSync } = require('fs');
const express = require('express');
const router = express.Router();

const {
    crawlDailyPicksComic,
    crawlHomePage,
    crawlComicRecommend,
    crawlComicDetailInfo,
    crawlComicView,
    crawlComicGenreList,
    crawlGenresPage,
    crawlComicInRanking,
    crawlComicInSearch} = require("../crawlerData/crawlerDataWebComic");

router.get("/comic-daily-picks", async function(req,res){
    return res.json(await crawlDailyPicksComic());
})

router.get("/comic-home-page", async function(req,res){
    const data = require('../../src/data/Comic_HomePage.json');
    let comicList = data;
    // let comicList = await crawlHomePage(); JSON.parse(data)
    return res.json(comicList);
})

router.get("/comic-recommend-for-you", async function(req,res){
    return res.json(await crawlComicRecommend());
})

router.post("/comic-detail-info", async function(req,res){
    const {slug,id} = req.body;
    let comicDetails = require('../../src/data/ComicDetail_HomePage.json');
    let result = comicDetails.find(function(comic){
        return comic.id === id
    })

    if(!result){
        // If in Db not exsit this comic
        result = await crawlComicDetailInfo({slug,id});
    }
    
    return res.json(result);
})

router.post("/comic-chapter-view", async function(req,res){
    try {
        const { slug, chapterID, comicID } = req.body;
    const url = `/view/${slug}/${chapterID}/${comicID}`
    // const data = readFileSync(`./src/data/ComicView_HomePage.json`);
    // let comicViews = JSON.parse(data)
    // let comic = (comicViews.find((comic)=> comic.comicID === comicID));
    // let chapter = comic 
    //             ? comic.chapterList.find((chapter)=> chapter.chapterID === Number(chapterID))
    //             : null;
    // let result = chapter ? chapter.imageList : await crawlComicView(url);
    let result = await crawlComicView(url);
    return res.json(result);
    } catch (error) {
        console.log("Error in router '/comic-chapter-view': " + error);
        return null;
    }
})

router.get("/comic-genres/:category/:filter/:sortBy/:page", async function(req,res){
    try {
        const {category,filter,sortBy,page} = req.params;
        return res.json(await crawlGenresPage({category,filter,sortBy,page}));
    } catch (error) {
        console.log("Error in [/comic-genres] " + error);
    }
})

router.get("/comic-genres-list", async function(req,res){
    try {
        return res.json(await crawlComicGenreList());
    } catch (error) {
        console.log("Error in [/comic-genres-list] " + error);
    }
})

router.get("/comic-in-ranking", async function(req,res){
    try {
        return res.json(await crawlComicInRanking());
    } catch (error) {
        console.log("Error in [/comic-in-ranking] " + error);
    }
})

router.get("/comic-search/:search", async function(req,res){
    try {
        const {search} = req.params;
        console.log(search);
        return res.json(await crawlComicInSearch(search));
    } catch (error) {
        console.log("Error in [/comic-in-ranking] " + error);
    }
})

router.get("/comic-chapter-exist/:slug/:comicID", async function(req,res){
    try {
        const {slug,comicID} = req.params;
        console.log({slug,comicID});
        let result = await crawlComicDetailInfo({ slug, id:comicID });
        console.log(result.comicChapterList);
        let chapter = result.comicChapterList.find((chapter)=> chapter.isLocked)
        console.log({totalChapter:chapter.id});
        
        return res.json({totalChapter:chapter.id});
    } catch (error) {
        console.log("Error in [/comic-in-ranking] " + error);
    }
})



module.exports = router;