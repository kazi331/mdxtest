const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// middlewares
app.use(cors());
app.use(express.json());
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,
    {
        dbName: "blog",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

app.post('/api/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    await post.save();
    res.send(post);
});

app.put('/api/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
    }, { new: true }
    );
    
    res.send(post);
});

app.delete('/api/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
