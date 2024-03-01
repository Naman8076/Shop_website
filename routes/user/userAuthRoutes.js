const express=require("express");
const router=new express.Router();
const userUpload=require("../../multerconfig/user/userStorageConfig")
const userController=require("../../controllers/user/userControllers")
const userauthenticate=require("../../middleware/user/userauthenticate");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
// userAuth routes
router.post("/register",userUpload.single("userprofile"),userController.userRegister);
router.post("/login",userController.login);
router.get("/userloggedin",userauthenticate,userController.userverify)

router.get("/logout",userauthenticate,userController.logout);
router.post("/forgotpassword",userController.forgotpassword);
// user verify 
router.get("/forgotpassword/:id/:token",userController.forgotpasswordverify);
// router.pu
router.put("/resetpassword/:id/:token",userController.resetpassword);

// for contact api
router.post("/usercontact",userauthenticate,userController.userContact);

// for admin  ke dasboard par call krenge
router.get("/getAlluser",adminauthenticate,userController.getAlluser)

// ro
router.delete("/userdelete/:userid",adminauthenticate,userController.userDelete)


module.exports=router;