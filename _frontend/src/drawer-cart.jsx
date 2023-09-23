import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { CartContext } from './context/cart-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  // ============================================

  const { cart, open, openCart, closeCart } = React.useContext(CartContext);

  // ============================================

  return (
    <>
      <Button onClick={() => openCart()}>RIGHT</Button>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={() => closeCart()}
      >
        { cart.map(({ product, qty }) => {
          return (
            <div key={product.uuid}>
              {qty}
              {' '}
              {product.title}
            </div>
          );
        })}
      </Drawer>
    </>
  );
}