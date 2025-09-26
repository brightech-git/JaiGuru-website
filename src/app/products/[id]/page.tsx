"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Rating,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Collapse,
  Stepper,
  Step,
  StepLabel,
  TableHead,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  ArrowBack,
  CheckCircle,
  ExpandLess,
  ExpandMore,
  Diamond,
  Inventory,
  
} from "@mui/icons-material";

import AppButton from "@/component/ui/AppButton";
import { productData } from "@/data/productData";

export default function ProductDetailsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [showMetalDetails, setShowMetalDetails] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const jewelleryData = {
    sku: "JWL-50-GLD",
    metalType: "18K Yellow Gold",
    gemstone: "Diamond",
    weight: "2.5 grams",
    purity: "75% (18K)",
    certification: "Hallmark Certified",
    delivery: "2-3 business days",
    returnPolicy: "30-day return policy",
  };

  const priceBreakupData = [
    { component: "Silver", value: "¥1,747", discount: "¥262", finalValue: "¥1,485" },
    { component: "Total", value: "¥1,747", discount: "-", finalValue: "¥1,485" },
    { component: "GST(3%)", value: "¥52", discount: "", finalValue: "¥45" },
    { component: "Grand Total", value: "¥1,799", discount: "", finalValue: "¥1,529" },
  ];

  const featuresWithIcons = [
    { icon: <LocalShipping />, text: "Free shipping on orders over ¥1,000" },
    { icon: <Inventory />, text: "In stock - Ready to ship" },
    { icon: <Security />, text: "Lifetime warranty included" },
    { icon: <Diamond />, text: "Certified genuine diamonds" },
  ];

  const metalDetails = `Add subtle grace to your outfit with these enticing drop earrings crafted in 18 Karat Yellow Gold with a glossy finish. Cast a spell of enchantment on everyone with these stunning petite danglers. It's the perfect addition to your ethnic attire.`;

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 1, sm: 2 } }}>
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Back Button */}
        <Box sx={{ mb: 2 }}>
          <AppButton
            label="Back to Products"
            appVariant="ghost"
            fontVariant="default"
            startIcon={<ArrowBack />}
            sx={{ mb: 2 }}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Left: Product Images (Sticky) */}
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 5 }}
            sx={{
              position: { md: "sticky" }, // Sticky on medium and larger screens
              top: { md: 16 }, // Stick to top with some offset
              alignSelf: { md: "flex-start" }, // Align to start for sticky behavior
              zIndex: 10, // Ensure it stays above other content
              mb: { xs: 2, md: 0 }, // Margin for mobile
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center",sm: "center", md: "flex-end" ,lg:"flex-end"},
                flexDirection: "column",
                alignItems: { xs: "center",sm:"center", md: "center",lg:'center' },
              }}
            >
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 0,
                  boxShadow: theme.custom.shadows.medium,
                  position: "relative",
                  backgroundColor: "transparent",
                  display: "inline-block",
                }}
              >
                <CardMedia
                  component="img"
                  image={selectedImage}
                  alt={productData.name}
                  sx={{
                    width: { xs: 300, sm: 320, md: 400, lg: 450, xl: 450 },
                    height: { xs: 300, sm: 320, md: 400, lg: 450, xl: 450 },
                    objectFit: "cover",
                    display: "block",
                    aspectRatio: "1 / 1",
                  }}
                />
              </Card>
              {/* Thumbnail Images */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                }}
              >
                {productData.images.map((img, i) => (
                  <Card
                    key={i}
                    sx={{
                      width: { xs: 45, sm: 50, md: 55, lg: 60, xl: 70 },
                      height: { xs: 45, sm: 50, md: 55, lg: 60, xl: 70 },
                      cursor: "pointer",
                      border: selectedImage === img ? 2 : 1,
                      borderColor: selectedImage === img ? theme.custom.colors.imageBorder : 'grey.300',
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        borderColor: "primary.light",
                      },
                    }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Thumbnail ${i + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right: Product Info */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7 }}>
            <Box sx={{ pl: { md: 2 } }}>
              {/* Category and Rating */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
                <Chip
                  label={productData.category}
                  color="primary"
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly size={isMobile ? "small" : "medium"} />
                  <Typography variant="body2" color="text.secondary">
                    (128 reviews)
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: "flex", gap: 2,mb:1 }}>
              {/* Product Name */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  
                  fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" },
                  lineHeight: 1.2,
                }}
              >
                {productData.name}
              </Typography>
                {isMobile && (<IconButton sx={{
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 2,
                    flexShrink: 0,
                    mt:-1.5
                  }}

                >
                  <Share />
                </IconButton>)}
              </Box>
              {/* Price */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ₹{productData.discountPrice}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    fontFamily:theme.typography.fontFamily,
                    fontSize:theme.custom.fontSize?.medium
                  }}
                >
                  ₹{productData.price}
                </Typography>
                <Chip
                  label={`${Math.round((1 - productData.discountPrice / productData.price) * 100)}% OFF`}
                  color="success"
                  size="small"
                />
              </Box>

              {/* Description */}
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {productData.description}
              </Typography>

              <Divider sx={{ my: 3 }} />
              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  mb: 3,
                }}
              >
                <AppButton
                  label="Add to Cart"
                  appVariant="primary"
                  fontVariant="default"
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                />
                <AppButton
                  label="Buy Now"
                  appVariant="secondary"
                  fontVariant="default"
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                />
                {!isMobile && (<IconButton
                  sx={{
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                >
                  <Share />
                </IconButton>)}
              
              </Box>
              {/* Features */}
              <Typography variant="h5" sx={{ mb: 2 }}>
                Key Features
              </Typography>
              <List dense sx={{ mb: 3 }}>
                {productData.features.map((f, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>

              {/* Additional Features with Icons */}
              <Box sx={{ mb: 4 }}>
                {featuresWithIcons.map((feature, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                      {feature.icon}
                    </ListItemIcon>
                    <Typography variant="body2">{feature.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Additional Sections */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Product Details
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 4 }}>
            Additional detailed description about the product, specifications, care instructions, and other relevant information would be displayed here.
          </Typography>
        </Box>

        {/* Price Breakup Section (Enhanced Accordion) */}
        <Box
          sx={{
            mb: 2,
            p: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.custom.shadows.light,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              transition: "background-color 0.2s",
             
            }}
            onClick={() => setShowPriceBreakup(!showPriceBreakup)}
          >
            <Typography variant="h6" fontWeight={600}>
              Price Breakup
            </Typography>
            <Typography variant="body1" >
              View Details {showPriceBreakup ? <ExpandLess /> : <ExpandMore />}
            </Typography>
           
          </Box>

          <Collapse in={showPriceBreakup} timeout="auto">
            <TableContainer component={Paper} variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
              <Table sx={{ minWidth: 300 }} size={isSmallMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Discount</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Final Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {priceBreakupData.map((row, index) => (
                    <TableRow
                      key={row.component}
                      sx={{
                        backgroundColor:
                          index === priceBreakupData.length - 1
                            ? theme.palette.primary.light + "15"
                            : "inherit",
                        "&:last-child td": { fontWeight: "bold" },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.component}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">{row.discount}</TableCell>
                      <TableCell align="right">{row.finalValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Box>

        {/* Metal Details Section (Enhanced Accordion) */}
        <Box
          sx={{
            mb: 4,
            p: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.custom.shadows.light,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              transition: "background-color 0.2s",
              
            }}
            onClick={() => setShowMetalDetails(!showMetalDetails)}
          >
            <Typography variant="h6" fontWeight={600}>
              Metal Details
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              View Details  {showMetalDetails ? <ExpandLess /> : <ExpandMore />}
            </Typography>
           
          </Box>

          <Collapse in={showMetalDetails} timeout="auto">
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                GENERAL DETAILS
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.secondary", mb: 3 }}>
                {metalDetails}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Metal Purity
                  </Typography>
                  <Typography variant="body2">{jewelleryData.purity}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Certification
                  </Typography>
                  <Typography variant="body2">{jewelleryData.certification}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    SKU ID
                  </Typography>
                  <Typography variant="body2">{jewelleryData.sku}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Weight
                  </Typography>
                  <Typography variant="body2">{jewelleryData.weight}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
}