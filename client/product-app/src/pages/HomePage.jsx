import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, ShieldCheck, Headphones } from "lucide-react";

const HomePage = () => {
const features = [
{
title: "Fast Delivery",
icon: <Truck size={32} />,
desc: "Quick and reliable delivery at your doorstep",
},
{
title: "Secure Payments",
icon: <ShieldCheck size={32} />,
desc: "100% safe and secure payment methods",
},
{
title: "24/7 Support",
icon: <Headphones size={32} />,
desc: "We are here anytime you need help",
},
{
title: "Easy Shopping",
icon: <ShoppingCart size={32} />,
desc: "Smooth and simple buying experience",
},
];

const categories = [
{ name: "Furniture", icon: "🛋️" },
{ name: "Clothing", icon: "👗" },
{ name: "Electronics", icon: "💻" },
{ name: "Home Decor", icon: "🏠" },
];

const products = [
{
name: "Modern Chair",
price: "$120",
img: "https://images.unsplash.com/photo-1582582621959-48d27397dc69",
},
{
name: "Wooden Table",
price: "$240",
img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
},
{
name: "Designer Lamp",
price: "$80",
img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
},
];

return ( <div className="bg-pink-50 min-h-screen font-sans">
{/* Hero */} <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16 px-6 md:px-12 grid md:grid-cols-2 items-center gap-10">
<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
> <h1 className="text-4xl md:text-6xl font-bold mb-6">
Modern Ecommerce Experience </h1>

      <p className="text-pink-100 mb-6">
        Discover premium furniture, fashion, and electronics curated for modern living.
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-100">
          Shop Now
        </button>
        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600">
          Become Vendor
        </button>
      </div>
    </motion.div>

    <motion.img
      src="https://t4.ftcdn.net/jpg/03/34/53/51/360_F_334535136_vvbWaKEpsHIMS4dpJUxgXZL6clQX7VGs.jpg"
      className="rounded-2xl shadow-2xl"
    />
  </section>

  {/* Features */}
  <section className="px-6 md:px-12 py-14 grid md:grid-cols-4 gap-6">
    {features.map((f, i) => (
      <motion.div key={i} whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="text-pink-600 flex justify-center mb-3">{f.icon}</div>
        <h3 className="font-semibold">{f.title}</h3>
        <p className="text-gray-500 text-sm">{f.desc}</p>
      </motion.div>
    ))}
  </section>

  {/* Products */}
  <section className="px-6 md:px-12 pb-14">
    <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>

    <div className="grid md:grid-cols-3 gap-8">
      {products.map((p, i) => (
        <motion.div key={i} whileHover={{ y: -8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img src={p.img} className="h-56 w-full object-cover" />
          <div className="p-5">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-500 mb-3">{p.price}</p>
            <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>

  <footer className="bg-pink-700 text-white text-center py-6">
    © 2026 Ecommerce website. All rights reserved.
  </footer>
</div>


);
};

export default HomePage;
