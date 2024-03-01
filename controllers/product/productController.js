const categorydb=require("../../model/product/productCategoryModel");
const cloudinary=require("../../cloudinary/cloudinary");
const productsdb = require("../../model/product/ProductModel");
const productreviewdb = require("../../model/product/productreviewModel");
// add category
exports.AddCategory=async(req,res)=>{
const {categoryname,description}=req.body;
if(!categoryname || !description)
{
   return res.status(400).json({error:"Fill all details"})

}
try {
    const existingcategory=await categorydb.findOne({categoryname:categoryname})
    if(existingcategory){
        res.status(400).json({error:"this category already exist"})
    }else{
        const addCategory=new categorydb({
            categoryname,description
        })
        await addCategory.save(); 
        res.status(200).json(addCategory)
    }
} catch (error) {
    return res.status(400).json(error)
}
}
// get category
exports.GetCategory=async(req,res)=>{
    try {
        const getAllCategory=await categorydb.find();
        res.status(200).json(getAllCategory)
    } catch (error) {
        return res.status(400).json(error)
    }
}

// products
exports.AddProducts=async(req,res)=>{
const {categoryid}=req.query;
const file=req.file? req.file.path :""
const {productname,price,discount,quantity,description}=req.body;
if(!productname ||!price || !discount||  !quantity|| !description || !file)
{
  return  res.status(400).json({error:"all fields are required"})
}
try {
    const upload=await cloudinary.uploader.upload(file);
    const existingProduct=await productsdb.findOne({productname:productname});
    if(existingProduct)
    {
       return res.status(400).json({error:"this product already exist"})
    }else{
        const addproduct=new productsdb({
            productname,price,discount,quantity,description,categoryid,productimage:upload.secure_url
        });
        await addproduct.save();
      return  res.status(200).json(addproduct)
    }
} catch (error) { 
  return  res.status(400).json(error)
}
}
// get all products 
exports.getAllProducts=async(req,res)=>{
    const categoryid=req.query.categoryid || ""
    const page=req.query.page || 1;
    const ITEM_PER_PAGE=4;
    const query={};
    if(categoryid !=='all'&& categoryid){
        query.categoryid=categoryid;
    }
   
    try {
        const skip=(page-1)* ITEM_PER_PAGE;
        // product count
        const count=await productsdb.countDocuments(query);
         
        const getAllProducts=await productsdb.find(query).limit(ITEM_PER_PAGE).skip(skip);

        const pageCount=Math.ceil(count/ITEM_PER_PAGE);
        // console.log(pageCount);
        res.status(200).json({getAllProducts,Pagination:{
            totalProducts:count,pageCount
        }})

    } catch (error) {
        res.status(400).json(error);
    }
}

// get single product
exports.getsingleProduct=async(req,res)=>{
    const {productid}=req.params;
    try {
        
        const getSingleProductdata=await productsdb.findOne({_id:productid});
      return  res.status(200).json(getSingleProductdata);
    } catch (error) {
      return  res.status(400).json(error);
    }
}
// latest product -1 se reverse order me ayega 
exports.getLatestProducts = async(req,res)=>{
    try {
        const getNewProducts = await productsdb.find()
        .sort({_id:-1});
        res.status(200).json(getNewProducts)
    } catch (error) {
        res.status(400).json(error);
    }
}
// delete product 
exports.DeleteProducts = async(req,res)=>{
    const {productid} = req.params;
    try {
        const deleteProducts = await productsdb.findByIdAndDelete({_id:productid});
        res.status(200).json(deleteProducts);
    } catch (error) {
        res.status(400).json(error);
        
    }
}


// product review
exports.productreview=async(req,res)=>{
    const {productid}=req.params;
    const {username,description,rating}=req.body;

    if(!productid || !username || !rating || !description )
    {
        res.status(400).json({error:"all fields are required"})
    }
    try {
        const productreviewadd= new  productreviewdb({
              userid:req.userMainId,
              productid,
              username,
              rating,
              description
        });
        await productreviewadd.save();
        res.status(200).json(productreviewadd);
    } catch (error) {
        return  res.status(400).json(error); 
    }
}

// getproductreview
exports.getproductreview=async(req,res)=>{
    const {productid}=req.params;
    try {
        const getreview=await productreviewdb.find({productid:productid});
        res.status(200).json(getreview);
    } catch (error) {
        return  res.status(400).json(error); 
    }
}
// deleteproduct review
exports.DeleteProductreview=async(req,res)=>{
    const {reviewid}=req.params;
    try {
        const reviewDelete=await productreviewdb.findByIdAndDelete({_id:reviewid});
        res.status(200).json(reviewDelete);
    } catch (error) {
        return  res.status(400).json(error); 
    }
}