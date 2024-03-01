const express=require("express");
const adminauthenticate = require("../../middleware/admin/adminauthenticate")
const productController=require("../../controllers/product/productController");
const productupload=require("../../multerconfig/products/productStorageConfig");
const userAuthenticate=require("../../middleware/user/userauthenticate");

const router=new express.Router();

router.post("/addcategory",adminauthenticate,productController.AddCategory);
router.get("/getcategory",productController.GetCategory)

// get all products 
router.get("/getProducts",productController.getAllProducts)



// products routes
router.post("/addProducts",[adminauthenticate,productupload.single("productimage")],productController.AddProducts)
// single product
router.get("/getsingleProduct/:productid",productController.getsingleProduct)


// new arrival
router.get("/getLatestProducts",productController.getLatestProducts);
// delete product
router.delete("/products/:productid",adminauthenticate,productController.DeleteProducts);

// productsreview api
router.post("/productreview/:productid",userAuthenticate,productController.productreview)
router.get("/getProductreview/:productid",productController.getproductreview)

router.delete("/productreviewdelete/:reviewid",userAuthenticate,productController.DeleteProductreview)

module.exports=router;

