import React, { useEffect, useState } from 'react'

function Product() {
  const [products, setProducts] = useState([]);

  const FetchData = async ()=>{
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
    console.log(data);
  }

  useEffect(()=>{
    FetchData();
  }, []); 

  return (
    <div className='container'>
      {
       products.length > 0 && <div className='products'>
        {
          products.map((item , index)=>{
            return <span>
              <img src = {item.thumbnail} />
            </span>
          })
        }
        </div>
      }

      
    </div>
  )
}

export default Product
