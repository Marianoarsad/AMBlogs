import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
var postArray = [];
var postDB = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/blogs", (req, res) => {

    if (postDB.length === 0) {
        res.render("blogs.ejs")
    }   else {
        res.render("blogs.ejs", {
            postDB: postDB,
        })
    }

});

app.post("/submit", (req, res) => {

    postArray = [req.body["fname"] + req.body["lname"], req.body["title"], req.body["content"]];
    postDB.push(postArray);

    res.render("./blogs.ejs", {
        postDB: postDB
    });

    numberOfPosts++;
});

app.put("/update", (req, res) => {
    res.console.log('you want to update')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


