import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = () => {
        setLoading(true);
        // Simulate processing
        setTimeout(() => {
            clearCart();
            navigate('/order-success');
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFDFD]">
                <Navbar />
                <main className="pt-40 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your Bag is Empty</h1>
                    <p className="text-gray-400 font-medium mb-10 max-w-xs">Looks like you haven't added any premium health blends yet.</p>
                    <Link to="/" className="px-10 py-5 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-700 shadow-xl shadow-green-100 transition-all">
                        Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />

            <main className="pt-32 lg:pt-40 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side: Items List */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-2">Shopping <span className="text-green-600">Bag</span></h1>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{cart.length} Premium Items Selected</p>
                        </div>

                        <div className="space-y-6">
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl hover:shadow-green-50/50 transition-all duration-500"
                                >
                                    <div className="w-32 h-32 bg-gray-50 rounded-[28px] p-4 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">{item.name}</h3>
                                        <p className="text-xs font-bold text-gray-400 capitalize mb-4 tracking-wide">{item.category}</p>

                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-green-600 transition-all"><Minus className="w-4 h-4" /></button>
                                                <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-green-600 transition-all"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors p-2"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="text-2xl font-black text-gray-900 tabular-nums">₹{item.price * item.quantity}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">₹{item.price} / unit</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:w-[400px] shrink-0">
                        <div className="bg-gray-900 text-white p-10 rounded-[48px] shadow-2xl sticky top-40">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Summary</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-white text-sm">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                    <span>Shipping</span>
                                    <span className="text-green-400 text-sm">₹0 (Promo)</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-lg font-black uppercase tracking-widest">Grand Total</span>
                                    <span className="text-3xl font-black text-green-500 tabular-nums">₹{cartTotal - discount}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="PROMO CODE"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-[0.2em] outline-none focus:bg-white/10 focus:border-green-500 transition-all"
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 font-black text-[10px] uppercase tracking-widest hover:text-green-400">Apply</button>
                                </div>
                                <div className="flex items-center gap-3 text-white/40 text-[9px] font-bold uppercase tracking-widest px-2">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Secure checkout guaranteed</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full py-6 bg-green-600 hover:bg-green-500 text-white rounded-[28px] font-black text-lg uppercase tracking-widest shadow-2xl shadow-green-500/20 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        Confirm Order
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="mt-8 flex justify-center gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-gray-500 text-center">Free Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-gray-500 text-center">2Y Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
