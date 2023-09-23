import { createContext, useState, useEffect } from "react";
import { getLS, setLS } from '../util/local-storage';

// =============================================
// =============================================
// =============================================
// =============================================

const getCartLS = () => getLS('cart');
const setCartLS = (cart) => setLS('cart', cart);

// =============================================
// =============================================
// =============================================
// =============================================

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
 });

 // =============================================
 // =============================================
 // =============================================
 // =============================================
 // =============================================

 function CartContextProvider ({ children }) {

  // ============================================

  const [open, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  // ============================================

  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    console.log('cart: ', cart);
  }, [cart]);

  // ============================================

  const getCart = () => {

    // load cart from local storage on page load
    const cart_ls = getCartLS();
    if (cart_ls) {
      setCart(cart_ls);
    }
  };

  // ============================================

  const addToCart = (product) => {
    console.log('cart-context: addToCart()');

    // Step 1:
    const prev_cart = getCartLS();
    // -if cart-ls not set then prev_cart === null  =>  idx===undefined

    // Step 2:
    // const idx = prev_cart?.findIndex(line => line?.variant.id === variant_id);
    const idx = prev_cart?.findIndex(line => line?.product.id === product.id);
    
    let new_cart;

    if (idx === undefined) {
      new_cart = [{ product, qty: 1 }];
    } else if (idx < 0) {
      // lo('addToCart() - new line item');
      new_cart = [...prev_cart, { product, qty: 1 }]; 
    } else {
      // ly('addToCart() - updating quantity');
      // new_cart = [...prev_cart]; // clone local cart state via deep copy.
      new_cart = structuredClone(prev_cart);
      new_cart[idx] = {...prev_cart[idx], qty: prev_cart[idx].qty + 1}; // update specific item's quantity in the cloned cart array.        
    }

    // Step 3:
    setCart(new_cart);
    setCartLS(new_cart);

    // Step 4: open cart
    openCart();
  };

  // ============================================

  const context = {
    cart,
    addToCart,
    open,
    closeCart,
    openCart,
  };

  // ============================================

  return (
    <CartContext.Provider value={context}>
      { children }
    </CartContext.Provider>
  );
 };

// =============================================

export { CartContext };
export default CartContextProvider;