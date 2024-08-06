import express from "express";
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const postDB = [
    {
        id: 1,
        author: "Arzad Mariano",
        title: "Greatest Blogsite",
        content: "This is the greatest Blog Site there is!",
        timestamp: "12:40 - 05/08/2024"
    },
    {
        id: 2,
        author: "Wade Wilson",
        title: "I am Deadpool",
        content: "My name is Wade Wilson and I am Deadpool",
        timestamp: "12:40 - 05/08/2024"
    }
];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));

//GET kuha lahat ng post
app.get("/posts", (req, res) => {
    if (postDB.length === -1) {
        res.json({ message: "No blogs yet" })
    } else {
        res.json(postDB);
    }
    
});

//GET kuha ng specific na post
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const postIndex = postDB.findIndex((post) => post.id === id);

    if (postIndex > -1) {
        const post = postDB[postIndex];
        res.json(post);

    } else {
        return res.status(404).json({ message: "Post not found." });
    }

    
});

app.post("/posts", (req, res) => {

    const newPost = {
        id: postDB.length + 1,
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        timestamp: getTime()
    };

    
    postDB.push(newPost);
    console.log(newPost);
    res.status(201).json(newPost)
    
});

app.patch("/posts/:id", (req, res) => {

    const post = postDB.find( (post) => post.id === req.params.id);

    if (!post) { // para macheck kung meron ba talagang post
        return res.status(404).json({ message: "Post not found." })
    }

    if(req.body.author) {
        post.author = req.body.author;
    }

    if (req.body.title) {
        post.title = req.body.title;
    }

    if (req.body.content) {
        post.title = req.body.content;
    }
    
    res.status(201).json(post);
    
});

app.delete("/posts/:id", (req, res) => {

    const postIndex = postDB.findIndex( (post) => post.id === parseInt(req.params.id));

    if (postIndex > -1) {
        postDB.splice(postIndex, 1);
        res.status(201).json({ message: "Post deleted." });
    } else {
        res.status(401).json({ message: "Post not found." })
    }
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})

function getTime() {
    let currentdate = new Date(); 
    let datetime =  currentdate.getHours() + ":"  
                + currentdate.getMinutes() + " - " 
                + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1)  + "/" 
                + currentdate.getFullYear();

    return datetime
}