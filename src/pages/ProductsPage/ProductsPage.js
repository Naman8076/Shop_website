import React, { useEffect, useState } from 'react'
import ProductsPageMain from '../../components/ProductsPageMain/ProductsPageMain'
import Loader from '../../components/Loader/Loader';

const ProductsPage = () => {
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
  spin ?<Loader/> : <ProductsPageMain/> 
}

</>  
)
}

export default ProductsPage