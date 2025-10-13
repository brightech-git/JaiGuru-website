'use client';

import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import FilterBar from '@/component/layout/FilterSection';
import ProductGrid from '@/component/layout/ProductGrid';
import BreadcrumbBanner from '@/component/layout/BreadcrumbBanner';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getProductImages } from '@/lib/utils';

function ProductsContent() {
    const filters = useSelector((state: RootState) => state.filters.filters);

    // ✅ Start with 10 per page
    const [pageSize, setPageSize] = useState(10);

    // Intersection observer ref
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Build API filters dynamically
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
        page: 0,
        pageSize, // 👈 controlled dynamically
    };

    const { data, isLoading, error, isFetching } = useFilteredProducts(apiFilters);

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

    // ✅ Infinite scroll — only load more if `hasMore` is true
    // ✅ Infinite scroll — delayed and stops before footer
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            const footer = document.querySelector('footer'); // 👈 detect footer if exists

            // Stop loading if already fetching, no more data, or footer is visible
            if (isFetching || !data?.hasMore || (footer && footer.getBoundingClientRect().top < window.innerHeight)) {
                return;
            }

            if (target.isIntersecting) {
                // Add a small delay for smoother UX
                setTimeout(() => {
                    setPageSize((prev) => prev + 10);
                }, 800); // 👈 0.8 sec delay before adding more products
            }
        },
        [isFetching, data?.hasMore]
    );

    useEffect(() => {
        const options = { root: null, rootMargin: '200px', threshold: 0 };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    useEffect(() => {
        const option = { root: null, rootMargin: '200px', threshold: 0 };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

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
                {/* Filter Section */}
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
                        <>
                            <ProductGrid products={products} />
                            {/* 👇 Infinite scroll trigger */}
                            {data?.hasMore && <div ref={loadMoreRef} style={{ height: 40 }} />}
                            {isFetching && (
                                <Typography sx={{ textAlign: 'center', mt: 2 }}>Loading more products...</Typography>
                            )}
                            {!data?.hasMore && (
                                <Typography sx={{ textAlign: 'center', mt: 3, color: 'gray' }}>
                                    All products loaded.
                                </Typography>
                            )}
                        </>
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
