'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
    Box,
    Drawer,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Slider,
    Checkbox,
    FormControlLabel,
    Chip,
    IconButton,
    useMediaQuery,
    useTheme,
    Skeleton,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store/store';
import { setFilters, resetFilters } from '@/redux/slice/filterSlice';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FilterParams } from '@/types/filter';

// Custom debounce implementation
const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
};

// Filter options
const FILTER_OPTIONS = {
    gender: ['Men', 'Women', 'Kids'],
    occasion: ['DAILY_WEAR', 'WEDDING', 'TRADITIONAL'],
    sizeName: ['2', '2.2', '2.4', '2.6', '2.8', '2.10'],
    colorAccent: ['Silver', 'Gold'],
    materialFinish: ['GOLDCOATED', 'SILVERCOATED'],
    sortBy: [
        { label: 'Most Relevant', value: 'relevance_DESC' },
        { label: 'Price: Low to High', value: 'price_ASC' },
        { label: 'Price: High to Low', value: 'price_DESC' },
    ],
};

const PRICE_RANGE = {
    min: 0,
    max: 100000,
    step: 100,
};

const FILTER_LABELS = {
    gender: 'Gender',
    occasion: 'Occasion',
    sizeName: 'Size',
    colorAccent: 'Color',
    materialFinish: 'Material Finish',
    sortBy: 'Sort By',
    priceRange: 'Price',
};

