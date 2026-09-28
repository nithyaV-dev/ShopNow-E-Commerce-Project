import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Checkout() {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:"", phone:"", address:"", city:"", state:"", postalCode:"" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");
  const shipping = subtotal >= 1000 ? 0 : 80;
  const total = subtotal + shipping;

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/orders", { shippingAddress: form, paymentMethod });
      navigate(`/orders/${data.order._id}`);
    } catch (e) {
      setError(e.response?.data?.message || "Could not place order.");
    }
  }

  if (!cart.items.length) return <div className="page-center">Your cart is empty.</div>;

  return <main className="section"><div className="container">
    <div className="page-heading"><span className="eyebrow">CHECKOUT</span><h1>Complete your order</h1></div>
    <div className="checkout-grid">
      <form className="checkout-form" onSubmit={submit}>
        {error && <div className="error">{error}</div>}
        <h2>Shipping information</h2>
        <div className="form-grid">
          <label>Full name<input required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/></label>
          <label>Phone<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
          <label className="wide">Address<input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
          <label>City<input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label>
          <label>State<input required value={form.state} onChange={e=>setForm({...form,state:e.target.value})}/></label>
          <label>Postal code<input required value={form.postalCode} onChange={e=>setForm({...form,postalCode:e.target.value})}/></label>
        </div>
        <h2>Payment method</h2>
        <label className="radio"><input type="radio" checked={paymentMethod==="COD"} onChange={()=>setPaymentMethod("COD")}/> Cash on Delivery</label>
        <label className="radio"><input type="radio" checked={paymentMethod==="DEMO_ONLINE"} onChange={()=>setPaymentMethod("DEMO_ONLINE")}/> Demo Online Payment <small>(no real charge)</small></label>
        <button className="btn btn-primary full" type="submit">Place Order · ₹{total.toLocaleString("en-IN")}</button>
      </form>
      <aside className="summary"><h2>Your items</h2>
        {cart.items.map(i=><div className="mini-item" key={i._id}><img src={i.image}/><span>{i.name} × {i.quantity}</span><b>₹{(i.price*i.quantity).toLocaleString("en-IN")}</b></div>)}
        <hr/><div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div><div><span>Shipping</span><b>{shipping ? `₹${shipping}` : "FREE"}</b></div><div className="total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
      </aside>
    </div>
  </div></main>;
}
