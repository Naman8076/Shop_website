const express=require("express");
const userauthenticate = require("../../middleware/user/userauthenticate");
const orderController=require("../../controllers/order/OrderControllers");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
const router=new express.Router();

// for user module
router.post("/addorders",userauthenticate,orderController.AddOrders);
router.get("/getuserorders",userauthenticate,orderController.getUserOrders);
// for admin

router.get("/orders",adminauthenticate,orderController.getAllOrders);
router.put("/orders/:orderid",adminauthenticate,orderController.updateOrderStatus);


module.exports=router;