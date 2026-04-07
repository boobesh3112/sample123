import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, FileText } from 'lucide-react';
import { CartItem, User, Order } from '../App';

interface CartPageProps {
  cart: CartItem[];
  user: User;
  onCreateOrder: (order: Order) => void;
  removeFromCart: (itemId: string) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export default function CartPage({ cart, user, onCreateOrder, removeFromCart, addToCart }: CartPageProps) {
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const generateBillNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RP${year}${month}${day}${random}`;
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) return;

    const order: Order = {
      billNumber: generateBillNumber(),
      items: cart,
      total: totalAmount,
      date: new Date().toISOString(),
      user: user
    };

    onCreateOrder(order);
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="size-full min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-blue-600" />
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Browse Products
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{totalItems} items in cart</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.composition}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                      <span className="text-green-600 font-bold text-lg">₹{item.mrp}</span>
                      <span className="text-gray-500 text-sm">per unit</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex md:flex-col items-center justify-between md:justify-center gap-4">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="bg-white text-blue-600 p-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="text-white font-bold text-lg px-3">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(item)}
                        className="bg-white text-green-600 p-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right md:text-center">
                      <p className="text-gray-600 text-sm">Total</p>
                      <p className="font-bold text-xl text-gray-800">₹{(item.mrp * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sticky top-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (Included)</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <span className="text-3xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Customer Details</h3>
                <p className="text-gray-700 text-sm">Name: {user.name}</p>
                <p className="text-gray-700 text-sm">Mobile: {user.mobile}</p>
                <p className="text-gray-700 text-sm">Date: {new Date().toLocaleDateString('en-IN')}</p>
              </div>

              {/* Proceed Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Proceed to Payment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/products')}
                className="w-full mt-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}