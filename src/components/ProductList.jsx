import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart,setcart]=useState([])
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(()=>{
    console.log(cart);
  })

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
//   product.title.includes(search)
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

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


function addToCart(product) {
  setcart(prevCart => {
    const existingItem = prevCart.find(item => item.id === product.id);

    if (existingItem) {
      // same product → quantity increase
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // new product
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
}




  return (

    <div className="p-4 md:p-6">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/3"
        >
          <option value="">Sort By Name</option>
          <option value="name-asc">A to Z</option>
          <option value="name-desc">Z to A</option>
        </select>
      </div>

    {/* Cart Info */}
    <div className="max-w-md mx-auto my-8 bg-white border rounded-lg shadow-md p-5">
  <h2 className="text-xl font-bold mb-2 text-gray-800">🧾 Invoice</h2>

  {cart.length === 0 ? (
    <p className="text-gray-500">No items in the cart</p>
  ) : (
    <>
      {/* Total Items */}
      <p className="text-sm text-gray-600 mb-3">
        Total Items:{" "}
        <span className="font-semibold">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </p>

      {/* Product List */}
      <div className="border-t border-b py-3 space-y-2">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-gray-500">
                ${item.price} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-gray-700">
              ${Number(item.price) * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-gray-800">Total Amount</p>
        <p className="text-lg font-bold text-green-700">
          $
          {cart.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
          )}
        </p>
      </div>
    </>
  )}
</div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
  <div key={product.id} className="border rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition">
    <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-3 rounded" />
    <h2 className="font-bold text-lg text-center">{product.title}</h2>
    <p className="text-gray-600 mt-1">${product.price}</p>
    <p className="text-yellow-500 mt-1">Rating: {product.rating}</p>
    {/* <button className="bg-green-950 text-white px-4 py-2 rounded disabled:opacity-50"onClick={()=>addToCart(products)}>Add to cart</button> */}
    <button
  className="bg-green-950 text-white px-4 py-2 rounded"
  onClick={() => addToCart(product)}
>
  Add to cart
</button>

  </div>
))}

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
        <button className="bg-pink-950 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        //   className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="bg-blue-950 text-white px-4 py-2 rounded disabled:opacity-50">
          Page {currentPage} of {totalPages}
        </span>
        <button className="bg-pink-950 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        //   className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    
    </div>
  );
};

export default ProductList;


