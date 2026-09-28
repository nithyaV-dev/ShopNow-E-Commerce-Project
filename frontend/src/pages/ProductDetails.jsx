import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data.product)).catch(() => navigate("/products"));
  }, [id]);

  if (!product) return <div className="page-center">Loading...</div>;

  async function add() {
    if (!user) return navigate("/login");
    try {
      await addToCart(product._id, quantity);
      alert("Product added to cart!");
    } catch (e) {
      alert(e.response?.data?.message || "Could not add to cart");
    }
  }

  return (
    <main className="section">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18}/> Back</button>
        <div className="details-grid">
          <div className="details-image"><img src={product.image} alt={product.name}/></div>
          <div className="details-info">
            <span className="category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="rating big"><Star size={18} fill="currentColor"/> {product.rating} <span>({product.numReviews} reviews)</span></div>
            <div className="details-price">
              <strong>₹{product.price.toLocaleString("en-IN")}</strong>
              {product.oldPrice > product.price && <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>}
            </div>
            <p>{product.description}</p>
            <div className="stock">{product.stock > 0 ? `${product.stock} items available` : "Out of stock"}</div>
            <div className="buy-row">
              <div className="quantity">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <button className="btn btn-primary" disabled={!product.stock} onClick={add}>
                <ShoppingCart size={19}/> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
