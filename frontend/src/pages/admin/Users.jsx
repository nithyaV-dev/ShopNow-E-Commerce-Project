import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{api.get("/users").then(({data})=>setUsers(data.users))},[]);
  return <main className="section"><div className="container"><div className="admin-head"><div><span className="eyebrow">ADMIN</span><h1>Users</h1></div></div>
    <div className="admin-table"><div className="table-head"><span>Name</span><span>Email</span><span>Role</span><span>Joined</span></div>
      {users.map(u=><div className="table-row" key={u._id}><span>{u.name}</span><span>{u.email}</span><span>{u.isAdmin?"Admin":"Customer"}</span><span>{new Date(u.createdAt).toLocaleDateString()}</span></div>)}
    </div>
  </div></main>;
}
