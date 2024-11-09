import { jsPDF } from 'jspdf';

interface PurchaseData {
  invoice_number: string;
  name: string;
  tickets_count: number;
  ticket_ids: string[];
  total_amount: number;
  created_at: string;
}

export const generatePDF = (purchaseData: PurchaseData) => {
  const doc = new jsPDF();
  
  // Add logo image from public directory
  doc.addImage('/jamrock-logo.png', 'PNG', 20, 20, 50, 50);
  
  // Set font styles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  
  // Add header
  doc.text("Tesla Model Y Raffle", 105, 40, { align: "center" });
  doc.setFontSize(16);
  doc.text("Official Invoice", 105, 50, { align: "center" });
  
  // Add divider line
  doc.setDrawColor(128);
  doc.line(20, 80, 190, 80);
  
  // Reset font for content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  
  // Add invoice details
  doc.text(`Invoice #${purchaseData.invoice_number}`, 20, 100);
  doc.text(`Date: ${new Date(purchaseData.created_at).toLocaleDateString()}`, 20, 110);
  
  // Add customer details
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details:", 20, 130);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${purchaseData.name}`, 20, 140);
  
  // Add purchase details
  doc.setFont("helvetica", "bold");
  doc.text("Purchase Details:", 20, 160);
  doc.setFont("helvetica", "normal");
  doc.text(`Number of Tickets: ${purchaseData.tickets_count}`, 20, 170);
  doc.text(`Total Amount: $${purchaseData.total_amount}`, 20, 180);
  
  // Add ticket IDs
  doc.setFont("helvetica", "bold");
  doc.text("Ticket IDs:", 20, 200);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  let yPos = 210;
  const ticketsPerPage = 25;
  purchaseData.ticket_ids.forEach((ticketId, index) => {
    if (index > 0 && index % ticketsPerPage === 0) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`${index + 1}. ${ticketId}`, 20, yPos);
    yPos += 10;
  });
  
  // Add footer
  doc.setFontSize(10);
  const footerText = [
    "Thank you for participating in our raffle!",
    "Your tickets have been successfully registered.",
    "",
    "JamRock Rental",
    "123 Dream Drive",
    "support@jamrockrental.com",
    "(555) 123-4567"
  ];
  
  // Check if we need a new page for footer
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }
  
  yPos += 20;
  footerText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 10;
  });
  
  // Save the PDF
  doc.save(`jamrock-raffle-invoice-${purchaseData.invoice_number}.pdf`);
};