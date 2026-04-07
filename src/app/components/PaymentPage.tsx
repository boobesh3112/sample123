import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CreditCard, Banknote, Smartphone, Download, Printer, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Order } from '../App';
import logoImg from 'figma:asset/88b17ec2d6d98f8de7b8880fcfaa15c63747386e.png';

interface PaymentPageProps {
  order: Order;
  onClearCart: () => void;
}

type PaymentMethod = 'upi' | 'cash' | 'card';

export default function PaymentPage({ order, onClearCart }: PaymentPageProps) {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [showBill, setShowBill] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);

  const upiId = 'crramkumar1976-2@okicici';
  const upiString = `upi://pay?pa=${upiId}&pn=Riky Pharma&am=${order.total.toFixed(2)}&cu=INR`;

  const handlePaymentComplete = () => {
    onClearCart();
    navigate('/success');
  };

  const downloadBillAsPDF = async () => {
    if (!billRef.current) return;

    const canvas = await html2canvas(billRef.current, {
      scale: 2,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Riky_Pharma_Bill_${order.billNumber}.pdf`);
  };

  const printBill = () => {
    window.print();
  };

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment & Bill</h1>
          <p className="text-gray-600">Bill Number: {order.billNumber}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bill Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
              {/* Bill Content */}
              <div ref={billRef} className="p-8 bg-white">
                {/* Header */}
                <div className="text-center mb-6 border-b-2 border-gray-200 pb-6">
                  <img src={logoImg} alt="Riky Pharma" className="h-16 w-auto mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Riky Pharma</h2>
                  <p className="text-sm text-gray-600 mt-1">Owned by B. Indumathi Ramkumar</p>
                  <p className="text-sm text-gray-600">Tamil Sangam Road, Maninagaram</p>
                  <p className="text-sm text-gray-600">Madurai, Tamil Nadu - 625001</p>
                  <p className="text-sm text-gray-600">Ph: 9789555188 | Email: rikyfamily1@gmail.com</p>
                </div>

                {/* Bill Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-600">Bill Number:</p>
                    <p className="font-bold text-gray-800">{order.billNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date & Time:</p>
                    <p className="font-bold text-gray-800">
                      {new Date(order.date).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customer Name:</p>
                    <p className="font-bold text-gray-800">{order.user.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Mobile Number:</p>
                    <p className="font-bold text-gray-800">{order.user.mobile}</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                      <tr>
                        <th className="py-2 px-3 text-left">#</th>
                        <th className="py-2 px-3 text-left">Product</th>
                        <th className="py-2 px-3 text-center">Qty</th>
                        <th className="py-2 px-3 text-right">Price</th>
                        <th className="py-2 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-3 px-3">{index + 1}</td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-600">{item.composition}</div>
                          </td>
                          <td className="py-3 px-3 text-center font-semibold">{item.quantity}</td>
                          <td className="py-3 px-3 text-right">₹{item.mrp.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-semibold">
                            ₹{(item.mrp * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="border-t-2 border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (Included):</span>
                    <span className="font-semibold">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-300">
                    <span>Grand Total:</span>
                    <span className="text-green-600">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
                  <p>Thank you for choosing Riky Pharma!</p>
                  <p className="mt-1">For any queries, contact: 9789555188</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadBillAsPDF}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={printBill}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Print
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                {/* UPI */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment('upi')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedPayment === 'upi'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedPayment === 'upi' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${selectedPayment === 'upi' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">UPI Payment</p>
                    <p className="text-sm text-gray-600">Scan QR code to pay</p>
                  </div>
                </motion.button>

                {/* Cash */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment('cash')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedPayment === 'cash'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedPayment === 'cash' ? 'bg-green-600' : 'bg-gray-200'
                  }`}>
                    <Banknote className={`w-6 h-6 ${selectedPayment === 'cash' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">Cash Payment</p>
                    <p className="text-sm text-gray-600">Pay with cash</p>
                  </div>
                </motion.button>

                {/* Card */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedPayment === 'card'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedPayment === 'card' ? 'bg-purple-600' : 'bg-gray-200'
                  }`}>
                    <CreditCard className={`w-6 h-6 ${selectedPayment === 'card' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">Card Payment</p>
                    <p className="text-sm text-gray-600">Debit / Credit card</p>
                  </div>
                </motion.button>
              </div>

              {/* UPI QR Code */}
              {selectedPayment === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6"
                >
                  <h3 className="font-semibold text-gray-800 text-center mb-4">Scan QR Code to Pay</h3>
                  <div className="bg-white p-4 rounded-xl shadow-lg w-fit mx-auto">
                    <QRCodeSVG value={upiString} size={200} level="H" />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-4">UPI ID: {upiId}</p>
                  <p className="text-center text-2xl font-bold text-blue-600 mt-2">₹{order.total.toFixed(2)}</p>
                </motion.div>
              )}

              {/* Cash Payment Info */}
              {selectedPayment === 'cash' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 text-center"
                >
                  <Banknote className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Cash Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">Amount to be paid in cash</p>
                  <p className="text-3xl font-bold text-green-600">₹{order.total.toFixed(2)}</p>
                </motion.div>
              )}

              {/* Card Payment Info */}
              {selectedPayment === 'card' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 text-center"
                >
                  <CreditCard className="w-16 h-16 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Card Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">Swipe or insert your card</p>
                  <p className="text-3xl font-bold text-purple-600">₹{order.total.toFixed(2)}</p>
                </motion.div>
              )}

              {/* Complete Payment Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePaymentComplete}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Confirm Payment
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}