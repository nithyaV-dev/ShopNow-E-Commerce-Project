import React from "react";
import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag } from "lucide-react";

export default function AdminLayout(){
  return <div className="admin-layout">
    <aside className="admin-sidebar"><h2>Shop<span>Now</span></h2><p>Admin Panel</p><Link to="/admin"><LayoutDashboard/> Dashboard</Link><Link to="/admin/products"><Package/> Products</Link><Link to="/admin/orders"><ShoppingBag/> Orders</Link><Link to="/admin/users"><Users/> Users</Link></aside>
    <div className="admin-content"><Outlet/></div>
  </div>;
}
