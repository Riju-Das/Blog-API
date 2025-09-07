async function getUserDetail(req,res) {
    const user = req.user;
    res.json({
        id:user.id,
        username: user.username,
        fullname: user.fullname
    })
}


module.exports = {
    getUserDetail
}