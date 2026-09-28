import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">Shop<span>Now</span></Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {user?.isAdmin && <Link to="/admin"><Shield size={17}/> Admin</Link>}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20}/>
            <span>Cart</span>
            {count > 0 && <b>{count}</b>}
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/profile"><User size={19}/> {user.name.split(" ")[0]}</Link>
              <button onClick={() => { logout(); navigate("/"); }}>
                <LogOut size={17}/> Logout
              </button>
            </div>
          ) : (
            <Link className="btn btn-primary small" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
