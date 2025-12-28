import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Package, ArrowLeft, Instagram, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
    const [bookingId, setBookingId] = useState('');
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        setBookingId(`NTM-${Math.floor(Math.random() * 900000) + 100000}`);

        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFD] overflow-hidden">
            <Navbar />

            {/* Celebration Confetti */}
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={200}
                gravity={0.15}
                colors={['#22c55e', '#16a34a', '#4ade80', '#14532d']}
            />

            <main className="pt-40 pb-20 container mx-auto px-4 max-w-4xl text-center">

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-100 border-4 border-white">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-4">You're All <span className="text-green-600">Set!</span></h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] lg:text-xs">Your journey to wellness has officially begun.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-4">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm text-left"
                    >
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Order Details</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                                <span className="text-sm font-black text-gray-900 font-mono tracking-tight">{bookingId}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-xs font-bold text-gray-500 uppercase">Preparation</span>
                                <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-3 py-1 rounded-full">In Progress</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase">Estimated Delivery</span>
                                <span className="text-sm font-black text-gray-900 uppercase">2-4 Business Days</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-900 p-10 rounded-[48px] text-left text-white shadow-2xl shadow-green-900/10"
                    >
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">What's Next?</p>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Package className="w-3.5 h-3.5 text-green-400" />
                                </div>
                                <p className="text-[10px] font-bold text-gray-300 leading-relaxed uppercase tracking-wider">Our experts are selecting the freshest ingredients for your blend.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Heart className="w-3.5 h-3.5 text-red-400" />
                                </div>
                                <p className="text-[10px] font-bold text-gray-300 leading-relaxed uppercase tracking-wider">A confirmation email has been sent to your registered address.</p>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-12 py-6 bg-green-600 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-green-700 shadow-2xl shadow-green-100 transition-all flex items-center justify-center gap-3"
                    >
                        <Home className="w-4 h-4" /> Back to Home
                    </Link>
                    <button className="w-full sm:w-auto px-12 py-6 bg-white border border-gray-100 text-gray-900 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                        Track Delivery <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center gap-6">
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Share the health mix</p>
                    <div className="flex gap-6">
                        <Instagram className="w-6 h-6 text-gray-300 hover:text-green-600 cursor-pointer transition-colors" />
                        <Twitter className="w-6 h-6 text-gray-300 hover:text-green-600 cursor-pointer transition-colors" />
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
