const axios = require("axios");
const fs = require('fs'); 
const cheerio = require("cheerio");
const browserObject = require('./pupperteer/browser');
const pageCrawler = require('./pupperteer/pageScraper');

const DOMAIN_NAME = "https://www.webcomicsapp.com";

// =================================================================

// Return a list comic in this page
async function crawlComic(url) {
    try {
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        /**
           let listComicInPage = [
               {
                   id,
                   comicName,
                   href,
                   thumbnail,
                   slug,
                   comicGenres,
                   comicHotCount
               }
           ]
        */

        let listComicInPage = [];
        $("section.book-list > .list-item").each(function (index, element) {
            let comicHrefArr = ($(this).find("a").attr("href")).split("/");
            let comic = {
                id: comicHrefArr[comicHrefArr.length - 1],
                comicName: $(this).find(".item-info > h2.info-title").text().trim(),
                href: $(this).find("a").attr("href"),
                slug: comicHrefArr[2],
                thumbnail: $(this).find(".item-img > img").attr("src"),
                comicGenres: $(this).find(".item-info > p.info-desc").text().trim(),
                comicHotCount: $(this).find(".item-info > p.info_count").text().trim()
            }
            listComicInPage.push(comic);
        })

        return listComicInPage;
    } catch (error) {
        console.log("Error in crawlComic: " + error);
    }
}

async function crawlAllComic() {
    try {
        // Current total page is 118
        const totalPage = 2;
        const comicList = [];
        for (let page = 1; page <= totalPage; page++) {
            let url = `${DOMAIN_NAME}/genres/All/All/Popular/${page}`;
            let listComicInPage = await crawlComic(url);
            comicList.push(...listComicInPage);
        }
        console.log(comicList);
        return comicList;
    } catch (error) {
        console.log("Error in crawlAllComic: " + error);
    }
}

async function crawlComicDetailInfo({ slug, id }) {
    try {
        const url = `https://www.webcomicsapp.com/comic/${slug}/${id}`
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);

        /**
         * url = "https://www.webcomicsapp.com/comic/Magical-Forest/5f87e84f8c252b37983df706"
         *  {
         *    id:"", // comicID
         *    comicName,
         *    comicAuthor,
         *    thumbnail,
         *    blurThumbnail,
         *    comicGenres,
         *      updateDetail,
         *    statistical:{
         *      heart,
         *      eye,
         *      hot
         *     },
         *      slug,
         *     comicDescription,
         *    comicChapterList:[
         *      {
         *          id:"", // chapterID
         *          href,
         *          isLocked,
         *          chapterName,
         *          releaseTime,
         *          chapterThumbnail,
         *          amountCommentOfChapter
         *      }    
         *    ]
         * 
         *  } 
        */
        let comicChapterList = [];
        let totalChapters = 0;
        let updateDetail = $(".chapter-updateDetail").text();

        let browser = await browserObject.startBrowser();
        comicChapterList = await pageCrawler.crawlChapterList({ browser, slug, comicID: id });
        console.log("Puppeteer close browser");
        await browser.close();
        /*
        let text = ((($("h5.part-title.webp").text()).replaceAll(updateDetail, "")).trim()).split(" ");
        if (text[text.length - 2] === "Ch.") {
            totalChapters = Number(text[text.length - 1])
        }
        for (let chapter = 1; chapter <= totalChapters; chapter++) {

            let chap = {
                id: chapter + 100,
                chapterName: `Chapter. ${chapter}`,
                releaseTime: (randomDate(new Date(2012, 0, 1), new Date())).toLocaleString(),
                amountCommentOfChapter: getRandomNumber(0, 555),
                chapterThumbnail: $(".book-info").find("img.pc-book-img").attr("data-original"),
            }
            comicChapterList.push(chap)
        }
        */
        let comic = {
            id: id,
            comicAuthor: $(".book-info .info p.author > span").text().trim(),
            comicName: $(".book-info").find(".fs-28").text().trim(),
            thumbnail: $(".book-info").find("img.pc-book-img").attr("data-original"),
            blurThumbnail: $(".comic-main > .pc-render-bg > img").attr("data-original"),
            comicGenres: [],
            updateDetail: updateDetail.trim(),
            statistical: {
                heart: "",
                eyes: "",
                hot: "",
            },
            slug,
            comicDescription: $(".book-info").find(".perjury").text().trim(),
            comicChapterList
        }

        $(".book-info .info a.label-tag").each(function () {
            comic["comicGenres"].push($(this).text().trim());
        })

        $(".book-info .counts-icon").each(function () {
            let icon = $(this).find("i").attr("class");
            if (icon.includes("icon-hot")) {
                comic["statistical"].hot = $(this).text().trim()
            } else if (icon.includes("icon-like")) {
                comic["statistical"].heart = $(this).text().trim()
            }
        })
        // console.log(comic);
        return comic;

    } catch (error) {
        console.log(error);
    }
}

