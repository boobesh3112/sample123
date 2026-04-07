import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Info, Phone, Mail, MapPin, LogOut, Calendar, Clock } from 'lucide-react';
import { User } from '../App';
import { useState } from 'react';
import logoImg from 'figma:asset/88b17ec2d6d98f8de7b8880fcfaa15c63747386e.png';

interface HomePageProps {
  user: User;
  onLogout: () => void;
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-8"
        >
          {/* User Info */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
            <p className="text-gray-600 text-sm">Welcome back,</p>
            <p className="font-bold text-gray-800 text-lg">{user.name}</p>
            <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{currentDateTime.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{currentDateTime.toLocaleTimeString('en-IN')}</span>
            </div>
          </div>

          {/* Info & Logout */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Info className="w-6 h-6 text-blue-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoutClick}
              className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <LogOut className="w-6 h-6 text-red-600" />
            </motion.button>
          </div>
        </motion.div>

        {/* Company Info Modal */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Riky Pharma</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Riky Pharma is a pharmaceutical wholesaler and distributor located on Tamil Sangam Road,
                  Maninagaram, Madurai, Tamil Nadu (PIN: 625001).
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Products include tablets, capsules, gels, herbal products, and baby diapers.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                  <p className="text-gray-700"><strong>Established:</strong> October 16, 2017</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>9789555188</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>rikyfamily1@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                    <span>Tamil Sangam Road, Maninagaram, Madurai, TN - 625001</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <img src={logoImg} alt="Riky Pharma" className="h-32 w-auto object-contain" />
          </motion.div>

          {/* Welcome Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Riky Pharma
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-2"
          >
            Your Trusted Pharmaceutical Partner
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 mb-8"
          >
            Owned by B. Indumathi Ramkumar
          </motion.p>

          {/* 5-Star Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-2 mb-8"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.7 + star * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl flex items-center gap-3 mx-auto hover:from-blue-700 hover:to-green-700 transition-all"
          >
            <ShoppingBag className="w-6 h-6" />
            View Products
          </motion.button>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          >
            {[
              { title: 'Quality Products', desc: 'Certified medicines' },
              { title: 'Fast Delivery', desc: 'Quick & reliable' },
              { title: 'Trusted Service', desc: 'Since 2017' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 text-center"
              >
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}