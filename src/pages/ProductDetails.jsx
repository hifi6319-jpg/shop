import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, ArrowLeft, CheckCircle, Leaf, Utensils, MessageCircle, Minus, Plus, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            const allProducts = await response.json();
            const currentProduct = allProducts.find(p => p.id === parseInt(id));
            setProduct(currentProduct);
            setSimilarProducts(allProducts.filter(p => p.id !== parseInt(id)));
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchData();
        const socket = io(import.meta.env.VITE_API_URL);
        socket.on('products-updated', fetchData);
        window.scrollTo(0, 0);
        return () => socket.disconnect();
    }, [id]);

    const generateWhatsAppLink = () => {
        if (!product) return '#';
        const phoneNumber = "91XXXXXXXXXX";
        const total = product.price * quantity;
        const message = `Hi, I want to order from NutriMix:
Product: ${product.name}
Quantity: ${quantity}
Price: ₹${product.price}
Total: ₹${total}
${product.offerType ? `Promo: ${product.offerType}` : ''}

Please confirm my order.`;
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-green-50/10"><div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div></div>;
    if (!product) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50"><h2 className="text-2xl font-black mb-4">Product Not Found</h2><Link to="/" className="text-green-600 font-bold underline">Return to Shop</Link></div>;

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">
            <Navbar />
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 lg:px-12">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-green-600 transition-all mb-10 group font-bold uppercase tracking-wider text-xs">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Spices
                    </Link>

                    <div className="bg-white rounded-[48px] shadow-sm border border-gray-100 overflow-hidden mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="bg-gray-50/50 p-12 lg:p-20 flex items-center justify-center relative">
                                {product.offerType && (
                                    <div className="absolute top-10 left-10 bg-orange-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 animate-bounce">
                                        <Zap className="w-4 h-4 fill-current" /> {product.offerType}
                                    </div>
                                )}
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    src={product.image}
                                    className="w-full max-w-md object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                                />
                            </div>

                            <div className="p-10 lg:p-20 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">{product.category}</span>
                                    <div className="flex items-center text-yellow-500 gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="text-xs font-black text-gray-800">{product.rating}</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">{product.name}</h1>
                                <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">{product.description}</p>
                                <div className="flex flex-wrap items-end gap-10 mb-12">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Exclusive Price</p>
                                        <div className="flex items-center gap-4">
                                            <p className="text-5xl font-black text-green-600 tracking-tighter">₹{product.price}</p>
                                            {product.salePrice && product.salePrice > product.price && <p className="text-2xl text-gray-300 font-black line-through italic decoration-red-400/30">₹{product.salePrice}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 bg-white hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-sm"><Minus className="w-5 h-5" /></button>
                                        <span className="font-black text-2xl w-20 text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 bg-white hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-sm"><Plus className="w-5 h-5" /></button>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <a target="_blank" rel="noreferrer" href={generateWhatsAppLink()} className="flex-1 py-6 bg-green-500 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-green-200 hover:bg-green-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group">Buy via WhatsApp <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" /></a>
                                    <button onClick={() => {
                                        addToCart({ ...product, quantity });
                                        if (window.innerWidth >= 1024) {
                                            navigate('/cart');
                                        }
                                    }} className="flex-1 py-6 bg-gray-900 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-gray-200 hover:bg-gray-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group">Add to Cart <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-10"><div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><Leaf className="w-8 h-8" /></div><h2 className="text-3xl font-black text-gray-900">Ingredients</h2></div>
                            <ul className="space-y-6">{(product.ingredients || []).map((ing, k) => <li key={k} className="flex items-start text-lg font-medium text-gray-700"><div className="w-2 h-2 rounded-full bg-green-400 mt-2.5 mr-4 shrink-0" />{ing}</li>)}</ul>
                        </div>
                        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-10"><div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"><Utensils className="w-8 h-8" /></div><h2 className="text-3xl font-black text-gray-900">Chef's Tips</h2></div>
                            <ul className="space-y-6">{(product.uses || []).map((use, j) => <li key={j} className="flex items-start text-lg font-medium text-gray-700"><div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 mr-4 shrink-0" />{use}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
