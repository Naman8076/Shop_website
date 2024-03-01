const cartsdb = require("../../model/carts/cartsModel");
const productsdb = require("../../model/product/ProductModel");

exports.AddtoCart = async (req, res) => {
  const { id } = req.params;



  try {
    const productfind = await productsdb.findOne({ _id: id });
    
    const carts = await cartsdb.findOne({
        userid: req.userId,
        productid: productfind._id,
      });


    if(productfind.quantity>=1){
        if (carts?.quantity >= 1) {
            // add to cart
            carts.quantity = carts.quantity + 1;
            await carts.save();
// decreament in quantity
            productfind.quantity=productfind.quantity-1;
            await productfind.save();

            return res.status(200).json({ message: "product suceeesfully increment in card" });
          } else {
            const addtocart = new cartsdb({
              userid: req.userId,
              productid: productfind._id,
              quantity: 1,
            });
            await addtocart.save();
            productfind.quantity=productfind.quantity-1;
            await productfind.save();

            res.status(200).json({ message: "product successfully aded to cart" });
          }
    }else{
        res.status(400).json({ error: " this product is sold out" });
    }


 
  } catch (error) {
    res.status(400).json(error);
  }
};

// get carts value
exports.getCartsValue=async(req,res)=>{
   
    try {
        const getCarts = await cartsdb.aggregate([
            {
                $match: { userid: req.userMainId }
            },
            {
                $lookup: {
                    from: "productsmodels",
                    localField: "productid",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            // getting first daya from productdetails array
            {
              $project:{
                _id:1,
                userid:1,
                productid:1,
                quantity:1,
                productDetails:{$arrayElemAt:['$productDetails',0]}//extract first element of product array
              }
            }
        ]);

        res.status(200).json(getCarts)
    } catch (error) {
        res.status(400).json(error)
    }

}

// 
exports.removeSingleitem=async(req,res)=>{
    const { id } = req.params;


    try {
         const productfind = await productsdb.findOne({ _id: id });
    
    const carts = await cartsdb.findOne({
        userid: req.userId,
        productid: productfind._id,
      });

      if(!carts){
        return res.status(400).json({error:"cart item not found"});
      }
      if(carts.quantity==1){
        const deleteCartItem=await cartsdb.findByIdAndDelete({_id:carts._id});

        // incremen product quantity
        productfind.quantity=productfind.quantity+1;
        await productfind.save();

        res.status(200).json({message:"your item is sucessfully removed from cart",deleteCartItem});
      }
      else if(carts.quantity>1){
        carts.quantity=carts.quantity-1;
        await carts.save();


          // incremen product quantity
          productfind.quantity=productfind.quantity+1;
          await productfind.save();

        res.status(200).json({message:"your item Successfully Decrement in your cart"})
      }
    } catch (error) {
        res.status(400).json(error)
    }
}


// remove all item 
exports.removeAlliteam = async(req,res)=>{
    const { id } = req.params;
    try {
        
        const productfind = await productsdb.findOne({ _id: id });

        const carts = await cartsdb.findOne({ userid: req.userId, productid: productfind._id });

        if (!carts) {
            res.status(400).json({ error: "cart item not found" });
        }

        const deleteCartItem = await cartsdb.findByIdAndDelete({_id:carts._id});


        // prodcut increment
        productfind.quantity = productfind.quantity + carts.quantity 
        await productfind.save();


        res.status(200).json({message:"YOur Iteam sucessfully remove in your cart",deleteCartItem});
    } catch (error) {
        res.status(400).json(error)
        
    }
}

// DeleteCartsData
exports.DeleteCartsData = async(req,res)=>{
    try {
        const DeleteCarts = await cartsdb.deleteMany({userid:req.userId});
        res.status(200).json(DeleteCarts);
    } catch (error) {
        res.status(400).json(error)
    }
}