const { lock } = require("../../routers/ntRouter");

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


class PageScraper {
    crawlChapterList({ browser, slug, comicID }) {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `https://www.webcomicsapp.com/comic/${slug}/${comicID}`
                let page = await browser.newPage();
                console.log(`Navigating to ${url}...`);
                await page.goto(url);
                await page.waitForSelector('.chapter-list-pc > .pure-g.el-row .chapter-item-cover');

                console.log("Class load success");
                let chapters = await page.$$eval(".chapter-list-pc .p-relative", function (chapterList) {
                    chapterList = chapterList.map((el, index) => {
                        // el.querySelector(".chapter-item-cover > img").getAttribute("data-original")
                        return {
                            id: index + 1,
                            href: "",
                            isLocked: el.querySelector(".chapter-item-cover > i") ? true : false,
                            chapterName: el.querySelector(".chapter-item-info > h5").textContent.trim(),
                            releaseTime: el.querySelector(".chapter-item-info span.chapter-time").textContent.trim(),
                            amountCommentOfChapter: el.querySelector(".chapter-item-info > p > span:last-child").textContent.trim(),
                            chapterThumbnail: el.querySelector(".chapter-item-cover > img").getAttribute("data-original"),
                        }
                    })
                    return chapterList;
                })

                chapters = chapters.map((chapter) => {
                    chapter.href = `/view/${slug}/${chapter.id}/${comicID}`;
                    return chapter;
                })


                // console.log(chapters);
                console.log("Crawl Chapter List Success");
                // await page.close();
                resolve(chapters);
            } catch (error) {
                console.log("Crawl Chapter List Error " + error);
                reject();
            }
        })
    }
    crawlChapterImage(browser, url) {
        return new Promise(async (resolve, reject) => {
            try {
                let page = await browser.newPage();
                console.log(`Navigating to ${url}...`);
                await page.goto(url);
                await page.waitForSelector('.read-container img.el-image__inner');
                await autoScroll(page);

                console.log("Class load success");
                let imgList = await page.$$eval(".read-box", async function (i) {
                    return i.map((el) => el.querySelector(".el-image__inner") ? el.querySelector(".el-image__inner").getAttribute("src") : "OK")
                })

                // console.log(imgList);
                console.log("Crawl image list success");
                resolve(imgList);
            } catch (error) {
                console.log("Crawl chapter Image Error " + error);
                reject();
            }
        })
    }

    isHaveNextChapter({ browser, slug, comicID, chapter }) {
        return new Promise(async (resolve, reject) => {
            try {
                let chapters = await this.crawlChapterList({browser, slug, comicID});
                chapters = chapters.find((chap,i)=>{
                    return chap.isLocked
                })
                console.log(chapters);
                resolve(chapters);
            } catch (error) {
                console.log("Error: " + error);
                reject(false);
            }
        })
    }
}

module.exports = new PageScraper();

/*

*/