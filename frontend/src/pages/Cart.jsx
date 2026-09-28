import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 1000 || subtotal === 0 ? 0 : 80;
  const total = subtotal + shipping;

  if (!cart.items.length) return <main className="section"><div className="container empty"><h1>Your cart is empty</h1><p>Add something you like and it will appear here.</p><Link className="btn btn-primary" to="/products">Start Shopping</Link></div></main>;

  return <main className="section"><div className="container">
    <div className="page-heading"><span className="eyebrow">SHOPPING CART</span><h1>Your Cart</h1></div>
    <div className="cart-layout">
      <div className="cart-items">
        {cart.items.map(item => <div className="cart-item" key={item._id}>
          <img src={item.image} alt={item.name}/>
          <div className="cart-item-info"><Link to={`/product/${item.product._id}`}><h3>{item.name}</h3></Link><span>₹{item.price.toLocaleString("en-IN")}</span></div>
          <div className="quantity">
            <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
          </div>
          <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
          <button className="delete-btn" onClick={() => removeItem(item._id)}><Trash2 size={18}/></button>
        </div>)}
      </div>
      <aside className="summary">
        <h2>Order Summary</h2>
        <div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div>
        <div><span>Shipping</span><b>{shipping ? `₹${shipping}` : "FREE"}</b></div>
        <hr/><div className="total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
        <button className="btn btn-primary full" onClick={() => navigate("/checkout")}>Checkout <ArrowRight size={18}/></button>
      </aside>
    </div>
  </div></main>;
}