async function crawlComicDetailInfoAllComic(comicList){
    try {

        comicList = comicList ? comicList : await crawlAllComic();
        let comicDetailList = [];
        for(let comic of comicList ){
            comicDetailList.push(await crawlComicDetailInfo(comic));
        }
        return comicDetailList;
    } catch (error) {
        console.log("Error in crawlComicDetailInfo: " + error);
    }
}

async function crawlComicInRanking() {
    try {
        const url = `${DOMAIN_NAME}/sub/rankingList?source=1&module_type=1&source_id=0&sid=71&index=0&sortType=0`;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        /**
           let listComicInPage = [
               {
                   id,
                   top,
                   comicName,
                   href,
                   thumbnail,
                   slug,
                   comicGenres,
                   comicDescription
               }
           ]
        */

        let comics = [];
        $("ul.infinite-list > .infinite-list-item").each(function (index, element) {
            let comicHrefArr = ($(this).find("a").attr("href")).split("/");
            let comic = {
                id: comicHrefArr[comicHrefArr.length - 1],
                top:$(this).find(".img-box > .rank-tag").text().trim(),
                comicName: $(this).find(".book-title").text().trim(),
                href: $(this).find("a").attr("href"),
                slug: comicHrefArr[2],
                thumbnail: $(this).find(".img-box > img").attr("src"),
                comicGenres: $(this).find(".book-info > p.img-text__tag > span").text().trim(),
                comicDescription: $(this).find(".book-info > p.list-book-desc").text().trim()
            }
            comics.push(comic);
        })
        return comics;
    } catch (error) {
        console.log("Error in crawlComicInRanking: " + error);
    }
}

async function crawlComicInSearch(search) {
    try {
        const url = `${DOMAIN_NAME}/search/${search}`;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        /**
           let listComicInPage = [
               {
                   id,
                   comicName,
                   href,
                   thumbnail,
                   slug,
                   comicGenres,
                   comicDescription
               }
           ]
        */

        let comics = [];
        $(".list-item").each(function (index, element) {
            let comicHrefArr = ($(this).find("a").attr("href")).split("/");
            let comic = {
                id: comicHrefArr[comicHrefArr.length - 1],
                comicName: $(this).find("h2.info-title").text().trim(),
                href: $(this).find("a").attr("href"),
                slug: comicHrefArr[2],
                thumbnail: $(this).find(".item-img > img").attr("src"),
                comicGenres: $(this).find("p.category-tag > span").text().trim(),
                comicDescription: $(this).find(".item-info > p.info-desc").text().trim()
            }
            comics.push(comic);
        })
        return comics;
    } catch (error) {
        console.log("Error in crawlComicInRanking: " + error);
    }
}


// =================================================================

async function crawlComicGenreList() {
    try {
        const url = `${DOMAIN_NAME}/genres/All/All/Popular`;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let genresList = [];
        $("ul.j-category > li").each(function (index, genre) {
            genresList.push($(this).find("a").text().trim());
        })
        return genresList;
    } catch (error) {
        console.log("Error in crawlComicGenreList: " + error);
    }
}

