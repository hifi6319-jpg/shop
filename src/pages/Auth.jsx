import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = isLogin
                ? await login(formData.email, formData.password)
                : await register(formData);

            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-20">
                <div className="w-full max-w-6xl bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row shadow-green-100/50">

                    {/* Visual Side */}
                    <div className="lg:w-1/2 bg-green-600 p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-black rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8"
                            >
                                Premium Experience
                            </motion.div>
                            <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-6 uppercase tracking-tight">
                                Join the <br /><span className="text-green-200 underline decoration-green-400 decoration-8 underline-offset-8 text-6xl">Organic</span> Revolution
                            </h2>
                            <p className="text-green-50 text-xl font-medium max-w-md leading-relaxed">
                                Access exclusive spice blends, track your orders, and manage your custom profile with ease.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-4 text-green-100 font-bold">
                                <CheckCircle className="w-6 h-6" /> <span>Secure Profile Management</span>
                            </div>
                            <div className="flex items-center gap-4 text-green-100 font-bold">
                                <CheckCircle className="w-6 h-6" /> <span>Express Checkout Enabled</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-white relative">
                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                                {isLogin ? 'Welcome Back' : 'Create Profile'}
                            </h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                {isLogin ? 'Enter your credentials to continue' : 'Collection of essential information'}
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold text-sm border border-red-100"
                            >
                                <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">!</span>
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-5"
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                                            <input
                                                required={!isLogin}
                                                type="text"
                                                placeholder="FULL NAME"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-14 pr-5 py-5 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-black text-xs uppercase tracking-widest"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                                            <input
                                                required={!isLogin}
                                                type="tel"
                                                placeholder="PHONE NUMBER"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-14 pr-5 py-5 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-black text-xs uppercase tracking-widest"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                                            <textarea
                                                required={!isLogin}
                                                placeholder="DELIVERY ADDRESS"
                                                value={formData.address}
                                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full pl-14 pr-5 py-5 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-black text-xs uppercase tracking-widest min-h-[100px]"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                                <input
                                    required
                                    type="email"
                                    placeholder="EMAIL ADDRESS"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-14 pr-5 py-5 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-black text-xs uppercase tracking-widest"
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                                <input
                                    required
                                    type="password"
                                    placeholder="PASSWORD"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-14 pr-5 py-5 bg-gray-50 rounded-[24px] outline-none border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-black text-xs uppercase tracking-widest"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 bg-gray-900 text-white rounded-[28px] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-4 group mt-8 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-gray-400 font-black uppercase text-xs tracking-widest hover:text-green-600 transition-colors"
                            >
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Auth;
