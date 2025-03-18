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
    <div className="home">
    <div className="productContainer">
      <div className="cartheader">
        <h1>Cart Calculation ({cart.length})</h1>
        <button onClick={() => dispatch({ type: "EMPTY_CART" })}>
          Empty Cart
        </button>
      </div>

      <div className="component">
        {cart.length === 0 ? (
          <table>
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="cart-empty">
                    <i className="fa fa-shopping-cart"></i>
                    <p>Your Cart Is Empty</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th className="text-right">
                  <span id="amount" className="amount">Total Amount</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((data, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="prdct-delete"
                      onClick={() => handleDecrement(data.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                  <td>
                    <div className="product-img">
                      <img src={data.imgdata} alt={data.dish} />
                    </div>
                  </td>
                  <td>
                    <div className="product-name">
                      <p></p>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div className="prdct-qty-container">
                      <button
                        className="prdct-qty-btn"
                        type="button"
                        onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <input type="text" className="qty-input-box" value={qty} disabled />
                      <button
                        className="prdct-qty-btn"
                        type="button"
                        onClick={() => handleIncrement(data)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-right"></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>&nbsp;</th>
                <th colSpan={3}>&nbsp;</th>
                <th>
                  Items In Cart <span className="ml-2 mr-2">:</span>
                  <span className="text-danger">{total}</span>
                </th>
                <th className="text-right">
                  Total Price<span className="ml-2 mr-2">:</span>
                  <span className="text-danger"></span>
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





//           {/* {cart.length > 0 ? (
//             <ol>
//               {cart.map((item) => (
//                 <li key={item.id} className="listitem">
//                   <span> Product 
//                     <img
//                       src={item.thumbnail}
//                       style={{ height: "100px", width: "100px" }}
//                       alt={item.category}
//                     />
//                   </span>
//                   <span style={{ marginRight: "10px" }}>
//                     Category: {item.category}
//                   </span>
//                   <span style={{ marginRight: "10px" }}>
//                     Price: ${Math.floor(item.price)}
//                   </span>
//                   <span style={{ marginRight: "10px" }}>
//                     Rating: {Math.ceil(item.rating)}
//                   </span>

//                   {/* Quantity Dropdown */}
//                   <select
//                     value={item.qty}
//                     onChange={(e) =>
//                       dispatch({
//                         type: "CHANGE_CART_QTY",
//                         payload: {
//                           id: item.id,
//                           qty: Number(e.target.value),
//                         },
//                       })
//                     }
//                   > QTY
//                     {[...Array(10).keys()].map((num) => (
//                       <option key={num + 1} value={num + 1}>
//                         {num + 1}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Delete Icon */}
//                   <MdDelete
//                     style={{
//                       fontSize: "20px",
//                       cursor: "pointer",
//                       color: "black",
// //                       marginLeft: "10px",
// //                     }}
// //                     onClick={() =>
// //                       dispatch({
// //                         type: "REMOVE_FROM_CART",
// //                         payload: item,
// //                       })
// //                     } 
// //                   />
// //                 </li>
// //               ))}
// //             </ol>
// //           ) : (
// //             <h2>Your cart is empty</h2>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

    


//         {/* 
        
//         <div className='summary'>
//           <span className='title'>Subtotal ({cart.length}) items.</span>
//           <span>Total: {Math.trunc(total)}</span>
//           <button style={{fontSize:"20px" , marginTop : "10px"}}>Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// }; */} */}