const FilterBar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { defaultMatches: true });
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.filters.filters);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync filters from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const urlFilters: Partial<FilterParams> = {};
        if (params.get('itemName')) urlFilters.itemName = params.get('itemName')!;
        if (params.get('gender')) urlFilters.gender = params.get('gender')!;
        if (params.get('occasion')) urlFilters.occasion = params.get('occasion')!;
        if (params.get('sizeName')) urlFilters.sizeName = params.get('sizeName')!;
        if (params.get('colorAccent')) urlFilters.colorAccent = params.get('colorAccent')!;
        if (params.get('materialFinish')) urlFilters.materialFinish = params.get('materialFinish')!;
        if (params.get('minGrandTotal')) urlFilters.minGrandTotal = params.get('minGrandTotal')!;
        if (params.get('maxGrandTotal')) urlFilters.maxGrandTotal = params.get('maxGrandTotal')!;
        if (params.get('sortBy')) urlFilters.sortBy = params.get('sortBy')!;
        if (params.get('sortDirection')) urlFilters.sortDirection = params.get('sortDirection')! as 'ASC' | 'DESC' | 'priceLowToHigh' | 'priceHighToLow';
        if (Object.keys(urlFilters).length > 0) {
            dispatch(setFilters(urlFilters));
        }
    }, [searchParams, dispatch]);

    // Update URL when filters change
    const updateQueryString = useCallback(
        (newFilters: Partial<FilterParams>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(newFilters).forEach(([key, value]) => {
                if (value && value !== '') {
                    params.set(key, value.toString());
                } else {
                    params.delete(key);
                }
            });
            params.delete('page'); // Reset page on filter change
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    // Map Redux filters to API filters
    const apiFilters: Partial<FilterParams> = {};
    if (filters.minGrandTotal && filters.minGrandTotal !== PRICE_RANGE.min.toString()) {
        apiFilters.minGrandTotal = filters.minGrandTotal;
    }
    if (filters.maxGrandTotal && filters.maxGrandTotal !== PRICE_RANGE.max.toString()) {
        apiFilters.maxGrandTotal = filters.maxGrandTotal;
    }
    if (filters.gender) apiFilters.gender = filters.gender;
    if (filters.occasion) apiFilters.occasion = filters.occasion;
    if (filters.sizeName) apiFilters.sizeName = filters.sizeName;
    if (filters.colorAccent) apiFilters.colorAccent = filters.colorAccent;
    if (filters.materialFinish) apiFilters.materialFinish = filters.materialFinish;
    if (filters.itemName) apiFilters.itemName = filters.itemName;
    if (filters.sortBy && filters.sortBy !== 'GRAND_TOTAL') apiFilters.sortBy = filters.sortBy;
    if (filters.sortDirection && filters.sortDirection !== 'ASC') apiFilters.sortDirection = filters.sortDirection;
    apiFilters.page = filters.page ?? 0;
    apiFilters.pageSize = filters.pageSize ?? 20;

    // Fetch filtered products
    const { data, isLoading, error } = useFilteredProducts(apiFilters as FilterParams);

    // Debug API response
    useEffect(() => {
        console.log('API Filters:', apiFilters);
        console.log('API Response Data:', data);
        console.log('Error:', error);
    }, [apiFilters, data, error]);

    // Handlers
    const debouncedPriceChange = useCallback(
        debounce((newValue: number[]) => {
            const newFilters = {
                minGrandTotal: newValue[0].toString(),
                maxGrandTotal: newValue[1].toString(),
            };
            dispatch(setFilters(newFilters));
            updateQueryString(newFilters);
        }, 300),
        [dispatch, updateQueryString]
    );

    const handlePriceChange = useCallback(
        (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
                debouncedPriceChange(newValue);
            }
        },
        [debouncedPriceChange]
    );

    const handleFilterChange = useCallback(
        (key: keyof FilterParams, value: string) => {
            const newFilters = { [key]: value === filters[key] ? '' : value };
            dispatch(setFilters(newFilters));
            updateQueryString(newFilters);
        },
        [dispatch, updateQueryString, filters]
    );

    const handleSortChange = useCallback(
        (value: string) => {
            const [sortBy, sortDirection] = value.split('_');
            const newFilters = { sortBy, sortDirection: (sortDirection || 'ASC') as 'ASC' | 'DESC' | 'priceLowToHigh' | 'priceHighToLow' };
            dispatch(setFilters(newFilters));
            updateQueryString(newFilters);
        },
        [dispatch, updateQueryString]
    );

    const clearAll = useCallback(() => {
        dispatch(resetFilters());
        router.push(pathname, { scroll: false }); // Clear URL params
    }, [dispatch, router, pathname]);

    const removeFilter = useCallback(
        (type: keyof FilterParams | 'price') => {
            const newFilters: Partial<FilterParams> = {};
            if (type === 'price') {
                newFilters.minGrandTotal = PRICE_RANGE.min.toString();
                newFilters.maxGrandTotal = PRICE_RANGE.max.toString();
            } else if (type === 'sortBy') {
                newFilters.sortBy = 'GRAND_TOTAL';
                newFilters.sortDirection = 'ASC';
            } else {
                newFilters[type] = undefined;
            }
            dispatch(setFilters(newFilters));
            updateQueryString(newFilters);
        },
        [dispatch, updateQueryString]
    );

    const hasFilters = useMemo(
        () =>
            filters.gender ||
            filters.occasion ||
            filters.sizeName ||
            filters.colorAccent ||
            filters.materialFinish ||
            filters.itemName ||
            filters.minGrandTotal !== PRICE_RANGE.min.toString() ||
            filters.maxGrandTotal !== PRICE_RANGE.max.toString() ||
            filters.sortBy !== 'GRAND_TOTAL' ||
            filters.sortDirection !== 'ASC',
        [filters]
    );

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const FilterContent = () => (
        <Box
            sx={{
                width: { xs: '100%', md: 250 },
                p: { xs: 1.5, md: 2 },
                bgcolor: theme.palette.background.paper,
                maxHeight: { xs: '80vh', md: 'calc(100vh - 32px)' },
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: theme.custom.colors.subtleBlue,
                    borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.custom.colors.mainHeader,
                    borderRadius: '3px',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                },
                transition: 'all 0.3s ease',
            }}
            aria-busy={isLoading}
        >
            {isLoading ? (
                <Box>
                    {/* Skeleton for active filters */}
                    {hasFilters && (
                        <Box sx={{ mb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {Array(3).fill(0).map((_, index) => (
                                <Skeleton key={index} variant="rounded" width={80} height={24} />
                            ))}
                            <Skeleton variant="rounded" width={60} height={24} sx={{ ml: 0.5 }} />
                        </Box>
                    )}
                    {/* Skeleton for filter title (desktop only) */}
                    {!isMobile && (
                        <Skeleton variant="text" width={100} height={32} sx={{ mb: 1 }} />
                    )}
                    {/* Skeleton for filter sections */}
                    {Object.keys(FILTER_LABELS).map((key) => (
                        <Box key={key} sx={{ mb: 0.5 }}>
                            <Skeleton variant="rectangular" height={48} sx={{ borderRadius: theme.shape.borderRadius }} />
                            <Box sx={{ pt: 0, pb: 1, pl: 2 }}>
                                {key === 'priceRange' ? (
                                    <>
                                        <Skeleton variant="rectangular" height={30} sx={{ mt: 1, mb: 1 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Skeleton variant="text" width={60} height={20} />
                                            <Skeleton variant="text" width={60} height={20} />
                                        </Box>
                                    </>
                                ) : key === 'sortBy' ? (
                                    <Skeleton variant="rectangular" height={40} />
                                ) : key === 'itemName' ? (
                                    <Skeleton variant="rectangular" height={40} />
                                ) : (
                                    Array(FILTER_OPTIONS[key === 'sizeName' ? 'sizeName' : key as keyof typeof FILTER_OPTIONS]?.length || 3)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Skeleton key={index} variant="text" width="80%" height={24} sx={{ mb: 0.25 }} />
                                        ))
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <>
                    {/* Selected Filters */}
                    {hasFilters && (
                        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
                            {filters.gender && (
                                <Chip
                                    label={filters.gender}
                                    onDelete={() => removeFilter('gender')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {filters.occasion && (
                                <Chip
                                    label={FILTER_OPTIONS.occasion.includes(filters.occasion) ? filters.occasion.replace('_', ' ') : filters.occasion}
                                    onDelete={() => removeFilter('occasion')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {filters.sizeName && (
                                <Chip
                                    label={filters.sizeName}
                                    onDelete={() => removeFilter('sizeName')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {filters.colorAccent && (
                                <Chip
                                    label={filters.colorAccent}
                                    onDelete={() => removeFilter('colorAccent')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {filters.materialFinish && (
                                <Chip
                                    label={filters.materialFinish}
                                    onDelete={() => removeFilter('materialFinish')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {filters.itemName && (
                                <Chip
                                    label={filters.itemName}
                                    onDelete={() => removeFilter('itemName')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {(filters.minGrandTotal !== PRICE_RANGE.min.toString() || filters.maxGrandTotal !== PRICE_RANGE.max.toString()) && (
                                <Chip
                                    label={`${formatCurrency(Number(filters.minGrandTotal) || PRICE_RANGE.min)} - ${formatCurrency(
                                        Number(filters.maxGrandTotal) || PRICE_RANGE.max
                                    )}`}
                                    onDelete={() => removeFilter('price')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            {(filters.sortBy !== 'GRAND_TOTAL' || filters.sortDirection !== 'ASC') && (
                                <Chip
                                    label={
                                        FILTER_OPTIONS.sortBy.find((opt) => opt.value === `${filters.sortBy}_${filters.sortDirection}`)?.label ||
                                        'Sort'
                                    }
                                    onDelete={() => removeFilter('sortBy')}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: theme.custom.fontSize?.small,
                                        m: 0.25,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.custom.colors.subtleBlue,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            )}
                            <Button
                                size="small"
                                onClick={clearAll}
                                sx={{
                                    ml: 0.5,
                                    textTransform: 'none',
                                    fontSize: theme.custom.fontSize?.small,
                                    color: theme.custom.colors.danger,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: theme.palette.error.dark,
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                            >
                                Clear All
                            </Button>
                        </Box>
                    )}

                    {/* Filter Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            fontFamily: theme.typography.h6.fontFamily,
                            fontSize: theme.custom.fontSize?.larger,
                            color: theme.custom.colors.mainHeader,
                            display: { xs: 'none', md: 'block' },
                            transition: 'color 0.3s ease',
                        }}
                    >
                        Filters
                    </Typography>

                    {/* Filter Sections */}
                    {Object.entries(FILTER_LABELS).map(([key, label]) => (
                        <Accordion
                            key={key}
                            defaultExpanded
                            sx={{
                                mb: 1,
                                boxShadow: theme.custom.shadows.light,
                                border: `1px solid ${theme.custom.colors.subtleBlue}`,
                                borderRadius: theme.shape.borderRadius,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.custom.shadows.medium,
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: theme.custom.colors.mainHeader }} />}
                                sx={{ py: 0.5 }}
                                aria-controls={`${key}-content`}
                                id={`${key}-header`}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 500,
                                        fontFamily: theme.typography.subtitle1.fontFamily,
                                        fontSize: {
                                            xs: theme.custom.fontSize?.small,
                                            sm: theme.custom.fontSize?.medium,
                                            md: theme.custom.fontSize?.larger,
                                        },
                                        color: theme.custom.colors.mainHeader,
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {label}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                                {key === 'priceRange' ? (
                                    <Box>
                                        <Slider
                                            value={[Number(filters.minGrandTotal) || PRICE_RANGE.min, Number(filters.maxGrandTotal) || PRICE_RANGE.max]}
                                            onChange={handlePriceChange}
                                            min={PRICE_RANGE.min}
                                            max={PRICE_RANGE.max}
                                            step={PRICE_RANGE.step}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => formatCurrency(value)}
                                            aria-labelledby="price-range-slider"
                                            sx={{
                                                color: theme.custom.colors.mainHeader,
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor: theme.custom.colors.mainHeader,
                                                    boxShadow: theme.custom.shadows.light,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                                        backgroundColor: theme.palette.primary.dark,
                                                        boxShadow: theme.custom.shadows.medium,
                                                        transform: 'scale(1.2)',
                                                    },
                                                },
                                                '& .MuiSlider-rail': {
                                                    backgroundColor: theme.custom.colors.subtleBlue,
                                                    opacity: 0.5,
                                                },
                                                '& .MuiSlider-track': {
                                                    backgroundColor: theme.custom.colors.mainHeader,
                                                    transition: 'all 0.3s ease',
                                                },
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: theme.custom.fontSize?.small,
                                                    color: theme.custom.colors.mainHeader,
                                                    transition: 'color 0.3s ease',
                                                }}
                                            >
                                                {formatCurrency(Number(filters.minGrandTotal) || PRICE_RANGE.min)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: theme.custom.fontSize?.small,
                                                    color: theme.custom.colors.mainHeader,
                                                    transition: 'color 0.3s ease',
                                                }}
                                            >
                                                {formatCurrency(Number(filters.maxGrandTotal) || PRICE_RANGE.max)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : key === 'sortBy' ? (
                                    <Select
                                        value={`${filters.sortBy}_${filters.sortDirection}`}
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        fullWidth
                                        size="small"
                                        aria-label="Sort by"
                                        sx={{
                                            fontSize: theme.custom.fontSize?.small,
                                            color: theme.custom.colors.mainHeader,
                                            borderRadius: theme.shape.borderRadius,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: theme.custom.colors.subtleBlue,
                                            },
                                        }}
                                    >
                                        {FILTER_OPTIONS.sortBy.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{
                                                    fontSize: theme.custom.fontSize?.small,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: theme.custom.colors.subtleBlue,
                                                    },
                                                }}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : key === 'itemName' ? (
                                    <TextField
                                        label="Search Items"
                                        value={filters.itemName || ''}
                                        onChange={(e) => handleFilterChange('itemName', e.target.value)}
                                        fullWidth
                                        size="small"
                                        aria-label="Search items"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                fontSize: theme.custom.fontSize?.small,
                                                borderRadius: theme.shape.borderRadius,
                                                transition: 'all 0.3s ease',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.custom.colors.mainHeader,
                                                fontSize: theme.custom.fontSize?.small,
                                            },
                                            '&:hover .MuiInputLabel-root': {
                                                color: theme.palette.primary.dark,
                                            },
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        {(FILTER_OPTIONS[key as keyof typeof FILTER_OPTIONS] as string[] | undefined)?.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={filters[key as keyof FilterParams] === option}
                                                        onChange={() => handleFilterChange(key as keyof FilterParams, option)}
                                                        size="small"
                                                        sx={{
                                                            color: theme.custom.colors.mainHeader,
                                                            '&.Mui-checked': { color: theme.palette.primary.main },
                                                            p: 0.5,
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                color: theme.palette.primary.dark,
                                                                transform: 'scale(1.1)',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: theme.custom.fontSize?.small,
                                                            color: theme.custom.colors.mainHeader,
                                                            transition: 'color 0.3s ease',
                                                        }}
                                                    >
                                                        {key === 'occasion' ? option.replace('_', ' ') : option}
                                                    </Typography>
                                                }
                                                sx={{
                                                    m: 0,
                                                    mb: 0.5,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: theme.custom.colors.subtleBlue,
                                                        borderRadius: theme.shape.borderRadius,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </>
            )}
        </Box>
    );

    return (
        <Box sx={{ p: { xs: 1, md: 2 } }} aria-busy={isLoading}>
            {isMobile && (
                <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        width: '100%',
                        textTransform: 'none',
                        bgcolor: theme.custom.colors.mainHeader,
                        color: theme.palette.primary.contrastText,
                        fontFamily: theme.typography.button.fontFamily,
                        fontSize: theme.custom.fontSize?.medium,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.custom.shadows.light,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                            boxShadow: theme.custom.shadows.medium,
                            transform: 'translateY(-1px)',
                        },
                    }}
                    aria-label="Open filters"
                    disabled={isLoading}
                >
                    Filters {hasFilters && <Chip label={Object.keys(apiFilters)?.length - 2} size="small" sx={{ ml: 1, bgcolor: theme.custom.colors.highlight }} />}
                </Button>
            )}
            {isLoading && isMobile && (
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="rectangular" height={48} width="100%" sx={{ borderRadius: theme.shape.borderRadius }} />
                </Box>
            )}
            {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                    Error: {error.message}
                </Typography>
            )}
            {!isMobile && (
                <Box
                    sx={{
                        width: { md: 250 },
                        position: { md: 'sticky' },
                        top: { md: theme.spacing(2) },
                        left: { md: theme.spacing(2) },
                        maxHeight: { md: 'calc(100vh - 32px)' },
                        bgcolor: theme.custom.colors.subtleBlue,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.custom.shadows.light,
                        overflowY: 'auto',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.custom.shadows.medium,
                        },
                    }}
                >
                    <FilterContent />
                </Box>
            )}
            <Drawer
                anchor="bottom"
                open={drawerOpen && isMobile}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                        maxHeight: '70vh',
                        bgcolor: theme.custom.colors.subtleBlue,
                        boxShadow: theme.custom.shadows.heavy,
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                        transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
                        opacity: drawerOpen ? 1 : 0,
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pb: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            fontFamily: theme.typography.h6.fontFamily,
                            fontSize: theme.custom.fontSize?.larger,
                            color: theme.custom.colors.mainHeader,
                            transition: 'color 0.3s ease',
                        }}
                    >
                        Filters
                    </Typography>
                    <IconButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                            color: theme.custom.colors.mainHeader,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: theme.palette.primary.dark,
                                transform: 'rotate(90deg)',
                            },
                        }}
                        aria-label="Close filters"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FilterContent />
            </Drawer>
        </Box>
    );
};

export default FilterBar;