import React, { useState } from 'react'
import { Search, Ticket, X, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { toast } from 'react-hot-toast'
import { generatePDF } from '../utils/generatePDF'

interface PurchaseData {
  id: string
  name: string
  phone_number: string
  tickets_count: number
  ticket_ids: string[]
  total_amount: number
  payment_status: string
  created_at: string
  invoice_number: string
}

export function InvoiceLookup() {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!invoiceNumber.trim()) {
      toast.error('Please enter an invoice number')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('ticket_purchases')
        .select('*')
        .eq('invoice_number', invoiceNumber.trim())
        .eq('payment_status', 'completed')
        .single()

      if (error) {
        throw error
      }

      if (!data) {
        toast.error('Invoice not found or payment not completed')
        setPurchaseData(null)
        return
      }

      setPurchaseData(data)
      toast.success('Purchase details found!')
    } catch (error) {
      console.error('Error fetching purchase:', error)
      toast.error('Failed to fetch purchase details')
      setPurchaseData(null)
    } finally {
      setLoading(false)
    }
  }

  const generateInvoice = () => {
    if (!purchaseData) return
    generatePDF(purchaseData)
  }

  const clearSearch = () => {
    setInvoiceNumber('')
    setPurchaseData(null)
  }

  return (
    <div className="flex h-[500px] overflow-hidden rounded-xl shadow-lg">
      <div className="w-2/5 flex-shrink-0">
        <img
          src="https://i.imgur.com/gHfP5jj.jpg"
          alt="Tesla Model 3 on the road"
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
          style={{ display: imageError ? 'none' : 'block' }}
        />
        {imageError && (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <p className="text-gray-500">Image unavailable</p>
          </div>
        )}
      </div>
      <div className="w-3/5 flex flex-col items-center justify-center bg-black/30 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-3">Look Up Your Purchase</h2>
            <p className="text-lg text-gray-200">Enter your invoice number to view your ticket details</p>
          </div>

          <form onSubmit={handleSearch} className="mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="Enter Invoice Number (e.g., JR-2024-ABC12)"
                className="w-full px-4 py-3 pl-10 pr-10 text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              {invoiceNumber && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD700] text-[#2F3E1F] py-3 px-4 rounded-lg text-base font-bold hover:bg-[#FFC700] transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {purchaseData && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm">
              <div className="space-y-4">
                <div className="border-b border-white/20 pb-3">
                  <h3 className="text-lg font-semibold mb-2">Purchase Details</h3>
                  <div className="grid grid-cols-2 gap-2">
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
                  <h4 className="text-md font-semibold mb-2">Your Ticket IDs</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {purchaseData.ticket_ids.map((ticketId, index) => (
                      <div key={ticketId} className="flex items-center bg-white/5 p-1 rounded">
                        <Ticket className="w-3 h-3 text-[#FFD700] mr-2" />
                        <span className="text-xs font-mono">{ticketId}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={generateInvoice}
                    className="flex items-center gap-2 bg-[#FFD700] text-[#2F3E1F] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FFC700] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

