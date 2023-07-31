module.exports = {
    login: async (req, resp) => {
        console.log('login')
        resp.sendStatus(200)
    },
    register: async (req, resp) => {
        console.log('register')
        resp.sendStatus(200)
    }
}
