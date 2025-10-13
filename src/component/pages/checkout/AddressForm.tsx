"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Divider,
    useTheme,
} from "@mui/material";
import AppButton from "@/component/ui/AppButton";

interface AddressFormProps {
    address?: any;
    onSave: (address: any) => void;
    onCancel: () => void;
    isEditing: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
    address,
    onSave,
    onCancel,
    isEditing,
}) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        gstNumber: '',
        companyName: '',
        alternativePhone: '',
        isDefault: false,
        type: 'HOME'
    });

    useEffect(() => {
        if (isEditing && address) {
            setFormData({
                name: address.name || '',
                mobile: address.mobile || '',
                pincode: address.pincode || '',
                locality: address.locality || '',
                address: address.address || '',
                city: address.city || '',
                state: address.state || '',
                gstNumber: address.gstNumber || '',
                companyName: address.companyName || '',
                alternativePhone: address.alternativePhone || '',
                isDefault: address.isDefault || false,
                type: address.type || 'HOME'
            });
        }
    }, [isEditing, address]);

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {isEditing ? 'Edit Address' : 'Add New Address'}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange('mobile')}
                        required
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange('pincode')}
                        required
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Locality"
                        value={formData.locality}
                        onChange={handleInputChange('locality')}
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12}}>
                    <TextField
                        fullWidth
                        label="Address (Area and Street)"
                        multiline
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        required
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="City/District/Town"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        required
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="State"
                        value={formData.state}
                        onChange={handleInputChange('state')}
                        required
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Additional Information (Optional)
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="GST Number"
                        value={formData.gstNumber}
                        onChange={handleInputChange('gstNumber')}
                        size="small"
                    />
                </Grid>
                <Grid size={{xs:12 ,md:6}}>
                    <TextField
                        fullWidth
                        label="Company Name"
                        value={formData.companyName}
                        onChange={handleInputChange('companyName')}
                        size="small"
                    />
                </Grid>

                <Grid size={{xs:12 ,md:6}}>
                    <TextField
                        fullWidth
                        label="Alternative Phone"
                        value={formData.alternativePhone}
                        onChange={handleInputChange('alternativePhone')}
                        size="small"
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.type === 'HOME'}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        type: e.target.checked ? 'HOME' : 'WORK'
                                    }))}
                                />
                            }
                            label="Home Address"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.type === 'WORK'}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        type: e.target.checked ? 'WORK' : 'HOME'
                                    }))}
                                />
                            }
                            label="Work Address"
                        />
                    </Box>
                </Grid>

                <Grid size={{xs:12}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isDefault}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    isDefault: e.target.checked
                                }))}
                            />
                        }
                        label="Set as Default Address"
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <AppButton
                            label="Cancel"
                            appVariant="ghost"
                            onClick={onCancel}
                            fullWidth
                        />
                        <AppButton
                            label={isEditing ? 'Update Address' : 'Save and Deliver Here'}
                            onClick={handleSave}
                            fullWidth
                            sx={{
                                background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddressForm;