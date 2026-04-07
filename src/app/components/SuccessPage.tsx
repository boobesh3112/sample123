import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Order } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SuccessPageProps {
  order: Order | null;
}

export default function SuccessPage({ order }: SuccessPageProps) {
  const navigate = useNavigate();

  return (
    <div className="size-full min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-green-400 rounded-full opacity-50"
            />
            <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              <CheckCircle className="w-20 h-20 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your order has been placed successfully
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="my-8"
          >
            <ImageWithFallback
              src="figma:asset/88b17ec2d6d98f8de7b8880fcfaa15c63747386e.png"
              alt="Riky Pharma"
              className="h-20 w-auto mx-auto"
            />
          </motion.div>

          {/* Order Details */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-8"
            >
              <h2 className="font-semibold text-gray-800 mb-4 text-lg">Order Summary</h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bill Number:</span>
                  <span className="font-bold text-gray-800">{order.billNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(order.date).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold text-gray-800">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-semibold text-lg">Total Amount:</span>
                  <span className="font-bold text-green-600 text-2xl">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <p className="text-gray-700 leading-relaxed mb-4">
              We appreciate your trust in <strong>Riky Pharma</strong>. Your health is our priority,
              and we're committed to providing you with the best pharmaceutical products and service.
            </p>
            <p className="text-gray-600 text-sm">
              For any queries, feel free to contact us at <strong>9789555188</strong>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </motion.button>
          </motion.div>

          {/* Rating Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-600 text-sm mb-2">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-3xl"
                >
                  ⭐
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}