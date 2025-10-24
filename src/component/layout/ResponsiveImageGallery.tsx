// src/components/ResponsiveImageGallery.tsx
'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';

interface ResponsiveImageGalleryProps {
    images: string[]; // array of image URLs, ideally length 2
    altTexts?: string[]; // optional alt texts
    borderColor?: string; // optional override for border color
    spacing?: number; // optional spacing between images in px
}

const ResponsiveImageGallery: React.FC<ResponsiveImageGalleryProps> = ({
    images,
    altTexts = ['', ''],
    borderColor,
    spacing = 0.5,
}) => {
    const theme = useTheme();


    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={spacing}
            justifyContent="center"
            alignItems="center"
            width="100%"
        >
            {images.map((src, idx) => (
                <Box
                    key={idx}
                    component="img"
                    src={src}
                    alt={altTexts[idx] || `Image ${idx + 1}`}
                    sx={{
                        width: { xs: '100%', sm: 'calc(50% - 1px)' }, // two images side by side with spacing
                        height: 'auto',
                        objectFit: 'cover',
                        boxShadow: theme.custom.shadows.medium,
                    }}
                />
            ))}
        </Box>
    );
};

export default ResponsiveImageGallery;
