import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { products } from '../data';
import { Download, FileText, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');
    const [quantity, setQuantity] = useState(1);
    const [paymentMode, setPaymentMode] = useState('UPI');
    const [invoiceGenerated, setInvoiceGenerated] = useState(false);

    const generateInvoice = () => {
        const doc = new jsPDF();
        const product = products.find(p => p.id === parseInt(selectedProduct));
        const total = product ? product.price * quantity : 0;
        const invoiceNo = `INV-${Math.floor(Math.random() * 10000)}`;
        const date = new Date().toLocaleDateString();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(34, 197, 94); // Green
        doc.text("Premium Spices Shop", 105, 20, null, null, "center");

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("123 Spice Market, Trichy, Tamil Nadu", 105, 28, null, null, "center");
        doc.text("Phone: +91 98765 43210 | Email: contact@spiceshop.com", 105, 34, null, null, "center");

        doc.line(20, 40, 190, 40);

        // Invoice Details
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("INVOICE", 150, 55);

        doc.setFontSize(10);
        doc.text(`Invoice No: ${invoiceNo}`, 150, 62);
        doc.text(`Date: ${date}`, 150, 67);

        // Customer Details
        doc.setFontSize(12);
        doc.text("Bill To:", 20, 55);
        doc.setFontSize(10);
        doc.text(customerName, 20, 62);
        doc.text(customerPhone, 20, 67);

        // Table
        const tableColumn = ["Product", "Quantity", "Price (INR)", "Total (INR)"];
        const tableRows = [
            [product.name, quantity, product.price, total]
        ];

        doc.autoTable({
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [34, 197, 94] }
        });

        // Total Section
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(`Payment Mode: ${paymentMode}`, 20, finalY);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Grand Total: INR ${total}`, 140, finalY);

        // Footer
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Thank you for your business!", 105, 280, null, null, "center");

        // Save PDF
        doc.save(`invoice_${invoiceNo}.pdf`);
        setInvoiceGenerated(true);
        setTimeout(() => setInvoiceGenerated(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-20 container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Invoice Generator</h1>
                            <p className="text-sm text-gray-500">Manual Verification & Billing</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                    placeholder="Enter name"
                                    value={customerName}
                                    onChange={e => setCustomerName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                    placeholder="Enter phone"
                                    value={customerPhone}
                                    onChange={e => setCustomerPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                            <select
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                value={selectedProduct}
                                onChange={e => setSelectedProduct(e.target.value)}
                            >
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                    value={quantity}
                                    onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                                <select
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                    value={paymentMode}
                                    onChange={e => setPaymentMode(e.target.value)}
                                >
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generateInvoice}
                            disabled={!customerName || !customerPhone}
                            className={`w-full py-4 mt-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${!customerName || !customerPhone
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-900 text-white hover:bg-green-600 hover:shadow-green-500/30'
                                }`}
                        >
                            {invoiceGenerated ? (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    Invoice Downloaded!
                                </>
                            ) : (
                                <>
                                    <Download className="w-6 h-6" />
                                    Generate & Download PDF
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
