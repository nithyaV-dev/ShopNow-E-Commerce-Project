import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders/mine").then(({data}) => setOrders(data.orders)); }, []);

  return <main className="section"><div className="container">
    <div className="page-heading"><span className="eyebrow">ACCOUNT</span><h1>My Orders</h1></div>
    {orders.length ? <div className="orders-list">{orders.map(o=><Link className="order-row" to={`/orders/${o._id}`} key={o._id}>
      <div><b>#{o._id.slice(-8).toUpperCase()}</b><span>{new Date(o.createdAt).toLocaleDateString()}</span></div>
      <div><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></div>
      <strong>₹{o.total.toLocaleString("en-IN")}</strong>
    </Link>)}</div> : <div className="empty"><h3>No orders yet</h3><Link className="btn btn-primary" to="/products">Shop Now</Link></div>}
  </div></main>;
}
