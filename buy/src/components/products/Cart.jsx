import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Context';
import { MdDelete } from "react-icons/md";
import "./Cart.css";

const Cart = () => {
  const { state: { cart }, dispatch } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Math.floor(curr.price) * curr.qty, 0));
  }, [cart]);

  return (
    <div className='home'>
      <div className='productContainer'>
        {cart.length > 0 ? (
          <ol>
            <div className='listitem'>
              {cart.map((item) => (
                <div key={item.id}>
                  <span>
                    <img src={item.thumbnail} style={{ height: "100px", width: "100px" }} alt={item.category} />
                  </span>
                  <span style={{ marginRight: "10px" }}>Category: {item.category}</span>
                  <span style={{ marginRight: "10px" }}>Price: {Math.floor(item.price)}</span>
                  <span style={{ marginRight: "10px" }}>Rating: {Math.ceil(item.rating)}</span>
                  
                  <select 
                    value={item.qty}
                    onChange={(e) => dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: item.id,
                        qty: Number(e.target.value),
                      }
                    })}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>

                  <MdDelete
                    style={{ fontSize: "20px", cursor: "pointer", color: "black" }}
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </ol>
        ) : (
          <h2>Your cart is empty</h2>
        )}
        <div className='summary'>
          <span className='title'>Subtotal ({cart.length}) items.</span>
          <span>Total: {Math.trunc(total)}</span>
          <button style={{fontSize:"20px" , marginTop : "10px"}}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
