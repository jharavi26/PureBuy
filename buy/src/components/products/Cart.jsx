import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import "./Cart.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, addToCart , emptyCart , removeSingleItem } from '../../redux/features/cartSlice';
import {loadStripe} from '@stripe/stripe-js';



const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);


  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };


  // Decrement item quantity
  const handleDecrement = (id) => {
    dispatch(removeSingleItem(id));
  };

  // Empty the cart
  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  // Calculate total price
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Calculate total quantity
  useEffect(() => {
    const quantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setTotalQuantity(quantity);
  }, [cartItems]);

  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51R1T3lFPYHVofb34iWSc3hrrWtSjmASXukeXfU7XS0DwuD96OOzPjUb6Ca7WRG5WxXTHuAe0oOHKNmZOU9Ou6k2300BTEtxzYG");

    const body = {
      products : cartItems
    }

    const headers = {
      "Content-Type":"application/json"
    }

    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server Error:", errorText);
    return;
}

  const session = await response.json();

  const result = stripe.redirectToCheckout({
      sessionId:session.id
  });
  
  if(result.error){
      console.log(result.error);
  }
}  
  


  return (
    <div className="home">
      <div className="productContainer">
        <div className="cartheader">
          <h1>Cart Calculation ({cartItems.length})</h1>
          <button onClick={handleEmptyCart}>Empty Cart</button>
        </div>

        <div className="component">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <i className="fa fa-shopping-cart"></i>
              <p>Your Cart Is Empty</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button className="prdct-delete" onClick={()=>handleDecrement(item.id)}>
                        <MdDeleteForever/>
                      </button>
                    </td>
                    <td>
                      <div className="product-img">
                        <img src={item.thumbnail} alt={item.dish} />
                      </div>
                    </td>
                    <td>
                      <div className="product-name">
                        <p>{item.category}</p>
                      </div>
                    </td>
                    <td>
                      <div className="product-price">
                        <p>{Math.floor(item.price)}</p>
                      </div>
                    </td>
                    <td>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(updateQuantity({ id: item.id, qty: Number(e.target.value) }))
                        }
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-right">
                      <p>{Math.floor(item.price * item.qty)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={4}>Items In Cart:</th>
                  <th>{totalQuantity}</th>
                  <th className="text-right">Total Price: ₹{totalPrice.toFixed(2)}</th>
                  <th className="text-right">
                    <button className="checkout" onClick={makePayment}>Checkout</button>
                  </th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
