import React, { useEffect, useState } from 'react'

function Product() {
  const [products, setProducts] = useState();

  const FetchData = async ()=>{
    const res = await fetch("https://dummyjson.com/products?limit=190");
    const data = await res.json();
    setProducts(data.products);
    console.log(data);
  }

  useEffect(()=>{
    FetchData();
  }, []); 
  
  return (
    <div>
      
    </div>
  )
}

export default Product
