import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => { api.get(`/orders/${id}`).then(({data})=>setOrder(data.order)); }, [id]);

  if (!order) return <div className="page-center">Loading...</div>;

  return <main className="section"><div className="container">
    <div className="page-heading"><span className="eyebrow">ORDER CONFIRMED</span><h1>Thank you for your order!</h1><p>Order #{order._id.slice(-8).toUpperCase()}</p></div>
    <div className="order-details">
      <div className="panel"><h2>Items</h2>{order.items.map((i,idx)=><div className="mini-item" key={idx}><img src={i.image}/><span>{i.name} × {i.quantity}</span><b>₹{(i.price*i.quantity).toLocaleString("en-IN")}</b></div>)}</div>
      <div className="panel"><h2>Delivery</h2><p><b>{order.shippingAddress.fullName}</b></p><p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p><p>Phone: {order.shippingAddress.phone}</p><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></div>
      <div className="summary"><h2>Payment</h2><div><span>Method</span><b>{order.paymentMethod}</b></div><div><span>Payment status</span><b>{order.paymentStatus}</b></div><div><span>Subtotal</span><b>₹{order.subtotal.toLocaleString("en-IN")}</b></div><div><span>Shipping</span><b>{order.shippingFee ? `₹${order.shippingFee}` : "FREE"}</b></div><div className="total"><span>Total</span><b>₹{order.total.toLocaleString("en-IN")}</b></div></div>
    </div>
    <Link className="btn btn-outline" to="/orders">View My Orders</Link>
  </div></main>;
}
