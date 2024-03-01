import React from "react";
import "./homeproduct.scss";
import {NavLink} from "react-router-dom"
const HomeProducts = ({ProductsData,LatestProducts}) => {
  return (
    <>
      <section id="sellers">
        {/* products */}
        <div className="seller container">
          <h2>Products</h2>
          <div className="best-seller">
          {
            ProductsData?.length>0 ?ProductsData.slice(0,4).map((element,index)=>{
              return(
                <>
                <div className="best-p1">
              <img src={element.productimage} alt="" />
              <div className="best-p1-txt">
                <div className="name-of-p">
                  <p>{element.productname}</p>
                  
                </div>
                <div className="price">₹{element.price}</div>
                <div className="buy-now">
                  <button>
                    <NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink>
                  </button>
                </div>
              </div>
            </div>
                </>
              )
            }):"No Product Avalilable"
          }
           
           
          </div>
        </div>

        {/* new arrival */}
        <div className="seller container">
          <h2>New Arrivals</h2>
          <div className="best-seller">
          {
            LatestProducts?.length>0 ?LatestProducts?.slice(0,4).map((element,index)=>{
              return(
                <>
                <div className="best-p1">
              <img src={element.productimage} alt="" />
              <div className="best-p1-txt">
                <div className="name-of-p">
                  <p>{element.productname
}</p>
                </div>
                <div className="price">₹ {element.price}</div>
                <div className="buy-now">
                <button>
                    <NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink>
                  </button>
                </div>
              </div>
            </div>
                </>
              )
            }) :" No Product Avaliable"
          }
            
           
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProducts;
