import React, { useEffect, useState } from 'react';
import "./Product.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import { removeFromCart } from '../../redux/features/cartSlice';


function Product() {
  const [products, setProducts] = useState([]);
  const [page , setPage] = useState(1)

  const dispatch = useDispatch();

  const send  = (e)=>{
    dispatch(addToCart(e));
  }

  
  const FetchData = async ()=>{
    const res = await fetch("https://dummyjson.com/products?limit=50");
    const data = await res.json();
    setProducts(data.products);
    console.log(data);
  }

  useEffect(()=>{
    FetchData();
  }, []); 

  const handlePage = (selectPage)=>{
    if(page > 0 && page <= (products.length/10)  && selectPage !== page)
    {
      setPage(selectPage);
    }

  }

  return (
    <div className='container'>
      {
       products.length > 0 && <div className='products'>
        {
          products.slice(page*10-10, page*10).map((item , index)=>{
            return <div className='product' key = {index}>
            <div className='product-image'>
             <img src = {item.thumbnail} alt = {item.description}/>
             <span>Category : {item.category}</span>
             <span>Price : {item.price.toString().split("")[0]}</span>
             <span>Rating : {Math.floor(item.rating)}</span>
              <button style={{backgroundColor :"yellow"}}  onClick={() => dispatch(removeFromCart({ id: item.id }))} >
              Remove </button>
              <button style={{backgroundColor : "green"}} onClick={()=>send(item)}>
                Add to Cart</button>
             </div>
             </div>
        })
      }
        
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
           <span onClick={()=>handlePage(page-1)} className={page > 1 ? "" : "disable"}>◀️</span>
          {
            [...Array(products.length/10)].map((_, index)=>{
              return <span onClick={()=>handlePage(index+1)} className= {index +1 == page ? "selected" :  ""} key = {index}>{index+1}</span>
            })
          }
          <span onClick={()=>handlePage(page+1)} className={page < (products.length/10) ? "" : "disable"}> ▶️</span>
          
          </div>
      }
      </div>
  )
}

export default Product
