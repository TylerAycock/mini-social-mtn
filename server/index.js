const express = require('express')
const cors = require('cors')
const app = express()

const { sequelize } = require('./util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')

const PORT = process.env.PORT || 4005

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

const { addPost, getAllPosts, getCurrentUserPost, editPost, deletePost } = require('./controllers/posts')
const { register, login } = require('./controllers/auth')
const { isAuthenticated } = require('./middleware/isAuthenticated')

app.post('/register', register)
app.post('/login', login)
app.post('/posts', isAuthenticated, addPost)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPost)

app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))

