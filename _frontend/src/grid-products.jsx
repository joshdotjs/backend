import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
// import ProductCard from './card-product';
import ProductCard from './card-product-2';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductsGrid({ products }) {

  // ============================================

  // ============================================

  return (
    <Box sx={{ flexGrow: 1 }}>
      JOSH
      <Grid container spacing={2}>

        { products.map((product) => {
          return (
            <React.Fragment key={product.uuid}>
              <Grid>
                <Item>
                  <ProductCard { ...{ product } } />
                </Item>
              </Grid>
            </React.Fragment>
          );
        })}

      </Grid>
    </Box>
  );
}