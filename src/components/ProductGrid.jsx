import React from 'react';
import { ShoppingBag, Star, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductGrid = ({ title, products, id }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <section id={id} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 uppercase tracking-tight">{title}</h2>
                        <div className="h-1.5 w-24 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-[40px] p-6 group transition-all duration-500 hover:bg-white hover:shadow-2xl border border-transparent hover:border-green-100 perspective-1000 relative overflow-hidden"
                        >
                            {/* Offer Badge */}
                            {product.offerType && (
                                <div className="absolute top-6 left-6 z-20 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 animate-pulse">
                                    <Zap className="w-3 h-3 fill-current" />
                                    {product.offerType}
                                </div>
                            )}

                            <Link to={`/product/${product.id}`} className="block relative mb-6 overflow-hidden rounded-3xl aspect-square bg-white flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-500">
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                            </Link>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {product.rating}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
                                    {product.name}
                                </h3>

                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                                            {product.salePrice && product.salePrice > product.price && (
                                                <span className="text-sm font-bold text-red-400 line-through">₹{product.salePrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                            if (window.innerWidth >= 1024) {
                                                navigate('/cart');
                                            }
                                        }}
                                        className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 hover:shadow-xl hover:shadow-green-200 transition-all duration-300 group-hover:translate-x-1"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
