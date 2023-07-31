module.exports = {
    addPost: async (req, resp) => {
        console.log('add post')
        resp.sendStatus(200)
    },
    getAllPosts: async (req, resp) => {
        console.log('get all posts')
        resp.sendStatus(200)
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