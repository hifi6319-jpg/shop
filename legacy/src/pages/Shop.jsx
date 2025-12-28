import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />

            <main className="pt-32 pb-20 container mx-auto px-4 md:px-8">
                {/* Shop Header */}
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-green-100"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Our Full Collection
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
                        Premium <span className="text-green-600 italic">Spices</span> & Blends
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        Discover our hand-picked selection of organic health blends designed to elevate your nutrition and flavor profiles.
                    </p>
                </div>

                {/* Filters/Search Bar Placeholder */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
                    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm w-full md:w-[400px]">
                        <Search className="w-5 h-5 text-gray-300" />
                        <input placeholder="SEARCH BLENDS..." className="bg-transparent outline-none text-xs font-black uppercase tracking-widest w-full" />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                            <SlidersHorizontal className="w-4 h-4" /> Filter
                        </button>
                        <select className="flex-1 md:flex-none px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-sm">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center space-y-6">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Synchronizing Inventory...</p>
                    </div>
                ) : (
                    <ProductGrid products={products} />
                )}

                {!loading && products.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="text-gray-300 font-black text-3xl uppercase tracking-tighter mb-4">No Products Found</p>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters or search query</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Shop;
