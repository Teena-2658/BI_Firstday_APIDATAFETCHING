import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useContext(CartContext);

  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dummyRes = await fetch("https://dummyjson.com/products");
        const dummyData = await dummyRes.json();

        const formattedDummy = dummyData.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          thumbnail: p.thumbnail,
          source: "dummy",
        }));

        const token = localStorage.getItem("token");

        const backendRes = await fetch(
          "https://bi-firstday-apidatafetching.onrender.com/api/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const backendData = await backendRes.json();

        const formattedBackend = backendData.map((p) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          rating: 4.5,
          thumbnail: p.image
            ? `https://bi-firstday-apidatafetching.onrender.com/${p.image}`
            : "https://via.placeholder.com/150",
          source: "vendor",
        }));

        setProducts([...formattedDummy, ...formattedBackend]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4 md:p-6">

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-pink-200 rounded-lg px-3 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-pink-200 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-pink-400 outline-none"
        >
          <option value="">Sort By Name</option>
          <option value="name-asc">A to Z</option>
          <option value="name-desc">Z to A</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={`${product.source}-${product.id}`}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-pink-100"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-3 rounded-lg"
            />

            <h2 className="font-semibold text-lg text-center text-gray-800">
              {product.title}
            </h2>

            <p className="text-pink-600 font-medium mt-1">
              ₹{product.price}
            </p>

            <p className="text-yellow-500 mt-1">
              Rating: {product.rating}
            </p>

            <button
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg mt-3 hover:scale-105 transition"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
        >
          Prev
        </button>

        <span className="bg-white border border-pink-200 text-pink-600 px-4 py-2 rounded-lg shadow">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
