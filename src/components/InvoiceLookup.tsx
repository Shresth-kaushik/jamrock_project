import React, { useState } from 'react';
import { Search, Ticket, X, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
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

export function InvoiceLookup() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber.trim()) {
      toast.error('Please enter an invoice number');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ticket_purchases')
        .select('*')
        .eq('invoice_number', invoiceNumber.trim())
        .eq('payment_status', 'completed')
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        toast.error('Invoice not found or payment not completed');
        setPurchaseData(null);
        return;
      }

      setPurchaseData(data);
      toast.success('Purchase details found!');
    } catch (error) {
      console.error('Error fetching purchase:', error);
      toast.error('Failed to fetch purchase details');
      setPurchaseData(null);
    } finally {
      setLoading(false);
    }
  };

  const generateInvoice = () => {
    if (!purchaseData) return;
    generatePDF(purchaseData);
  };

  const clearSearch = () => {
    setInvoiceNumber('');
    setPurchaseData(null);
  };

  return (
    <section className="py-20 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Look Up Your Purchase</h2>
          <p className="text-gray-300">Enter your invoice number to view your ticket details</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter Invoice Number (e.g., JR-2024-ABC12)"
              className="w-full px-4 py-3 pl-12 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            {invoiceNumber && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#FFD700] text-[#556B2F] py-3 px-6 rounded-lg font-bold hover:bg-[#FFC700] transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {purchaseData && (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="space-y-6">
              <div className="border-b border-white/20 pb-4">
                <h3 className="text-xl font-semibold mb-4">Purchase Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">Name:</p>
                    <p className="font-semibold">{purchaseData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Invoice Number:</p>
                    <p className="font-semibold">{purchaseData.invoice_number}</p>
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
                <h4 className="text-lg font-semibold mb-3">Your Ticket IDs</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {purchaseData.ticket_ids.map((ticketId, index) => (
                    <div key={ticketId} className="flex items-center bg-white/5 p-2 rounded">
                      <Ticket className="w-4 h-4 text-[#FFD700] mr-2" />
                      <span className="text-sm font-mono">{ticketId}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={generateInvoice}
                  className="flex items-center gap-2 bg-[#FFD700] text-[#556B2F] px-6 py-3 rounded-lg font-bold hover:bg-[#FFC700] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}