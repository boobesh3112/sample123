import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';

export interface CartItem {
  id: string;
  name: string;
  composition: string;
  mrp: number;
  category: string;
  quantity: number;
}

export interface User {
  name: string;
  mobile: string;
  loginTime: string;
}

export interface Order {
  billNumber: string;
  items: CartItem[];
  total: number;
  date: string;
  user: User;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('rikyPharmaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (name: string, mobile: string) => {
    const newUser: User = {
      name,
      mobile,
      loginTime: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('rikyPharmaUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentOrder(null);
    localStorage.removeItem('rikyPharmaUser');
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (order: Order) => {
    setCurrentOrder(order);
  };

  return (
    <Router>
      <div className="size-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} />
            }
          />
          <Route
            path="/home"
            element={
              user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/products"
            element={
              user ? (
                <ProductPage
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              ) : <Navigate to="/" replace />
            }
          />
          <Route
            path="/cart"
            element={
              user ? (
                <CartPage
                  cart={cart}
                  user={user}
                  onCreateOrder={createOrder}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                />
              ) : <Navigate to="/" replace />
            }
          />
          <Route
            path="/payment"
            element={
              user && currentOrder ? (
                <PaymentPage order={currentOrder} onClearCart={clearCart} />
              ) : <Navigate to="/" replace />
            }
          />
          <Route
            path="/success"
            element={
              user ? <SuccessPage order={currentOrder} /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}