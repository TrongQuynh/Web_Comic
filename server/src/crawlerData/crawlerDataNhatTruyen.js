const axios = require("axios");
const cheerio = require("cheerio");

const DOMAIN_NAME = "https://nhattruyenz.com";

/**
 * Crawl all img of chapter
 * https://nhattruyenz.com/truyen-tranh/nhap-hon-ma-dao-to-su/chapter-1
 */
async function crawlChapterComic(url) {
  try {
    const res = await axios(url);
    const html = res.data;
    const $ = cheerio.load(html);
    let comicImageList = [];
    /**
     * {
     *  server: "server-1"
     *  imgs: [
     *    {
     *      img: 1
     *      data-original:"https://nhattruyenz.com/images/truyencc-b.jpeg",
     *      data-src: "https://nhattruyenz.com/images/truyencc-b.jpeg"
     *    }
     *  ]
     * }
     */
    ["server-1", "server-2", "server-3"].forEach(function (value, index) {
      let serverData = {
        id: index,
        server: value,
        imgs: []
      }
      $(`#co-server > .${value} > img`).each(function (index, element) {
        serverData["imgs"].push({
          idImg: index,
          dataOriginal: $(this).attr("data-original")
        });
      });
      comicImageList.push(serverData);
    })
    console.log(comicImageList[0]);
  } catch (error) {
    console.log(error);
  }

}

/**
 * Crawle detail data of 1 comic
 * https://nhattruyenz.com/truyen-tranh/nhap-hon-ma-dao-to-su
 */
async function crawlComicDetail(url) {
  try {

    const res = await axios(url);
    const html = res.data;
    const $ = cheerio.load(html);

    let comicName = $(".bg-white").find(".text > h1").text();
    let comicStatus = "";
    let comicAuthor = "";
    let comicThumbnail = $(".bg-white").find(".img > img").attr("src");
    let commicStatistical = {};
    let comicCategories = [];//{href:"",categoryName:""}
    let comicDetailInfo = $(".bg-white").find(".story-detail-info").text().trim();
    let comicChapterList = []; // [{chapter:"", href:"", releaseTime:"", title:""}]

    // Crawler data for comicStatus and comicAuthor
    $(".bg-white").find(".txt > .info-item").each(function () {
      if (($(this).text()).includes("Tình trang")) {
        comicStatus = ($(this).text()).replaceAll("Tình trang:", "").trim();
      } else if (($(this).text()).includes("Tác giả:")) {
        comicAuthor = ($(this).text()).replaceAll("Tác giả:", "").trim();
      }
    });

    // Crawler data for commicStatistical
    $(".bg-white").find(".txt .sp01").each(function () {
      if (($(this).find("i").attr("class")).includes("fa-thumbs-up")) {
        commicStatistical["like"] = $(this).find("span").text();
      } else if (($(this).find("i").attr("class")).includes("fa-heart")) {
        commicStatistical["heart"] = $(this).find("span").text();
      } else if (($(this).find("i").attr("class")).includes("fa-eye")) {
        commicStatistical["eye"] = $(this).find("span").text();
      }
    });

    // Crawler data for comicCategories.
    $(".bg-white").find(".list-tag-story.list-orange > li > a").each(function () {
      comicCategories.push({
        href: $(this).attr("href"),
        categoryName: $(this).text()
      })
    });

    // Crawler data for comicChapterList
    $("#danh-sach-chuong .box-list .chapter-item").each(function () {
      let chapter = {};
      if (($(this).find("div").attr("class")).includes("text-right")) {
        chapter["releaseTime"] = $(this).find("div").text().trim();
      } else {
        chapter["chapter"] = $(this).find("a").text().trim();
        chapter["href"] = $(this).find("a").attr("href");
        chapter["title"] = $(this).find("a").attr("title");
      }
      comicChapterList.push(chapter);
    })

    console.log(comicChapterList);
  } catch (error) {
    console.log("ERRORS");
    console.log(error);
  }
}

async function crawlListComicInPage(page) {
  try {
    const url = `${DOMAIN_NAME}/truyen-moi-cap-nhat?page=${page}`;
    const res = await axios(url);
    const html = res.data;
    const $ = cheerio.load(html);

    let comics = [];

    $(".container .col-6.col-sm-3.col-md-3.col-lg-2").each(function(index, element){
      comics.push({
        id:index,
        name: $(this).find(".title-book > a").text().trim(),
        href: $(this).find(".title-book > a").attr("href")
      })
    })
      
    console.log(comics);
    return comics;
  } catch (error) {
    console.log(error);
  }
}

async function crawlComicCategories(){
  try {
    const url = DOMAIN_NAME;
    const res = await axios(url);
    const html = res.data;
    const $ = cheerio.load(html);

    let comicCategories = [];

    $("ul.navbar-nav > li.nav-item.dropdown .column > .mega-list > li").each(function(index, element){
      comicCategories.push($(this).find("a").text());
      console.log($(this).find("a").text());
    })

    return comicCategories;
  } catch (error) {
    console.log(error);
  }
}

async function test(){
  try {
    const url = "https://www.webcomicsapp.com/comic/Adore-Me-Exclusively/61934ce08c252b2cf46d1d07";
    const res = await axios(url);
    const html = res.data;
    const $ = cheerio.load(html);

    console.log($(".fs-28").text());

  } catch (error) {
    
  }
}

// ==================================================================================
// test();
// crawlComicDetail("https://nhattruyenz.com/truyen-tranh/nhap-hon-ma-dao-to-su")
// crawlChapterComic("https://nhattruyenz.com/truyen-tranh/nhap-hon-ma-dao-to-su/chapter-1");
// crawlListComicInPage(1);

module.exports = {crawlChapterComic,crawlComicDetail,crawlListComicInPage,crawlComicCategories}