
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
  invoiceNumber: string;
  invoiceDate: string;
  supplierName: string;
  supplierAddress: string;
  supplierGSTIN: string;
  recipientName: string;
  recipientAddress: string;
  recipientGSTIN: string;
  productName: string;
  productDescription: string;
  quantity: number;
  hsnCode: string;
  taxableValue: number;
  gstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTaxAmount: number;
  totalAmount: number;
  placeOfSupply: string;
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
    email: '',
    address: '',
    gstin: '',
    state: ''
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
        
        setUserInfo(prev => ({
          ...prev,
          name: profile?.name || '',
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const calculateGST = (taxableValue: number, gstRate: number) => {
    const totalGST = (taxableValue * gstRate) / 100;
    return {
      cgst: totalGST / 2,
      sgst: totalGST / 2,
      igst: 0, // For inter-state, but keeping 0 for simplicity
      totalGST
    };
  };

  const generateInvoice = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.address || !userInfo.state) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields to generate GST invoice.",
      });
      return;
    }

    const taxableValue = productData.price;
    const gstRate = 18; // Assuming 18% GST for gifts/accessories
    const gstCalculation = calculateGST(taxableValue, gstRate);
    const totalAmount = taxableValue + gstCalculation.totalGST;

    const invoice: InvoiceData = {
      invoiceNumber: `GST-INV-${Date.now()}`,
      invoiceDate: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      supplierName: "GiftWise Solutions Pvt Ltd",
      supplierAddress: "123, Business Park, Electronic City, Bangalore - 560100, Karnataka",
      supplierGSTIN: "29ABCDE1234F1Z5",
      recipientName: userInfo.name,
      recipientAddress: userInfo.address,
      recipientGSTIN: userInfo.gstin || "Not Applicable",
      productName: productData.name,
      productDescription: productData.description,
      quantity: 1,
      hsnCode: "9503", // HSN code for toys and games/gifts
      taxableValue: taxableValue,
      gstRate: gstRate,
      cgstAmount: gstCalculation.cgst,
      sgstAmount: gstCalculation.sgst,
      igstAmount: gstCalculation.igst,
      totalTaxAmount: gstCalculation.totalGST,
      totalAmount: totalAmount,
      placeOfSupply: userInfo.state
    };

    setInvoiceData(invoice);
    setShowInvoice(true);
    
    toast({
      title: "GST Invoice Generated",
      description: "Your GST compliant invoice has been generated successfully!",
    });
  };

  const downloadInvoice = () => {
    if (!invoiceData) return;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GST Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          .company-details, .customer-details { margin-bottom: 20px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .invoice-table th, .invoice-table td { border: 1px solid #000; padding: 8px; text-align: left; }
          .invoice-table th { background-color: #f0f0f0; font-weight: bold; }
          .amount-column { text-align: right; }
          .total-section { margin-top: 20px; }
          .signature-section { margin-top: 40px; text-align: right; }
          .gst-details { background-color: #f9f9f9; }
          .company-name { font-size: 18px; font-weight: bold; }
          .invoice-title { font-size: 16px; font-weight: bold; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">${invoiceData.supplierName}</div>
          <div>${invoiceData.supplierAddress}</div>
          <div><strong>GSTIN:</strong> ${invoiceData.supplierGSTIN}</div>
          <div class="invoice-title">TAX INVOICE</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div class="company-details">
            <strong>Invoice Details:</strong><br>
            Invoice No: ${invoiceData.invoiceNumber}<br>
            Invoice Date: ${invoiceData.invoiceDate}<br>
            Place of Supply: ${invoiceData.placeOfSupply}
          </div>
          
          <div class="customer-details">
            <strong>Bill To:</strong><br>
            ${invoiceData.recipientName}<br>
            ${invoiceData.recipientAddress}<br>
            GSTIN: ${invoiceData.recipientGSTIN}
          </div>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Description of Goods/Services</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Taxable Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>${invoiceData.productName}<br><small>${invoiceData.productDescription}</small></td>
              <td>${invoiceData.hsnCode}</td>
              <td>${invoiceData.quantity}</td>
              <td class="amount-column">₹${invoiceData.taxableValue.toFixed(2)}</td>
              <td class="amount-column">₹${invoiceData.taxableValue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <table class="invoice-table gst-details">
          <thead>
            <tr>
              <th>Taxable Value</th>
              <th>CGST Rate</th>
              <th>CGST Amount</th>
              <th>SGST Rate</th>
              <th>SGST Amount</th>
              <th>IGST Rate</th>
              <th>IGST Amount</th>
              <th>Total Tax</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="amount-column">₹${invoiceData.taxableValue.toFixed(2)}</td>
              <td class="amount-column">${(invoiceData.gstRate/2).toFixed(1)}%</td>
              <td class="amount-column">₹${invoiceData.cgstAmount.toFixed(2)}</td>
              <td class="amount-column">${(invoiceData.gstRate/2).toFixed(1)}%</td>
              <td class="amount-column">₹${invoiceData.sgstAmount.toFixed(2)}</td>
              <td class="amount-column">0%</td>
              <td class="amount-column">₹${invoiceData.igstAmount.toFixed(2)}</td>
              <td class="amount-column">₹${invoiceData.totalTaxAmount.toFixed(2)}</td>
              <td class="amount-column"><strong>₹${invoiceData.totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        
        <div class="total-section">
          <p><strong>Total Amount (in words):</strong> ${numberToWords(invoiceData.totalAmount)} Rupees Only</p>
        </div>
        
        <div class="signature-section">
          <p><strong>For ${invoiceData.supplierName}</strong></p>
          <br><br>
          <p>_________________________</p>
          <p>Authorized Signatory</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 10px;">
          <p><em>This is a computer generated invoice and does not require physical signature.</em></p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GST-Invoice-${invoiceData.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const numberToWords = (num: number): string => {
    // Simple number to words conversion for invoice
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
    
    return 'Amount too large';
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
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <Label htmlFor="address">Complete Address *</Label>
                <Input
                  id="address"
                  value={userInfo.address}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your complete address"
                />
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={userInfo.state}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="Enter your state"
                />
              </div>

              <div>
                <Label htmlFor="gstin">GSTIN (Optional)</Label>
                <Input
                  id="gstin"
                  value={userInfo.gstin}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, gstin: e.target.value }))}
                  placeholder="Enter your GSTIN if applicable"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Taxable Amount:</span>
                  <span className="text-lg font-bold">₹{productData.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">GST (18%):</span>
                  <span className="text-sm">₹{((productData.price * 18) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">₹{(productData.price + (productData.price * 18) / 100).toFixed(2)}</span>
                </div>
                
                <Button
                  onClick={generateInvoice}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={!userInfo.name || !userInfo.email || !userInfo.address || !userInfo.state}
                >
                  Generate GST Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GST Invoice Display */}
        {showInvoice && invoiceData && (
          <Card className="mt-8 bg-white/95">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold">GST Invoice Generated</h2>
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
              <div className="space-y-6">
                {/* Invoice Header */}
                <div className="text-center border-b pb-4">
                  <h3 className="text-2xl font-bold">{invoiceData.supplierName}</h3>
                  <p className="text-sm text-gray-600">{invoiceData.supplierAddress}</p>
                  <p className="text-sm"><strong>GSTIN:</strong> {invoiceData.supplierGSTIN}</p>
                  <h4 className="text-xl font-bold mt-2">TAX INVOICE</h4>
                </div>
                
                {/* Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Invoice Details:</h4>
                    <p><strong>Invoice No:</strong> {invoiceData.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
                    <p><strong>Place of Supply:</strong> {invoiceData.placeOfSupply}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Bill To:</h4>
                    <p><strong>Name:</strong> {invoiceData.recipientName}</p>
                    <p><strong>Address:</strong> {invoiceData.recipientAddress}</p>
                    <p><strong>GSTIN:</strong> {invoiceData.recipientGSTIN}</p>
                  </div>
                </div>
                
                {/* Product Details Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">HSN</th>
                        <th className="p-3 text-right">Qty</th>
                        <th className="p-3 text-right">Rate</th>
                        <th className="p-3 text-right">Taxable Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{invoiceData.productName}</p>
                            <p className="text-gray-600 text-xs">{invoiceData.productDescription}</p>
                          </div>
                        </td>
                        <td className="p-3">{invoiceData.hsnCode}</td>
                        <td className="p-3 text-right">{invoiceData.quantity}</td>
                        <td className="p-3 text-right">₹{invoiceData.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{invoiceData.taxableValue.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* GST Breakdown */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-right">Taxable Value</th>
                        <th className="p-3 text-right">CGST (9%)</th>
                        <th className="p-3 text-right">SGST (9%)</th>
                        <th className="p-3 text-right">Total Tax</th>
                        <th className="p-3 text-right">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-right">₹{invoiceData.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{invoiceData.cgstAmount.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{invoiceData.sgstAmount.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{invoiceData.totalTaxAmount.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold">₹{invoiceData.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Amount in Words */}
                <div className="border-t pt-4">
                  <p><strong>Total Amount (in words):</strong> {numberToWords(Math.floor(invoiceData.totalAmount))} Rupees Only</p>
                </div>

                {/* Signature */}
                <div className="text-right mt-8">
                  <p><strong>For {invoiceData.supplierName}</strong></p>
                  <div className="mt-8">
                    <p>_________________________</p>
                    <p>Authorized Signatory</p>
                  </div>
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
