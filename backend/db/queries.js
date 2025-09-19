const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function createUser(username, fullname, email, password) {
    return await prisma.user.create({
        data: {
            username: username,
            fullname: fullname,
            email: email,
            password: password
        }
    })
}

async function findUserByUsername(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

async function saveRefreshToken(userId, token) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            refreshTokens: { push: token }
        }
    })
}

async function removeRefreshToken(userId, token) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            refreshTokens: true
        }
    })
    if (!user) return null

    const filtered = user.refreshTokens.filter((t) => t !== token)

    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            refreshTokens: filtered
        }
    })
}
async function findUserByRefreshToken(token) {
    return await prisma.user.findFirst({
        where: {
            refreshTokens: {
                has: token  
            }
        }
    });
}

async function  getPosts() {
    return await prisma.post.findMany({
        include:{
            author:true
        }
    })
}

async function createPost(title,content,authorId){
    return await prisma.post.create({
        data:{
            title:title,
            content:content,
            authorId:authorId,
        }
    })
}
async function getPostById(id){
    return await prisma.post.findUnique({
        where:{
            id:id
        },
        include:{
            author:true,
            comments:true
        }
    })
}

async function deletePost(id) {
    await prisma.post.delete({
        where:{
            id:id
        }
    })
}

module.exports = {
    createUser,
    findUserByUsername,
    saveRefreshToken,
    removeRefreshToken,
    findUserByRefreshToken,
    getPosts,
    createPost,
    getPostById,
    deletePost
}