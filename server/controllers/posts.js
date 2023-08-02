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
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPost: async (req, resp) => {
        console.log('get current user post')
        console.log(req.params)
        resp.sendStatus(200)
    },
    editPost: async (req, resp) => {
        console.log('edit post')
        resp.sendStatus(200)
    },
    deletePost: async (req, resp) => {
        console.log('delete post')
        resp.sendStatus(200)
    }
}