// Crawl all comic in Daily Section
async function crawlDailyPicksComic() {
    try {
        const url = DOMAIN_NAME;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let comicList = [];
        /**
            let comicImageList = [
                {
                    comicName,
                    href,
                    thumbnail
                }
            ]
         */
        $(".plate-common").each(function () {
            if ($(this).find(".plate-title").text().trim().includes("Daily Picks")) {
                $(this).find("ul li").each(function (index, element) {
                    let comic = {
                        id: index + 1,
                        comicName: $(this).find(".book-name").text().trim(),
                        href: $(this).find(".data-gtag").attr("href"),
                        thumbnail: $(this).find(".book-img > img").attr("data-original")
                    }
                    // console.log(comic);
                    comicList.push(comic);
                })
            }
        })
        return comicList;
    } catch (error) {
        console.log(error);
    }

}

// Crawl all comic in Ranking Seccion
async function crawlPopularityRankingComic() {
    try {
        const url = DOMAIN_NAME;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let comicList = [];
        /**
            let comicImageList = [
                {
                    comicName,
                    href,
                    thumbnail
                }
            ]
         */
        $(".plate-common").each(function () {
            if ($(this).find(".plate-title").text().trim().includes("Popularity Ranking")) {
                $(this).find("ul li").each(function (index, element) {
                    let comic = {
                        id: index + 1,
                        comicName: $(this).find(".book-name").text().trim(),
                        href: $(this).find(".data-gtag").attr("href"),
                        thumbnail: $(this).find(".book-img > img").attr("data-original")
                    }
                    // console.log(comic);
                    comicList.push(comic);
                })
            }
        })
        return comicList;
    } catch (error) {
        console.log(error);
    }

}


