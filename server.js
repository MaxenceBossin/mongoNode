require('dotenv').config() // permet l’accès au variable d’environnement

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// connection à la base de données
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.info('Connected to Database !'))

// Middleware
app.use(express.json()) // accepte le format JSON
// Routing
const productRouter = require('./src/routes/products')
const userRouter = require('./src/routes/products')
app.use('/api/product' , productRouter)
app.use('/api/user' , userRouter)
//app.use('/api/user' , userRouter)
app.listen(process.env.PORT, () => console.info('Server started on port 3000'))
