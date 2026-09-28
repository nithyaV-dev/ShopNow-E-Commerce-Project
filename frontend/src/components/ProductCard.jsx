import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);

  async function handleCart() {
    if (!user) return alert("Please login to add products to cart.");
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    } catch (e) {
      alert(e.response?.data?.message || "Could not add to cart");
    }
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name}/>
        {product.oldPrice > product.price && <span className="sale-badge">SALE</span>}
      </Link>
      <div className="product-info">
        <p className="category">{product.category}</p>
        <Link to={`/product/${product._id}`}><h3>{product.name}</h3></Link>
        <div className="rating"><Star size={15} fill="currentColor"/> {product.rating} <span>({product.numReviews})</span></div>
        <div className="price-row">
          <div>
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
            {product.oldPrice > product.price && <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>}
          </div>
          <button className="icon-cart" onClick={handleCart} disabled={product.stock < 1}>
            <ShoppingCart size={18}/>
          </button>
        </div>
        {added && <small className="added">Added to cart ✓</small>}
      </div>
    </article>
  );
}
