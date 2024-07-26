import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});