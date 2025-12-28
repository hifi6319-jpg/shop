import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, LogOut, ChevronDown, Home, Package, Info, Mail as MailIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { toggleCart, cartTotal, cart } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body Scroll Lock for Mobile Menu
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Collections', path: '/shop', icon: Package },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/#footer', icon: MailIcon },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
            <div className="container mx-auto px-4 md:px-8">
                {/* Navbar Glass Container - Reduced Transparency */}
                <div className={`relative flex items-center justify-between bg-white rounded-[28px] px-6 lg:px-10 py-3.5 transition-all duration-500 ${isScrolled ? 'shadow-2xl shadow-green-200/40 border border-green-50 backdrop-blur-md bg-white/95' : 'border border-gray-100 bg-white/98 backdrop-blur-sm'}`}>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-green-200 group-hover:rotate-12 transition-transform">N</div>
                        <span className="text-xl lg:text-2xl font-black text-gray-900 tracking-tighter uppercase">Nutri<span className="text-green-600 italic">Mix</span></span>
                    </Link>

                    {/* Desktop Nav - Hidden on Mobile */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${location.pathname === link.path ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-green-600 rounded-full transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Auth UI */}
                        {isAuthenticated ? (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-green-100"
                                >
                                    <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center text-white text-[9px] font-black uppercase tracking-tighter">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest hidden xl:inline-block">{user.name.split(' ')[0]}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-[60]"
                                        >
                                            <div className="p-3 border-b border-gray-50 mb-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Account</p>
                                                <p className="text-xs font-black text-gray-900 line-clamp-1">{user.name}</p>
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-red-50 text-red-500 rounded-lg transition-all font-bold text-[10px] uppercase tracking-widest group"
                                            >
                                                <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/auth" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-gray-200 shrink-0">
                                <User className="w-3.5 h-3.5" /> Sign In
                            </Link>
                        )}

                        <div className="flex items-center gap-2 lg:gap-4">
                            {/* Cart Toggle - Redirects to /cart on desktop, Toggles Sidebar on mobile */}
                            <button
                                onClick={() => {
                                    if (window.innerWidth >= 1024) {
                                        navigate('/cart');
                                    } else {
                                        toggleCart();
                                    }
                                }}
                                className="relative group p-2.5 hover:bg-green-50 rounded-xl transition-all"
                            >
                                <ShoppingBag className="w-6 h-6 text-gray-900 group-hover:text-green-600 transition-colors" />
                                {cart.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-600 text-white text-[8px] font-black rounded-md flex items-center justify-center animate-pulse">
                                        {cart.length}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button
                                className="lg:hidden p-2.5 bg-gray-50 rounded-xl hover:bg-green-50 text-gray-900 hover:text-green-600 transition-all"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[100]"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-4 right-4 w-[calc(100%-32px)] max-w-sm bg-white rounded-[40px] shadow-2xl z-[101] flex flex-col overflow-hidden"
                        >
                            <div className="p-8 flex items-center justify-between border-b border-gray-50">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-black text-lg">N</div>
                                    <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">Nutri<span className="text-green-600 italic">Mix</span></span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-2 mb-4">Navigations</p>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${location.pathname === link.path ? 'bg-green-50 text-green-600 shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
                                        >
                                            <link.icon className="w-5 h-5" />
                                            <span className="text-sm font-black uppercase tracking-widest">{link.name}</span>
                                        </Link>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-50 space-y-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-2 mb-4">Account</p>
                                    {isAuthenticated ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl">
                                                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{user.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 truncate tracking-widest uppercase">Member Since 2024</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                                className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out from Profile
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/auth"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full flex items-center justify-center gap-3 p-6 bg-gray-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl"
                                        >
                                            <User className="w-5 h-5" /> Secure Login
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 text-center">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest underline underline-offset-4 decoration-green-200">NutriMix Premium Health Blends © 2025</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
