"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid, Typography, Box } from "@mui/material";
import { ImageData } from "@/types/imageTypes";
import { cn } from "@/lib/cn";

interface ImageGridProps {
    images: ImageData[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    return (
        <Grid
            container
            spacing={2}
            className="w-full"
            justifyContent="center"
            alignItems="center"
        >
            {images.map((img, index) => {
                const imageContent = (
                    <Box
                        className={cn(
                            "relative w-full overflow-hidden rounded-2xl shadow-md bg-gray-100 cursor-pointer",
                            "transition-all duration-300 hover:shadow-xl",
                            // responsive heights
                            "h-70 md:h-80 lg:h-100 xl:h-130",
                        )}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt || img.title || `Image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 35vw"
                        />

                       
                    </Box>
                );

                return (
                    <Grid size={{xs:6 , md:3}} key={index}>
                        {img.link ? (
                            <Link href={img.link} target="_blank" rel="noopener noreferrer">
                                {imageContent}
                            </Link>
                        ) : (
                            imageContent
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ImageGrid;
