import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, CheckCircle, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    // Body Scroll Lock
    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const applyCoupon = async () => {
        setCouponError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/coupons/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode, cartTotal })
            });
            const data = await response.json();
            if (response.ok) {
                setAppliedCoupon(data);
                setCouponCode('');
            } else {
                setCouponError(data.message);
            }
        } catch (err) {
            setCouponError('Network error. Try again.');
        }
    };

    const handleCheckout = () => {
        toggleCart();
        if (!isAuthenticated) {
            navigate('/auth', { state: { from: { pathname: '/checkout' } } });
        } else {
            navigate('/checkout');
        }
    };

    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.discountType === 'percentage') {
            return (cartTotal * appliedCoupon.discountValue) / 100;
        }
        return appliedCoupon.discountValue;
    };

    const finalTotal = cartTotal - calculateDiscount();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-[#FDFDFD] shadow-2xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-8 border-b border-gray-100">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Basket</h2>
                                {isAuthenticated && (
                                    <p className="text-xs font-black text-green-600 mt-1 uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3" /> Signed in as {user.name}
                                    </p>
                                )}
                            </div>
                            <button onClick={toggleCart} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:rotate-90 transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                    <div className="w-24 h-24 bg-green-50 rounded-[32px] flex items-center justify-center animate-bounce">
                                        <ShoppingBag className="w-12 h-12 text-green-600" />
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Basket is empty</p>
                                    <button onClick={toggleCart} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl">
                                        Keep Looking
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="group flex gap-6 bg-white p-5 rounded-[32px] border border-gray-100 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500">
                                        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 p-3">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-black text-gray-900 leading-tight group-hover:text-green-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                                                <p className="text-green-600 font-black mt-1 text-xl">₹{item.price}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-3 hover:bg-white rounded-lg text-gray-600 shadow-sm transition-all"><Minus className="w-3.5 h-3.5" /></button>
                                                    <span className="text-sm font-black w-10 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-3 hover:bg-white rounded-lg text-gray-600 shadow-sm transition-all"><Plus className="w-3.5 h-3.5" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-red-500 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-gray-100 p-10 space-y-8 bg-white">
                                {!appliedCoupon ? (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Voucher Code</p>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    value={couponCode}
                                                    onChange={e => setCouponCode(e.target.value)}
                                                    placeholder="Enter Code"
                                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-[20px] border border-transparent focus:border-green-500 outline-none text-xs font-bold uppercase tracking-widest"
                                                />
                                            </div>
                                            <button onClick={applyCoupon} className="px-8 bg-gray-900 text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all">Apply</button>
                                        </div>
                                        {couponError && <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 pl-2"><AlertCircle className="w-3 h-3" /> {couponError}</p>}
                                    </div>
                                ) : (
                                    <div className="bg-green-50 p-5 rounded-[24px] border border-green-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <CheckCircle className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-green-700 uppercase tracking-widest">Savings Applied</p>
                                                <p className="text-[10px] font-bold text-green-600/70">{appliedCoupon.code} Promo Active</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setAppliedCoupon(null)} className="text-gray-400 hover:text-red-500 bg-white p-2 rounded-lg shadow-sm"><X className="w-4 h-4" /></button>
                                    </div>
                                )}

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Value</span>
                                        <span className="text-gray-900 font-extrabold">₹{cartTotal}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Promo Discount</span>
                                            <span className="font-extrabold">- ₹{calculateDiscount()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-end pt-2">
                                        <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Total Payable</span>
                                        <span className="text-5xl font-black text-green-600 tracking-tighter leading-none">₹{finalTotal}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-6 bg-gray-900 text-white rounded-[32px] font-black text-2xl shadow-2xl hover:bg-green-600 shadow-green-100 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                                >
                                    {isAuthenticated ? 'Pay Securely' : 'Sign In to Buy'}
                                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                                </button>
                                {!isAuthenticated && (
                                    <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        One-click signup during checkout
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
