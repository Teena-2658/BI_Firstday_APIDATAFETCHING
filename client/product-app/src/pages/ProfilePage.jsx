import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const BACKEND_URL = "https://bi-firstday-apidatafetching.onrender.com";

export default function ProfilePage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fileRef = useRef(null);
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`, config);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

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
        await axios.post(`${BACKEND_URL}/api/products`, formData, config);
      }

      setName("");
      setPrice("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${BACKEND_URL}/api/products/${id}`, config);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-8 text-pink-600 text-center">
          🌸 My Products
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-6 mb-8 flex flex-wrap gap-3 items-center border border-pink-100"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-pink-200 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-pink-200 rounded-lg px-3 py-2 w-32 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* PRODUCTS */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-pink-100"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>

                <p className="text-pink-600 font-semibold mb-2">
                  ₹{p.price}
                </p>

                {p.image && (
                  <img
                    src={`${BACKEND_URL}/${p.image}`}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-pink-500 text-white py-1 rounded-lg hover:bg-pink-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-rose-500 text-white py-1 rounded-lg hover:bg-rose-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No products added yet.
          </p>
        )}
      </div>
    </div>
  );
}
