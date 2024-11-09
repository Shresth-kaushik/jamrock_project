import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, Ticket, Home } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Toaster, toast } from 'react-hot-toast';
import { STRIPE_SECRET_KEY } from '../config';
import { generatePDF } from '../utils/generatePDF';

interface PurchaseData {
  id: string;
  name: string;
  phone_number: string;
  tickets_count: number;
  ticket_ids: string[];
  total_amount: number;
  payment_status: string;
  created_at: string;
  invoice_number: string;
}

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          toast.error('No session ID found');
          return;
        }

        // Fetch session from Stripe
        const sessionResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          },
        });

        if (!sessionResponse.ok) {
          throw new Error('Failed to fetch session data');
        }

        const session = await sessionResponse.json();
        const purchaseId = session.metadata.purchase_id;

        // Fetch purchase data from Supabase
        const { data: purchase, error } = await supabase
          .from('ticket_purchases')
          .select('*')
          .eq('id', purchaseId)
          .single();

        if (error) {
          throw error;
        }

        if (!purchase) {
          throw new Error('Purchase not found');
        }

        // Update payment status if needed
        if (purchase.payment_status !== 'completed') {
          const { error: updateError } = await supabase
            .from('ticket_purchases')
            .update({ 
              payment_status: 'completed',
              stripe_session_id: sessionId
            })
            .eq('id', purchaseId);

          if (updateError) {
            console.error('Error updating payment status:', updateError);
          }
        }

        setPurchaseData(purchase);
        toast.success('Purchase confirmed successfully!', {
          duration: 5000,
          id: 'purchase-success', // Prevent duplicate toasts
        });
      } catch (error) {
        console.error('Error fetching purchase data:', error);
        toast.error('Failed to fetch purchase details');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseData();
  }, [searchParams]);

  const generateInvoice = () => {
    if (!purchaseData) return;
    generatePDF(purchaseData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#556B2F] to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#556B2F] to-gray-900">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
          <div className="flex items-center justify-center mb-8">
            <CheckCircle className="w-16 h-16 text-[#FFD700] mr-4" />
            <h1 className="text-4xl font-bold">Payment Successful!</h1>
          </div>

          {purchaseData && (
            <div className="space-y-6">
              <div className="border-t border-b border-white/20 py-6">
                <h2 className="text-2xl font-semibold mb-4">Purchase Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">Invoice Number:</p>
                    <p className="font-semibold">{purchaseData.invoice_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Name:</p>
                    <p className="font-semibold">{purchaseData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Number of Tickets:</p>
                    <p className="font-semibold">{purchaseData.tickets_count}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Total Amount:</p>
                    <p className="font-semibold">${purchaseData.total_amount}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Your Ticket IDs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {purchaseData.ticket_ids.map((ticketId, index) => (
                    <div key={ticketId} className="flex items-center bg-white/5 p-2 rounded">
                      <Ticket className="w-4 h-4 text-[#FFD700] mr-2" />
                      <span className="text-sm font-mono">{ticketId}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={generateInvoice}
                  className="flex items-center justify-center gap-2 bg-[#FFD700] text-[#556B2F] px-6 py-3 rounded-lg font-bold hover:bg-[#FFC700] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-lg font-bold hover:bg-[#FFD700] hover:text-[#556B2F] transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}