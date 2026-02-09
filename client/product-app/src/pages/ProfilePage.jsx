import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const BACKEND_URL = "https://bi-firstday-apidatafetching.onrender.com"; // Render backend URL

const ProfilePage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fileRef = useRef(null);

  // JWT token (login ke baad)
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/products`,
        config
      );
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  /* ---------------- ADD / UPDATE ---------------- */
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Name and price required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(
          `${BACKEND_URL}/api/products/${editingId}`,
          formData,
          config
        );
        setEditingId(null);
      } else {
        await axios.post(
          `${BACKEND_URL}/api/products`,
          // `https://bi-firstday-apidatafetching.onrender.com/api/products`,
          formData,
          config
        );
      }

      // Reset form
      setName("");
      setPrice("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";

      fetchProducts();
    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `${BACKEND_URL}/api/products/${id}`,
        config
      );
      fetchProducts();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Products</h2>

      {/* -------- FORM -------- */}
      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* -------- PRODUCTS -------- */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>

              {p.image && (
                <img
                  src={`${BACKEND_URL}/${p.image}`}
                  alt={p.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(p)}
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
