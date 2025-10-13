import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define the interface for banner items
interface BannerItem {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

// Sample banner data (replace with your actual images and content)
const bannerItems: BannerItem[] = [
  {
    id: 1,
    imageUrl: '/images/banner1.jpg',
    altText: 'Summer Collection',
    title: 'Summer Vibes',
    subtitle: 'Discover the latest summer collection!',
    buttonText: 'Shop Now',
    buttonLink: '/shop/summer',
  },
  {
    id: 2,
    imageUrl: '/images/banner2.jpg',
    altText: 'Exclusive Deals',
    title: 'Exclusive Deals',
    subtitle: 'Up to 50% off on selected items!',
    buttonText: 'Explore Deals',
    buttonLink: '/deals',
  },
  {
    id: 3,
    imageUrl: '/images/banner3.jpg',
    altText: 'New Arrivals',
    title: 'New Arrivals',
    subtitle: 'Check out the freshest styles!',
    buttonText: 'See New',
    buttonLink: '/new-arrivals',
  },
];

const Banner: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 3,
        py: 4,
        px: { xs: 2, md: 4 },
        backgroundColor: theme.custom.colors.subtleBlue,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.custom.shadows.medium,
      }}
      className="w-full"
    >
      {bannerItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            position: 'relative',
            flex: isMobile ? '1 1 100%' : '1 1 33.33%',
            height: isMobile ? '300px' : '400px',
            overflow: 'hidden',
            borderRadius: theme.shape.borderRadius,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: theme.custom.shadows.heavy,
            },
          }}
          className="group"
        >
          {/* Image */}
          <Image
            src={item.imageUrl}
            alt={item.altText}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
              padding: { xs: 2, md: 4 },
              color: theme.palette.common.white,
            }}
          >
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                fontFamily: theme.custom.fonts.special,
                mb: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              sx={{ mb: 2, maxWidth: '80%' }}
            >
              {item.subtitle}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              href={item.buttonLink}
              sx={{
                px: 3,
                py: 1,
                fontFamily: theme.typography.button.fontFamily,
                backgroundColor: theme.custom.colors.highlight,
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {item.buttonText}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Banner;