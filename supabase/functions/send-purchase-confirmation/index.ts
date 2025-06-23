
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PurchaseConfirmationRequest {
  name: string;
  email: string;
  state: string;
  quantity: number;
  amount: number;
  productName: string;
  productDescription?: string;
  invoiceNumber: string;
  invoiceDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace('Bearer ', ''));
    }

    const {
      name,
      email,
      state,
      quantity,
      amount,
      productName,
      productDescription,
      invoiceNumber,
      invoiceDate
    }: PurchaseConfirmationRequest = await req.json();

    console.log('Processing purchase confirmation for:', email);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Save bill to database
    const { data: billData, error: billError } = await supabase
      .from('bills')
      .insert({
        user_id: user?.id || null,
        name,
        email,
        state,
        quantity,
        amount,
        product_name: productName,
        product_description: productDescription
      })
      .select()
      .single();

    if (billError) {
      console.error('Error saving bill:', billError);
      throw new Error(`Failed to save bill: ${billError.message}`);
    }

    console.log('Bill saved successfully:', billData);

    // Send confirmation email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Gift Purchase Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .purchase-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #333; }
            .total-amount { background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; color: #2d5a2d; margin: 20px 0; }
            .thank-you { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎁 Purchase Confirmation</h1>
            <p>Thank you for your gift purchase!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${name}!</h2>
            <p>We're excited to confirm your recent gift purchase. Here are the details of your order:</p>
            
            <div class="purchase-details">
              <h3>📋 Purchase Summary</h3>
              
              <div class="detail-row">
                <span class="detail-label">Invoice Number:</span>
                <span class="detail-value">${invoiceNumber}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Purchase Date:</span>
                <span class="detail-value">${invoiceDate}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Product:</span>
                <span class="detail-value">${productName}</span>
              </div>
              
              ${productDescription ? `
              <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${productDescription}</span>
              </div>
              ` : ''}
              
              <div class="detail-row">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${quantity}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span class="detail-value">${name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${email}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">State/Location:</span>
                <span class="detail-value">${state}</span>
              </div>
            </div>
            
            <div class="total-amount">
              💰 Total Amount: ₹${amount.toFixed(2)}
            </div>
            
            <div class="thank-you">
              <h3>🙏 Thank You!</h3>
              <p>We appreciate your business and hope you love your gift purchase. If you have any questions or need assistance, please don't hesitate to contact us.</p>
            </div>
            
            <div class="footer">
              <p>This is an automated receipt for your purchase.</p>
              <p>© 2024 GiftWise Solutions. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "GiftWise <onboarding@resend.dev>",
      to: [email],
      subject: "Your Gift Purchase Receipt",
      html: emailHtml,
    });

    if (emailResponse.error) {
      console.error("Error sending email:", emailResponse.error);
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        billId: billData.id,
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-purchase-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
