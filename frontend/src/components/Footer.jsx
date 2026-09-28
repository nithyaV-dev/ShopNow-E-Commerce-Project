import React from "react";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Shop<span>Now</span></h3>
          <p>A modern e-commerce project built with MongoDB, Express, React and Node.js.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <p>Electronics</p>
          <p>Fashion</p>
          <p>Computers</p>
        </div>
        <div>
          <h4>Support</h4>
          <p>Contact Us</p>
          <p>Shipping</p>
          <p>Returns</p>
        </div>
      </div>
      <div className="copyright">© 2026 ShopNow. Built with MERN by V. Nithya</div>
    </footer>
  );
}
