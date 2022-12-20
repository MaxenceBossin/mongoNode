const express = require('express')
const router = express.Router()
const productSchema = require('../models/product')
// Getting all
router.get('/', async (req, res) => {
	try {
		const products = await productSchema.find()
		const message = `Success ! You've got ${products.length} products`
		res.json({message, data: products} )
	} catch (err) {
		res.status(500).json({message: err.message})
	}
})
// Getting one
router.get('/:id', getProduct, (req, res) => {
	const message = 'Success'
	res.send({message, data: res.product})
})
// Creating one
router.post('/' , async (req, res) => {
	const product = new productSchema({
		label: req.body.label,
		price: req.body.price,
		description: req.body.description,
		types: req.body.types,
		createdAt: req.body.createdAt,
	})
	try{
		const newProduct = await product.save()
		res.status(201).json(`Un nouveau produit a été ajouté : ${newProduct}`)
	}catch(err){
		res.status(400).json({message: err.message})
	}
})
// Updating one
router.put('/:id', getProduct, async (req, res) => {
	const message = 'resource updated successfully'
	try{
		await res.product.updateOne(
			{_id: req.body._id}, 
			{ $set: 
				{
					"label" :  req.body.label,
					"updatedAt" :  Date.now
				}
			},
			{upsert: true} // add document with req.body._id if not exists 
		)
	} catch (err) {
			return res.status(500).json({message: err.message})
	} finally {
			res.status(201).json({ message, data: res.product, dataSend: req.body, product: res.product })
	}
	
})

// patch
router.patch('/:id', getProduct, async (req, res) => {
	const message = 'resource updated successfully'
	let productUpdated = null
	if(req.body.label != null){
		res.product.label = req.body.label
	}
	if(req.body.price != null){
		res.product.price = req.body.price
	}
	if(req.body.type != null){
		res.product.type = req.body.type
	}	
	res.product.updatedAt = Date.now()
	
	try{
		productUpdated = await res.product.save()
	} catch (err) {
		res.status(500).json({message : err.message})
	} finally {
		
		res.status(201).json({ message, data: productUpdated, dataSend: req.body })
	}
})

// Delete one
router.delete('/:id', getProduct , (req, res) => {
	const message = 'resource deleted successfully'
	res.product.deleteOne({_id: req.params.id})
	res.status(200).json({message, data : res.product})
})

// private function
async function getProduct(req, res, next){
	let product
	try {
		product = await productSchema.findById(req.params.id)
		if(product == null){
			return res.status(204).json({message: `No content`})
		}
	} catch (err) {
		res.status(500).json({message: err.message})
		
	}

	res.product = product
	next()
}
module.exports = router