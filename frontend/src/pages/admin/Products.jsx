import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const empty = { name:"", slug:"", description:"", price:"", oldPrice:"", category:"Electronics", brand:"", image:"", stock:"", rating:"4.5", numReviews:"0" };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  async function load(){ const {data}=await api.get("/products"); setProducts(data.products); }
  useEffect(()=>{load()},[]);

  async function submit(e){
    e.preventDefault();
    const payload={...form,price:Number(form.price),oldPrice:Number(form.oldPrice||0),stock:Number(form.stock),rating:Number(form.rating),numReviews:Number(form.numReviews)};
    if(editing) await api.put(`/products/${editing}`,payload);
    else await api.post("/products",payload);
    setForm(empty); setEditing(null); load();
  }
  async function remove(id){ if(confirm("Delete this product?")) { await api.delete(`/products/${id}`); load(); } }
  function edit(p){ setEditing(p._id); setForm({...p}); window.scrollTo({top:0,behavior:"smooth"}); }

  return <main className="section"><div className="container">
    <div className="admin-head"><div><span className="eyebrow">ADMIN</span><h1>Products</h1></div></div>
    <form className="panel admin-form" onSubmit={submit}><h2>{editing?"Edit Product":"Add Product"}</h2>
      <div className="form-grid">{Object.keys(empty).map(k=><label key={k} className={k==="description"||k==="image"?"wide":""}>{k}<input required={["name","slug","description","price","category","image","stock"].includes(k)} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></label>)}</div>
      <div className="row-actions"><button className="btn btn-primary">{editing?"Update":"Create"} Product</button>{editing&&<button type="button" className="btn btn-outline" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</div>
    </form>
    <div className="admin-table"><div className="table-head"><span>Product</span><span>Price</span><span>Stock</span><span>Action</span></div>
      {products.map(p=><div className="table-row" key={p._id}><span className="table-product"><img src={p.image}/>{p.name}</span><span>₹{p.price}</span><span>{p.stock}</span><span><button onClick={()=>edit(p)} className="text-btn">Edit</button><button onClick={()=>remove(p._id)} className="text-btn danger">Delete</button></span></div>)}
    </div>
  </div></main>;
}
