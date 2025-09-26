"use client";

import React, { useState,useCallback } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// Sample filter options - customize as needed
const categories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports"];
const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas"]; // Removed duplicates

interface FilterState {
    priceRange: [number, number];
    categories: string[];
    brands: string[];
}

interface FilterBarProps {
    onFilterChange?: (filters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Filter states
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Handlers
    const handlePriceChange = useCallback(
        (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
                setPriceRange(newValue as [number, number]);
                onFilterChange?.({
                    priceRange: newValue as [number, number],
                    categories: selectedCategories,
                    brands: selectedBrands,
                });
            }
        },
        [onFilterChange, selectedCategories, selectedBrands]
    );



    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) => {
            const newCategories = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category];
            onFilterChange?.({ priceRange, categories: newCategories, brands: selectedBrands });
            return newCategories;
        });
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) => {
            const newBrands = prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand];
            onFilterChange?.({ priceRange, categories: selectedCategories, brands: newBrands });
            return newBrands;
        });
    };

    const clearAll = () => {
        setPriceRange([0, 1000]);
        setSelectedCategories([]);
        setSelectedBrands([]);
        onFilterChange?.({ priceRange: [0, 1000], categories: [], brands: [] });
    };

    const removeFilter = (type: "category" | "brand" | "price", value?: string) => {
        if (type === "category" && value) {
            setSelectedCategories((prev) => {
                const newCategories = prev.filter((c) => c !== value);
                onFilterChange?.({ priceRange, categories: newCategories, brands: selectedBrands });
                return newCategories;
            });
        } else if (type === "brand" && value) {
            setSelectedBrands((prev) => {
                const newBrands = prev.filter((b) => b !== value);
                onFilterChange?.({ priceRange, categories: selectedCategories, brands: newBrands });
                return newBrands;
            });
        } else if (type === "price") {
            setPriceRange([0, 1000]);
            onFilterChange?.({ priceRange: [0, 1000], categories: selectedCategories, brands: selectedBrands });
        }
    };

    const hasFilters =
        selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const FilterContent = () => (
        <Box
            sx={{
                width: { xs: '100%', md: 250 }, // Fixed width for desktop (~25% viewport), wider for mobile drawer
                p: { xs: 1.5, md: 2 }, // Reduced padding for compactness
                bgcolor: theme.palette.background.paper,
                maxHeight: { xs: "80vh", md: "calc(100vh - 32px)" }, // Scrollable height
                overflowY: "auto", // Enable scrolling
                "&::-webkit-scrollbar": {
                    width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.custom.colors.subtleBlue,
                    borderRadius: "3px",
                },
            }}
        >
            {/* Selected Filters at Top */}
            {hasFilters && (
                <Box sx={{ mb: 1.5, display: "flex", flexWrap: "wrap", gap: 0.5, alignItems: "center" }}>
                    {selectedCategories.map((cat) => (
                        <Chip
                            key={`cat-${cat}`}
                            label={cat}
                            onDelete={() => removeFilter("category", cat)}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: theme.custom.fontSize?.small, m: 0.25 }}
                        />
                    ))}
                    {selectedBrands.map((brand) => (
                        <Chip
                            key={`brand-${brand}`}
                            label={brand}
                            onDelete={() => removeFilter("brand", brand)}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: theme.custom.fontSize?.small, m: 0.25 }}
                        />
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                        <Chip
                            label={`$${priceRange[0]} - $${priceRange[1]}`}
                            onDelete={() => removeFilter("price")}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: theme.custom.fontSize?.small, m: 0.25 }}
                        />
                    )}
                    <Button
                        size="small"
                        onClick={clearAll}
                        sx={{
                            ml: 0.5,
                            textTransform: "none",
                            fontSize: theme.custom.fontSize?.small,
                            color: theme.custom.colors.danger,
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
                    mb: 1,
                    fontWeight: 600,
                    fontFamily: theme.typography.h6.fontFamily,
                    fontSize: theme.custom.fontSize?.larger,
                    color: theme.palette.text.primary,
                    display:{ xs:"none", md:"block"},
                }}
            >
                Filters
            </Typography>

            {/* Price Filter */}
            <Accordion
                defaultExpanded
                sx={{
                    mb: 0.5,
                    boxShadow: theme.custom.shadows.light,
                    border: "none",
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.secondary }} />}
                    sx={{ py: 0.5 }}
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
                            color: theme.palette.text.primary,
                        }}
                    >
                        Price
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{  pb: 1 }}>
                    <Box>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        min={0}
                        max={1000}
                        step={100}
                        valueLabelDisplay="auto"// or "on" instead of "auto"
                    />

                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: theme.custom.fontSize?.small, color: theme.palette.text.secondary }}
                        >
                            ${priceRange[0]}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: theme.custom.fontSize?.small, color: theme.palette.text.secondary }}
                        >
                            ${priceRange[1]}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Category Filter */}
            <Accordion
                defaultExpanded
                sx={{
                    mb: 0.5,
                    boxShadow: theme.custom.shadows.light,
                    border: "none",
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.secondary }} />}
                    sx={{ py: 0.5 }}
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
                            color: theme.palette.text.primary,
                        }}
                    >
                        Categories
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 1, display: "flex", flexDirection: "column" }}>
                    {categories.map((category) => (
                        <FormControlLabel
                            key={category}
                            control={
                                <Checkbox
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                    size="small"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        "&.Mui-checked": { color: theme.palette.primary.main },
                                        p: 0.5,
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: theme.custom.fontSize?.small, color: theme.palette.text.primary }}
                                >
                                    {category}
                                </Typography>
                            }
                            sx={{ m: 0, mb: 0.25 }}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Brand Filter */}
            <Accordion
                defaultExpanded
                sx={{
                    boxShadow: theme.custom.shadows.light,
                    border: "none",
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.secondary }} />}
                    sx={{ py: 0.5 }}
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
                            color: theme.palette.text.primary,
                        }}
                    >
                        Brands
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 1, display: "flex", flexDirection: "column" }}>
                    {brands.map((brand) => (
                        <FormControlLabel
                            key={brand}
                            control={
                                <Checkbox
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                    size="small"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        "&.Mui-checked": { color: theme.palette.primary.main },
                                        p: 0.5,
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: theme.custom.fontSize?.small, color: theme.palette.text.primary }}
                                >
                                    {brand}
                                </Typography>
                            }
                            sx={{ m: 0, mb: 0.25 }}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );

    return (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
            {/* Mobile Filter Button */}
            {isMobile && (
                <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={toggleDrawer}
                    sx={{
                        mb: 1.5,
                        width: "100%",
                        textTransform: "none",
                        bgcolor: theme.custom.colors.mainHeader,
                        color: theme.palette.primary.contrastText,
                        fontFamily: theme.typography.button.fontFamily,
                        fontSize: theme.custom.fontSize?.medium,
                        borderRadius: theme.shape.borderRadius,
                        "&:hover": {
                            bgcolor: theme.palette.primary.dark,
                            transform: "translateY(-1px)",
                        },
                    }}
                >
                    Filters
                </Button>
            )}

            {/* Desktop Sidebar */}
            {!isMobile && (
                <Box
                    sx={{
                        width: { md: 250 }, // Fixed width for desktop, ~25% of viewport
                      
                        position: { md: "sticky" }, // Fixed position for larger screens
                        top: { md: theme.spacing(2) },
                        left: { md: theme.spacing(2) },
                        maxHeight: { md: "calc(100vh - 32px)" }, // Fit within viewport
                        bgcolor: theme.custom.colors.subtleBlue,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.custom.shadows.light,
                        overflowY: "hidden", // Prevent outer box from scrolling
                    }}
                >
                    <FilterContent />
                </Box>
            )}

            {/* Mobile Drawer */}
            <Drawer
                anchor="bottom"
                open={drawerOpen && isMobile}
                onClose={toggleDrawer}
                sx={{
                    "& .MuiDrawer-paper": {
                        borderTopLeftRadius: theme.shape.borderRadius ,
                        borderTopRightRadius: theme.shape.borderRadius ,
                        maxHeight: "70vh",
                        bgcolor: theme.custom.colors.subtleBlue,
                        overflowY: "auto",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, pb: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            fontFamily: theme.typography.h6.fontFamily,
                            fontSize: theme.custom.fontSize?.larger,
                            color: theme.palette.text.primary,
                           
                        }}
                    >
                        Filters
                    </Typography>
                    <IconButton onClick={toggleDrawer} sx={{ color: theme.palette.text.primary }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FilterContent />
            </Drawer>
        </Box>
    );
};

export default FilterBar;