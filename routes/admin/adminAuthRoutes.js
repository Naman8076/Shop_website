const express=require("express");
const router=new express.Router();
const adminAuthController=require("../../controllers/admin/adminControllers")
const adminUpload=require("../../multerconfig/admin/adminStorageConfig");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
// admin auth routes
router.post("/register",adminUpload.single("admin_profile"),adminAuthController.Register);

router.post("/login",adminAuthController.Login);
router.get("/logout",adminauthenticate,adminAuthController.Logout)
router.get("/adminverify",adminauthenticate,adminAuthController.AdminVerify)



module.exports=router;

// muter ko us eke liye
//   ->jab image kha upload krne hote hai uska path dena hota hai useke andr filter lahgana padyt hai 
