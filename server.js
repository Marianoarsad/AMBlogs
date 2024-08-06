import bodyParser from "body-parser";
import express from "express";
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//GET homepage
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//GET Tingin sa vlogs
app.get("/blogs", async (req, res) => {

    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("blogs.ejs", { postDB: response.data });
    } catch (error) {
        res.json({ message: error });
    }

});

//route para sa form
app.get("/create", (req, res) => {
    res.render("form.ejs");
});


//POST Request na mag post ng blog
app.post("/api/create", async (req, res) => {

    try {
        let response = await axios.post(`${API_URL}/posts`, req.body);
        res.redirect("/");

    } catch (error) {
        res.json({ message: "Failed to make request:" + error.response.data });
    }

});

//UPDATE

// taga salo ng form
app.get("/update/:id", async (req, res) => {
    try {
        const post = await axios.get(`${API_URL}/posts/${req.params.id}`);
        res.render("form.ejs", { post: post.data });
    } catch (error) {
        res.json({ message: "Failed to make request: " + error.response.data })
    }
});

//PATCH REQUEST Update ng blog
app.post("/api/update/:id", async (req, res) => {
    const id = req.body.id;
    
    try {
        const response = await axios.patch(`${API_URL}/posts/${id}`, req.body);
        console.log(response.data);

        res.redirect("/blogs");

    } catch (error) {
        res.json({ message: "Failed to make request: " + error.response.data });
    }

});

//DELETE Delete ng blog
app.get("/delete/:id", async (req, res) => {
    
    try {
        const respose = await axios.delete(`${API_URL}/posts/${parseInt(req.params.id)}`);
        res.redirect("/");

    } catch (error) {
        res.json({ message: "Failed to make request: " + error.response.data });
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


