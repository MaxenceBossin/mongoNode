const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	label:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	description:{
		type: String,
		required: false
	},
	types:{
		type: Array,
    required: false,
	},
	createdAt:{
		type: Date,
		required: true,
		default: Date.now
	},
	updatedAt:{
		type: Date,
		required: false,
	}
})

module.exports = mongoose.model('product', productSchema)