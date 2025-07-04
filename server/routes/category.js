const express=require('express')

const router = express.Router()

//get all categories
router.get('/',(req,res)=>{
    res.json({msg:'get all categories'})
})

//get a single category 
router.get('/:id',(req,res)=>{
    res.json({msg:'get a single category'})
})

// POST a new category
router.post('/',(req,res)=>{
    res.json({msg:'post a new category'})
})

// DELETE
router.delete('/:id',(req,res)=>{
    res.json({msg:'delete a category'})
})


module.exports=router