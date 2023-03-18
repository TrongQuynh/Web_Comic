const axios = require("axios");
const cheerio = require("cheerio");

const DOMAIN_NAME = "https://www.emulatorgames.net";

async function crawlROMsGame() {
    try {
        const url = "https://www.emulatorgames.net/roms/";
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let ROMs = [];
        $(".site-wrapper > ul.site-list.site-list-posts > li").each(function(){
            let ROM = {
                romName: $(this).find(".site-box-title").text().trim(),
                thumbnail: $(this).find("source").attr("srcset"),
                href: $(this).find("a").attr("href")
            }
            ROMs.push(ROM);
        })

        console.log(ROMs);
    } catch (error) {
        console.log(error);
    }
}

async function crawlGameTag(){
    try {
        const url = "https://www.emulatorgames.net/tags/";
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let gameTagList = [];
        $("ul.site-list-grp > li").each(function(index, element){
            let gameTag = {
                id: index,
                gameTag: $(this).find("a.rpl").text().trim(),
                href: $(this).find("a.rpl").attr("href")
            }
            gameTagList.push(gameTag);
        })

        console.log(gameTagList);
    } catch (error) {
        console.log(error);
    }
}

async function crawlGameCartByPage(gameType,page, startIndex){
    try {
        const url = page == 1 ?
        `https://www.emulatorgames.net/roms/${gameType} `: `https://www.emulatorgames.net/roms/${gameType}/${page}`;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let gameList = []
        $("ul.site-list > li").each(function(index, element){
            startIndex = startIndex + 1
            let game = {
                id: startIndex,
                gameName: $(this).find(".site-box-title").text().trim(),
                thumbnail:$(this).find("source").attr("srcset"),
                href: $(this).find("a.site-box.rpl").attr("href")
            }
            gameList.push(game);
        })

        // console.log(gameList);
        return gameList
    } catch (error) {
        console.log(error);
    }
}

async function crawlAllGameCart(gameType){
    try {
        const url = `https://www.emulatorgames.net/roms/${gameType}`;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);

        let totalPage = 1

        $(".pagination.m-0.mx-3.pb-4 > li").each(function(index, element){
            if(($(this).find("a").text().trim()).includes("...")){
                totalPage = ($(this).find("a").attr("href")).replaceAll(url,"").replaceAll("/","");
            }
        })

        let gameList = {
            gameType: $(".site-wrapper").find("h1.h3.text-center").text().trim(),
            games:[]
        }

        for(let page=1;page <=totalPage;page++){
            gameList["games"].push(...(await crawlGameCartByPage(gameType,page, gameList["games"].length)));
        }
        console.log(gameList);
    } catch (error) {
        console.log(error);
    }
}

async function crawlGameDetail(url){
    try {
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let rate = $(".site-rating-value").text().trim();
        let ratingCount = $(".site-rating-count").text().trim();
        let description = $(".site-wrapper-outer .site-info.site-info-sub.mb-3 > p").text().trim()
        console.log({rate, ratingCount, description});
        return {rate, ratingCount, description};
    } catch (error) {
        console.log(error);
    }
}

// Crawl Page

async function crawlHomePage() {
    try {
        const url = DOMAIN_NAME;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let postList = [];
        $(".site-article.mx-3.mb-4").each(function(){
            let post = {
                postName: $(this).find("a").text().trim(),
                thumbnail: $(this).find(".site-article-img img").attr("src"),
                postDescript: $(this).find(".site-article-snippet").text().trim()
            }
            postList.push(post);
        })

        let sidebarItems = [];
        $(".site-sidebar > .site-list-group > a").each(function(index, element){
            let item = {
                id: index,
                href: $(this).attr("href"),
                itemName: $(this).text().trim(),
            }
            sidebarItems.push(item);
        })

        console.log(postList);
    } catch (error) {
        console.log(error);
    }
}


// ============================= START =============================
// crawlComicDetailInfo("https://www.webcomicsapp.com/comic/Adore-Me-Exclusively/61934ce08c252b2cf46d1d07")
crawlGameDetail("https://www.emulatorgames.net/roms/playstation-portable/kamen-rider-super-climax-heroes/");
module.exports = {
    crawlHomePage
};