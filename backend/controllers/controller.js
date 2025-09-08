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

module.exports = {
    getUserDetail,
    getPosts
}