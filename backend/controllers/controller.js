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
    catch(err){
        return res.status(500).json({message:"nopost"})
    }
}

async function createPost(req,res){
    const user = req.user;
    const {title,content} = req.body
    try{
        const post = await db.createPost(title,content,user.id)
        return res.status(201).json(post)
    }
    catch(err){
        return res.status(400).json({message:"Error creating post"})
    }

}

module.exports = {
    getUserDetail,
    getPosts,
    createPost
}