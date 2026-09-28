import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(({ data }) => setProducts(data.products.slice(0, 4)));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">NEW COLLECTION 2026</span>
            <h1>Shop smarter.<br/><span>Live better.</span></h1>
            <p>Discover quality products at prices you'll love. Everything you need, all in one place.</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Shop Now <ArrowRight size={18}/></Link>
              <Link to="/products?category=Electronics" className="btn btn-outline">Explore Electronics</Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-circle"></div>
            <div className="floating-card">🔥 Trending<br/><strong>Up to 40% OFF</strong></div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container feature-grid">
          <div><Truck/><div><b>Fast Delivery</b><span>Quick doorstep delivery</span></div></div>
          <div><ShieldCheck/><div><b>Secure Shopping</b><span>Safe & protected checkout</span></div></div>
          <div><Headphones/><div><b>24/7 Support</b><span>We're here to help</span></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">HANDPICKED</span><h2>Featured Products</h2></div>
            <Link to="/products">View all <ArrowRight size={17}/></Link>
          </div>
          <div className="product-grid">
            {products.map(p => <ProductCard key={p._id} product={p}/>)}
          </div>
        </div>
      </section>
    </>
  );
}