// Crawl all comic in Recommend Section
async function crawlComicRecommend() {
    try {
        const url = DOMAIN_NAME;
        const res = await axios("https://www.webcomicsapp.com/comic/Adore-Me-Exclusively/61934ce08c252b2cf46d1d07");
        const html = res.data;
        const $ = cheerio.load(html);
        let comicList = [];
        /**
            let comicImageList = [
                {
                    id,
                    comicName,
                    href,
                    slug,
                    thumbnail,
                    comicTag,
                    comicHotCount
                }
            ]
         */

        $(".comic-main .pure-g .p-relative").each(function (index, element) {
            let comicHrefArr = ($(this).find("a.render-data-gtag").attr("href")).split("/");
            // [ '', 'comic', 'Adore-Me-Exclusively', '61934ce08c252b2cf46d1d07' ]
            let comic = {
                id: comicHrefArr[comicHrefArr.length-1],
                thumbnail: $(this).find(".img-box > img").attr("src"),
                comicName: $(this).find(".ti-h5").text().trim(),
                comicGenres: $(this).find(".book-tag > span").text().trim(),
                comicHotCount: $(this).find(".hot-count").text().trim(),
                slug:comicHrefArr[2]
            }
            comicList.push(comic);
        })
        return comicList;
    } catch (error) {
        console.log(error);
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



// Crawl all img of 1 chapter of 1 comic
async function crawlComicView(url) {
    try {
        const urlChapter = `https://www.webcomicsapp.com${url}`;
        let browser = await browserObject.startBrowser();
        let comicImages = await pageCrawler.crawlChapterImage(browser, urlChapter);
        console.log("Puppeteer close browser");
        await browser.close();
        return comicImages;
    } catch (error) {
        console.log("Error in crawlComicView: " + error);
        return null;
    }
}

async function crawlAllChpaterViewOfcomic(comic){
    try {
        let result = {
            comicID: comic.id,
            chapterList:[]
        }
        console.log(`================ START CRAWL COMIC ${comic.comicName}================`);
        for(let chapter of comic.comicChapterList){
            if(chapter.isLocked){
                continue;
            }
            console.log(`================ START CRAWL COMIC ${comic.comicName} - Chapter ${chapter.id} ================`);
            let imageList = await crawlComicView(chapter.href);
            result["chapterList"].push({
                chapterID: chapter.id,
                imageList
            })
        }
        console.log(`================ COMPLETE CRAWL COMIC ${comic.comicName}================`);
        return result;
    } catch (error) {
        console.log("Error in crawlAllChpaterViewOfcomic: " + error);
    }
}

// Crawl Page

async function crawlHomePage() {
    try {
        const url = DOMAIN_NAME;
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);
        let comicList = [];
        /**
            let comicImageList = [
                {
                    id,
                    comicName,
                    href,
                    thumbnail,
                    comicGenres,
                    slug
                }
            ]
         */

        [
            "Daily Picks",
            "Popularity Ranking",
            "New Release",
            "Free Comics",
            "Trending Originals",
            "Yaoi Comic",
            "Infinite Attack",
            "Girl's Power",
            "Rule in Multiverse",
            "Specially For You"
        ].forEach((value, index) => {
            let subList = {
                type: value,
                comicList: []
            }

            $(".plate-common").each(function () {
                if ($(this).find(".plate-title").text().trim().includes(value)) {
                    $(this).find("ul li").each(function (index, element) {
                        let comicHref = ($(this).find(".data-gtag").attr("href")).split("/");
                        // [ '', 'comic', 'Adore-Me-Exclusively', '61934ce08c252b2cf46d1d07' ]
                        let comic = {
                            id: comicHref[comicHref.length - 1],
                            comicName: $(this).find(".book-name").text().trim(),
                            href: $(this).find(".data-gtag").attr("href"),
                            slug: comicHref[2],
                            thumbnail: $(this).find(".book-img > img").attr("data-original"),
                            comicGenres: $(this).find(".book-desc").text().trim()
                        }
                        // console.log(comic);
                        subList.comicList.push(comic);
                    })
                }

            })
            comicList.push(subList);
        })
        return comicList;
    } catch (error) {
        console.log(error);
    }
}

// Crawl comic in Gerens page
async function crawlGenresPage({category,filter,sortBy,page}){
    try {
        const url = `${DOMAIN_NAME}/genres/${category}/${filter}/${sortBy}/${page}`;
        const comicList = await crawlComic(url);
        return comicList;
    } catch (error) {
        console.log("Erroe in crawlGenresPage: " + error);
    }
}

// ============================= SAVE File =============================
async function saveData(fileName,data){
    try {
        // await fs.writeFileSync(`../data/${fileName}.json`, JSON.stringify(data));
        fs.writeFile(`./src/data/${fileName}.json`, JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            console.log(`Save ${fileName}.json Success`);
        });
        
    } catch (error) {
        console.log("Error In saveData: " + error);
    }
}

// ============================= START =============================
// crawlComicDetailInfo("https://www.webcomicsapp.com/comic/Adore-Me-Exclusively/61934ce08c252b2cf46d1d07");
// crawlComicDetailInfoAllComic();
// crawlComicGenreList();

async function run(){
    try {
        // let dataHomePage = await crawlHomePage();
        // let dataByCollection = [];
        // let dataComic = [];
        
        // for(let typeComic of dataHomePage){
        //     dataByCollection.push(typeComic);
        //     for(let comic of typeComic.comicList){
        //         dataComic.push(comic);
        //     }
        // }
        // await saveData("Comic_HomePage",result);

        // let dataComicDetail = await crawlComicDetailInfoAllComic(dataComic);
        // await saveData("ComicDetail_HomePage",dataComicDetail);

        const data = fs.readFileSync(`./src/data/ComicDetail_HomePage.json`);
        let dataFileComicDetail = JSON.parse(data);

        let resultComicView = [];
        for(let comic of dataFileComicDetail){
           
                resultComicView.push(await crawlAllChpaterViewOfcomic(comic));
            
            
        }
        await saveData("ComicView_HomePage", resultComicView);
    } catch (error) {
        console.log("Error in run: " + error);
    }
}

// run();

module.exports = {
    crawlHomePage,
    crawlDailyPicksComic,
    crawlPopularityRankingComic,
    crawlComicRecommend,
    crawlComicDetailInfo,
    crawlComicView,
    crawlGenresPage,
    crawlComicGenreList,
    crawlComicInRanking,crawlComicInSearch
};