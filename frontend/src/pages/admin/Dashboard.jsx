import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Users, ShoppingBag, IndianRupee } from "lucide-react";
import api from "../../services/api";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Promise.all([api.get("/orders/admin/all"), api.get("/users"), api.get("/products")]).then(([o,u,p]) => {
      setOrders(o.data.orders); setUsers(u.data.users); setProducts(p.data.products);
    });
  }, []);
  const revenue = orders.filter(o=>o.status!=="Cancelled").reduce((s,o)=>s+o.total,0);

  return <main className="section"><div className="container">
    <div className="admin-head"><div><span className="eyebrow">ADMIN</span><h1>Dashboard</h1></div><Link className="btn btn-primary" to="/admin/products">Manage Products</Link></div>
    <div className="stats">
      <div><Package/><span>Products</span><b>{products.length}</b></div>
      <div><Users/><span>Users</span><b>{users.length}</b></div>
      <div><ShoppingBag/><span>Orders</span><b>{orders.length}</b></div>
      <div><IndianRupee/><span>Revenue</span><b>₹{revenue.toLocaleString("en-IN")}</b></div>
    </div>
    <div className="panel"><h2>Recent Orders</h2>{orders.slice(0,8).map(o=><div className="admin-row" key={o._id}><span>#{o._id.slice(-7)}</span><span>{o.user?.name}</span><span>₹{o.total}</span><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></div>)}</div>
  </div></main>;
}
