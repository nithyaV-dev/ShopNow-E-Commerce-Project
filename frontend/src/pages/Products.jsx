import React from "react";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const query = new URLSearchParams({ search, category, sort });
      const { data } = await api.get(`/products?${query}`);
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api.get("/products/categories").then(({ data }) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [search, category, sort]);

  function applySearch(e) {
    e.preventDefault();
    setParams({ ...(search ? { search } : {}), ...(category ? { category } : {}) });
  }

  return (
    <main className="section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">OUR STORE</span>
          <h1>All Products</h1>
          <p>Find something you'll love.</p>
        </div>

        <div className="filters">
          <form onSubmit={applySearch} className="search-box">
            <Search size={19}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."/>
          </form>
          <div className="select-box"><SlidersHorizontal size={18}/>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All categories</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <select className="sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? <div className="page-center">Loading products...</div> :
          products.length ? <div className="product-grid">{products.map(p => <ProductCard key={p._id} product={p}/>)}</div> :
          <div className="empty"><h3>No products found</h3><p>Try a different search or category.</p></div>
        }
      </div>
    </main>
  );
}
