import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const statuses=["Placed","Processing","Shipped","Delivered","Cancelled"];

export default function AdminOrders(){
  const [orders,setOrders]=useState([]);
  async function load(){const {data}=await api.get("/orders/admin/all");setOrders(data.orders)}
  useEffect(()=>{load()},[]);
  async function update(id,status){await api.put(`/orders/${id}/status`,{status});load()}
  return <main className="section"><div className="container"><div className="admin-head"><div><span className="eyebrow">ADMIN</span><h1>Orders</h1></div></div>
    <div className="orders-list">{orders.map(o=><div className="order-row admin-order" key={o._id}><div><b>#{o._id.slice(-8).toUpperCase()}</b><span>{o.user?.name} · {o.user?.email}</span></div><strong>₹{o.total.toLocaleString("en-IN")}</strong><select value={o.status} onChange={e=>update(o._id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></div>)}</div>
  </div></main>;
}
