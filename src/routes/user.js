const express = require('express')
const router = express.Router()


// Getting all
router.get('s/' , (req, res) => {
	res.send('Hello !')
})
// Getting one
router.get('/:id' , (req, res) => {
	
})
// Creating one
router.post('/' , (req, res) => {
	
})
// Updating one
router.put('/' , (req, res) => {
	
})
// Delete one
router.delete('/' , (req, res) => {
	
})

// private function
function getUser(){
	
}
module.exports = router