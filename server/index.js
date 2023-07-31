const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 4004

app.use(express.json())
app.use(cors())

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




app.listen(PORT, () => { `App running on on PORT ${PORT} sir!` })