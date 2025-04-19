const express=require('express')
const CartController=require('../controller/CartController');

const router=express.Router();

router.post('/create-category',CartController.createCartRecord);
router.put('/update-category/:id',CartController.updateCart);
router.delete('/delete-category/:id',CartController.deleteCart);
router.get('/find-category-by-id/:id',CartController.findCartById);
router.get('/find-all-categories',CartController.findAllCart);






module.exports=router;