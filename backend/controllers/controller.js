const db = require("../db/queries")

async function getUserDetail(req, res) {
    const user = req.user;
    res.json({
        id: user.id,
        username: user.username,
        fullname: user.fullname
    })
}

async function getPosts(req, res) {
    try {
        const posts = await db.getPosts()
        return res.status(200).json(posts)
    }
    catch (err) {
        return res.status(500).json({ message: "nopost" })
    }
}

async function createPost(req, res) {
    const user = req.user;
    const { title, content } = req.body
    try {
        const post = await db.createPost(title, content, user.id)
        return res.status(201).json(post)
    }
    catch (err) {
        return res.status(400).json({ message: "Error creating post" })
    }
}

async function getPostById(req, res) {
    const { id } = req.params;
    try {
        const post = await db.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Error post does not exist" })
        }
        return res.status(200).json(post)
    }
    catch (err) {
        return res.status(400).json({ message: "Server Error fetching post" })
    }
}

async function deletePost(req, res) {
    const { id } = req.params
    try {
        await db.deletePost(id)
        return res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (err) {
        return res.status(400).json({ message: "Server Error deleting post" })
    }
}

async function addComment(req, res) {
    const user = req.user;
    const { id } = req.params;
    const { content } = req.body;
    try {
        const comment = await db.createComment(content, user.id, id);
        return res.status(201).json(comment);
    } catch (err) {
        return res.status(400).json({ message: "Error adding comment" });
    }
}

async function deleteComment(req, res) {
    const { id } = req.params;
    try {
        await db.deleteComment(id)
        return res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (err) {
        return res.status(400).json({ message: "Error deleting comment" })
    }
}

module.exports = {
    getUserDetail,
    getPosts,
    createPost,
    getPostById,
    getPostById,
    deletePost,
    addComment,
    deleteComment
}