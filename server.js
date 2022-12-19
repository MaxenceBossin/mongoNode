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

app.listen(process.env.PORT, () => console.info('Server started on port 3000'))