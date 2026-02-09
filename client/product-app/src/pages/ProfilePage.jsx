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
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`, config);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

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
          formData,
          config
        );
      }

      setName("");
      setPrice("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";

      fetchProducts();
    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`, config);
      fetchProducts();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          My Products
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-white shadow-lg rounded-2xl p-6 mb-8 flex flex-wrap gap-3 items-center"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
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
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>
                <p className="text-gray-600 mb-2">₹{p.price}</p>

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
                    className="flex-1 bg-yellow-500 text-white py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products added yet.</p>
        )}
      </div>
    </div>
  );
}