const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance){
    let browser;
    try{
        
        let slug = "CEO-Above-Me-Below";
        let comicID = "5ce66ebd62661d387f504a32";
        let idChapter = "1";
        let urlComicView = `https://www.webcomicsapp.com/view/${slug}/${idChapter}/${comicID}`;
        let urlChapterList = `https://www.webcomicsapp.com/comic/${slug}/${comicID}`
        browser = await browserInstance;
        // let chapterList = await pageScraper.crawlChapterList({browser,slug,idComic });
        // let chpaterImgs = await pageScraper.crawlChapterImage(browser, urlComicView);
        let isHaveAChapter = await pageScraper.isHaveNextChapter({browser,slug,comicID, chapter:8 });
        console.log(isHaveAChapter);
        await browser.close();
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)