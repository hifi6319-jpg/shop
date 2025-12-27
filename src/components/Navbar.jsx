import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { toggleCart, cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { searchQuery, setSearchQuery } = useSearch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Disable body scroll when menu is open
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isMenuOpen ? 'bg-white' : 'bg-white/95 backdrop-blur-md'} shadow-sm`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                            NutriMix
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Shop</Link>
                        <Link to="/#featured" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Featured</Link>
                        <Link to="/#bestsellers" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Best Sellers</Link>
                        <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About Us</Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <div className="relative flex items-center">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.input
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="absolute right-10 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 text-sm"
                                        autoFocus
                                    />
                                )}
                            </AnimatePresence>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-gray-600 hover:text-green-600 transition-colors z-10"
                            >
                                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-6 h-6" />}
                            </button>
                        </div>
                        <button onClick={toggleCart} className="p-2 text-gray-600 hover:text-green-600 transition-colors relative">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay & Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay - z-40 to sit BEHIND the navbar (z-50) but ON TOP of content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[40] backdrop-blur-sm md:hidden"
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                        />

                        {/* Drawer - z-[60] to sit ON TOP of navbar (z-50) */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white z-[60] shadow-2xl flex flex-col md:hidden"
                            style={{ height: '100vh', position: 'fixed' }}
                        >
                            <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-white">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 -mr-2 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-white">
                                <Link
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all group"
                                >
                                    <span className="text-lg font-medium group-hover:translate-x-1 transition-transform">Shop</span>
                                </Link>
                                <Link
                                    to="/#featured"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all group"
                                >
                                    <span className="text-lg font-medium group-hover:translate-x-1 transition-transform">Featured</span>
                                </Link>
                                <Link
                                    to="/#bestsellers"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all group"
                                >
                                    <span className="text-lg font-medium group-hover:translate-x-1 transition-transform">Best Sellers</span>
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all group"
                                >
                                    <span className="text-lg font-medium group-hover:translate-x-1 transition-transform">About Us</span>
                                </Link>
                            </div>

                            <div className="p-6 bg-gray-50 mt-auto border-t border-gray-100">
                                <p className="text-center text-xs font-medium text-gray-400">
                                    © 2025 NutriMix Inc.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
