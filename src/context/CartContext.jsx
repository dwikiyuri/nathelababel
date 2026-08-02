import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('nuthelabel_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('nuthelabel_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('nuthelabel_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nuthelabel_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (item) => {
    // item: { productId, productName, color, colorId, size, quantity, price, image, slug }
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        i => i.productId === item.productId && i.colorId === item.colorId && i.size === item.size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      } else {
        return [...prevCart, { ...item, id: `${item.productId}-${item.colorId}-${item.size}-${Date.now()}` }];
      }
    });

    showToast(`Added ${item.productName} (${item.color}) to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Free shipping threshold
  const freeShippingThreshold = 750000;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prevWishlist.filter(p => p.id !== product.id);
      } else {
        showToast(`Added ${product.name} to Wishlist`);
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      cartSubtotal,
      cartTotalItems,
      freeShippingThreshold,
      amountForFreeShipping,
      shippingProgress,
      wishlist,
      toggleWishlist,
      isInWishlist,
      toastMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
