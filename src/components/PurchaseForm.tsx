import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { createPaymentSession } from '../lib/stripe';
import toast from 'react-hot-toast';

interface PurchaseFormProps {
  selectedTickets: number;
  totalAmount: number;
  onClose: () => void;
}

export function PurchaseForm({ selectedTickets, totalAmount, onClose }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate unique ticket IDs
      const ticketIds = Array.from(
        { length: selectedTickets }, 
        () => crypto.randomUUID()
      );

      // Generate a unique purchase ID
      const purchaseId = crypto.randomUUID();
      
      // Generate invoice number (JR-YYYY-XXXXX format)
      const invoiceNumber = `JR-${new Date().getFullYear()}-${purchaseId.slice(0, 5).toUpperCase()}`;

      // Create initial purchase record with invoice number
      const { data: purchase, error: purchaseError } = await supabase
        .from('ticket_purchases')
        .insert({
          id: purchaseId,
          name: formData.name,
          phone_number: formData.phone_number,
          tickets_count: selectedTickets,
          ticket_ids: ticketIds,
          total_amount: totalAmount,
          payment_status: 'pending',
          invoice_number: invoiceNumber
        })
        .select()
        .single();

      if (purchaseError) {
        throw new Error(`Failed to create purchase: ${purchaseError.message}`);
      }

      if (!purchase) {
        throw new Error('Failed to create purchase record');
      }

      // Create Stripe payment session
      const paymentLink = await createPaymentSession({
        purchaseId: purchase.id,
        amount: totalAmount,
        tickets: selectedTickets,
        customerName: formData.name,
        phoneNumber: formData.phone_number,
      });

      // Update purchase with Stripe session ID
      const { error: updateError } = await supabase
        .from('ticket_purchases')
        .update({ stripe_session_id: paymentLink.id })
        .eq('id', purchase.id);

      if (updateError) {
        console.error('Failed to update stripe session ID:', updateError);
      }

      // Redirect to payment page
      window.location.href = paymentLink.url;
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process purchase');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Purchase</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#556B2F] focus:ring-[#556B2F]"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#556B2F] focus:ring-[#556B2F]"
              value={formData.phone_number}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Number of Tickets:</span>
              <span>{selectedTickets}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 mt-2">
              <span>Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#556B2F] text-white rounded-md hover:bg-[#4A5F29] disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}