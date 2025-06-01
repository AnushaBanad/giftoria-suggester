
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceData {
  name: string;
  email: string;
  productName: string;
  amount: number;
  invoiceNumber: string;
  date: string;
}

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [productData, setProductData] = useState({
    name: searchParams.get('name') || '',
    price: Number(searchParams.get('price')) || 0,
    image: searchParams.get('image') || '',
    description: searchParams.get('description') || ''
  });
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });
  
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  // Load user profile data on component mount
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();
        
        setUserInfo({
          name: profile?.name || '',
          email: user.email || ''
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const generateInvoice = () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in your name and email to generate invoice.",
      });
      return;
    }

    const invoice: InvoiceData = {
      name: userInfo.name,
      email: userInfo.email,
      productName: productData.name,
      amount: productData.price,
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setInvoiceData(invoice);
    setShowInvoice(true);
    
    toast({
      title: "Invoice Generated",
      description: "Your invoice has been generated successfully!",
    });
  };

  const downloadInvoice = () => {
    if (!invoiceData) return;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .invoice-details { margin-bottom: 30px; }
          .customer-details, .product-details { margin-bottom: 20px; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .amount { text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
          <p>Date: ${invoiceData.date}</p>
        </div>
        
        <div class="customer-details">
          <h3>Bill To:</h3>
          <p><strong>Name:</strong> ${invoiceData.name}</p>
          <p><strong>Email:</strong> ${invoiceData.email}</p>
        </div>
        
        <div class="product-details">
          <h3>Product Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th class="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${invoiceData.productName}</td>
                <td>1</td>
                <td class="amount">₹${invoiceData.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="total">
          <p>Total Amount: ₹${invoiceData.amount}</p>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>Thank you for your purchase!</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceData.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] p-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <Card className="bg-white/95">
            <CardHeader>
              <h1 className="text-2xl font-bold">{productData.name}</h1>
            </CardHeader>
            <CardContent>
              {productData.image && (
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-600 mb-4">{productData.description}</p>
              <div className="text-3xl font-bold text-emerald-600 mb-6">
                ₹{productData.price}
              </div>
            </CardContent>
          </Card>

          {/* Purchase Form */}
          <Card className="bg-white/95">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Purchase Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">₹{productData.price}</span>
                </div>
                
                <Button
                  onClick={generateInvoice}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={!userInfo.name || !userInfo.email}
                >
                  Generate Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Display */}
        {showInvoice && invoiceData && (
          <Card className="mt-8 bg-white/95">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold">Invoice Generated</h2>
              <Button
                onClick={downloadInvoice}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center border-b pb-4">
                  <h3 className="text-2xl font-bold">INVOICE</h3>
                  <p className="text-gray-600">Invoice Number: {invoiceData.invoiceNumber}</p>
                  <p className="text-gray-600">Date: {invoiceData.date}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Bill To:</h4>
                    <p><strong>Name:</strong> {invoiceData.name}</p>
                    <p><strong>Email:</strong> {invoiceData.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Product Details:</h4>
                    <p><strong>Product:</strong> {invoiceData.productName}</p>
                    <p><strong>Quantity:</strong> 1</p>
                    <p><strong>Amount:</strong> ₹{invoiceData.amount}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4 text-right">
                  <p className="text-xl font-bold">Total Amount: ₹{invoiceData.amount}</p>
                </div>
                
                <div className="text-center text-gray-600 mt-6">
                  <p>Thank you for your purchase!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
