import React, { useEffect, useState } from 'react'
import ProductsDetailsMain from '../../components/ProductsDetailsMain/ProductsDetailsMain'
import Loader from '../../components/Loader/Loader';

const ProductsDetailsPage = () => {
  const [spin, setSpin] = useState(true);

  useEffect(()=>{
  window.scrollTo(0,0);
  },[])
 
   useEffect(() => {
     setTimeout(() => {
       setSpin(false);
     }, 3000);
   }, []);
  return (
   <>
   {
    spin ? <Loader/> :<ProductsDetailsMain/>
   }
    
   </>
  )
}

export default ProductsDetailsPage