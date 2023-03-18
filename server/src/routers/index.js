
const nhatTruyen_Router = require("../routers/ntRouter");
const webComics_Router = require("../routers/webComicRouter");

function Router(app) {

    app.use("/api/vi", nhatTruyen_Router);

    app.use("/api/en", webComics_Router);

    app.get("/", function (req, res) {
        return res.send("Hello");
    })
}

module.exports = Router