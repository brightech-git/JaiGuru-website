"use client";

import AppButton from "@/component/ui/AppButton";
import { Container, Typography, Button, Card, CardContent, TextField, AppBar, Toolbar } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
export default function HomePage() {
  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My E-Commerce
          </Typography>
          <Button color="secondary" variant="contained">Sign In</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 6 }}>
        <Typography variant="h1" gutterBottom>
          Welcome to Our Store
        </Typography>
        <Typography variant="body1" gutterBottom>
          Explore our latest collection with premium quality products.
        </Typography>

        <Button variant="contained" color="primary" size="large" >
          Shop Now
        </Button>
        <AppButton label="Buy Now" variant="secondary" color="primary" size="small" />
        <AppButton label="Shop Now" variant="contained" color="primary" size="large" />
        <AppButton label="Add to Cart" variant="contained" color="secondary" />
        <AppButton label="Details" variant="outlined" color="primary" />
        <AppButton
          label="View Details"
          variant="outlined"
          startIcon={<InfoOutlined />}
          sx={{
            mt:0,
            borderRadius:0,
          }}
        />

        <Card sx={{ mt: 4, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Featured Product
            </Typography>
            <Typography variant="body2" gutterBottom>
              High-quality product designed for modern lifestyle.
            </Typography>
            <TextField fullWidth label="Enter Email for Updates" variant="outlined" />
            <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }}>
              Subscribe
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
