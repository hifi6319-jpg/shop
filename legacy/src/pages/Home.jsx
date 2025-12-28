import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hash } = useLocation();

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

        // Socket.io integration
        const socket = io(import.meta.env.VITE_API_URL);
        socket.on('products-updated', () => {
            console.log('Products updated, refetching...');
            fetchProducts();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash, products]);

    const featuredProducts = products.filter(p => p.category === 'featured');
    const bestsellingProducts = products.filter(p => p.category === 'bestselling');

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            {loading ? (
                <div className="py-20 text-center"><p className="text-xl text-gray-400">Loading products...</p></div>
            ) : (
                <>
                    <ProductGrid title="Featured Collection" products={featuredProducts} id="featured" />
                    <ProductGrid title="Best Sellers" products={bestsellingProducts} id="bestsellers" />
                </>
            )}
            <Footer />
        </div>
    );
};

export default Home;
