// app/user/products/page.js
'use client';

import React,{Suspense} from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import FilterBar from '@/component/layout/FilterSection';
import ProductGrid from '@/component/layout/ProductGrid';
import BreadcrumbBanner from '@/component/layout/BreadcrumbBanner';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getProductImages } from '@/lib/utils';

function ProductsContent() {
    // Get filters from Redux store (same as FilterBar)
    const filters = useSelector((state: RootState) => state.filters.filters);

    // Map Redux filters to API filters (same as FilterBar)
    const apiFilters = {
        minGrandTotal: filters.minGrandTotal && filters.minGrandTotal !== '0' ? filters.minGrandTotal : undefined,
        maxGrandTotal: filters.maxGrandTotal && filters.maxGrandTotal !== '100000' ? filters.maxGrandTotal : undefined,
        gender: filters.gender || undefined,
        occasion: filters.occasion || undefined,
        sizeName: filters.sizeName || undefined,
        colorAccent: filters.colorAccent || undefined,
        materialFinish: filters.materialFinish || undefined,
        itemName: filters.itemName || undefined,
        sortBy: filters.sortBy && filters.sortBy !== 'GRAND_TOTAL' ? filters.sortBy : undefined,
        sortDirection: filters.sortDirection && filters.sortDirection !== 'ASC' ? filters.sortDirection : undefined,
        page: filters.page ?? 0,
        pageSize: filters.pageSize ?? 20,
    };

    // Fetch products using the same hook as FilterBar
    const { data, isLoading, error } = useFilteredProducts(apiFilters);
    console.log(data, 'filter data');

    // Map API data to ProductGrid format
    const products =
        (data?.data ?? []).map((product: any) => ({
            name: product.SUBITEMNAME || product.ITEMNAME || 'Unnamed Product',
            price:
                Number(product.GrandTotal) && Number(product.GrandTotal) !== 0
                    ? Number(product.GrandTotal)
                    : Number(product.RATES) || 0,
            images: getProductImages(product.ImagePath),
            backgroundColor: '#ffffff',
            link: `/user/products/${product.TAGKEY}`,
        }));

    return (
        <>
            <BreadcrumbBanner
                title="Jewelry"
                image="/images/22.webp"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Jewelry', href: '/jewelry' },
                    { label: 'Rings' },
                ]}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 0, md: 1 },
                    mt: 1,
                    px: 1,
                }}
            >
                {/* Filter */}
                <Box
                    sx={{
                        flex: { xs: '0 0 auto', md: '0 0 240px' },
                        width: { xs: '100%', md: 'auto' },
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    <Suspense fallback={<Skeleton variant="rectangular" height={400} width="100%" />}>
                        <FilterBar />
                    </Suspense>
                </Box>

                {/* Product Grid */}
                <Box sx={{ flex: 1 }}>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: 2,
                                p: 2,
                            }}
                        >
                            {Array(6)
                                .fill(0)
                                .map((_, index) => (
                                    <Box key={index}>
                                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
                                        <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
                                        <Skeleton variant="text" width="40%" height={20} />
                                    </Box>
                                ))}
                        </Box>
                    ) : error ? (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            Error: {error.message}
                        </Typography>
                    ) : products.length === 0 ? (
                        <Typography sx={{ mt: 2, textAlign: 'center' }}>
                            No products found matching the selected filters.
                        </Typography>
                    ) : (
                        <ProductGrid products={products} />
                    )}
                </Box>
            </Box>
        </>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<Skeleton variant="rectangular" height="100vh" />}>
            <ProductsContent />
        </Suspense>
    );
}