import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CartContext } from './context/cart-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Clamp = ({ children, lines }) => (
  <Typography variant="body1" color="text.secondary"
    sx={{ // clamp text to 3 lines
      // display: 'block',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      lineHeight: '1.2em',  // Line height
      maxHeight: '3.6em',   // Max height = lineHeight * number of lines
      WebkitLineClamp: lines, // Number of lines to display
      textOverflow: 'ellipsis',
    }}
  >
    { children }
  </Typography>
);

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductCard({ product }) {

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        // image="/static/images/cards/contemplative-reptile.jpg"
        image={ product?.image_url ?? '/food.jpg' }
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          { product.title }
        </Typography>

        <Clamp lines={3}>
          { product.description }
        </Clamp>

      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined' color='info'>Learn More</Button>
        <Button size="small" variant='contained' color='info' onClick={() => {
          console.log('addToCart()');
          cart_ctx.addToCart(product);
        }}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}