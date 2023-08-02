const { User } = require('../models/user')
const { Post } = require('../models/post')

module.exports = {
    addPost: async (req, resp) => {
        try {
            let { title, content, status, userId } = req.body
            await Post.create({ title, content, privateStatus: status, userId })
            resp.sendStatus(200)
        }
        catch (err) {
            console.log('ERROR IN gettingCurrentUserPosts')
            console.log(err)
            resp.sendStatus(400)
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: { privateStatus: false },
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        } catch (err) {
            console.log('Error in getAllPosts')
            console.log(err)
            res.sendStatus(400)
        }
    },
    getCurrentUserPost: async (req, res) => {
        try {
            const { userId } = req.params
            const posts = await Post.findAll({
                where: { userId: userId },
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        }
        catch (err) {
            console.log(err)
            console.log('Error in getCurrentUserPost')
            res.sendStatus(400)
        }
    },
    editPost: async (req, res) => {
        try {
            const { id } = req.params
            const { status } = req.body
            await Post.update(
                { privateStatus: status },
                { where: { id: +id } }
            )
            res.sendStatus(200)
        }
        catch (err) {
            console.log('ERROR in editPost')
            console.log(err)
            res.sendStatus(400)
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params
            await Post.destroy(
                {
                    where: { id: +id }
                }
            )
            res.sendStatus(200)
        }
        catch (err) {
            console.log(err)
            console.log('ERROR is deletePost')
            res.sendStatus(400)
        }
    }
}