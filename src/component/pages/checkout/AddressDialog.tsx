"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Divider,
    useTheme,
} from "@mui/material";
import AppButton from "@/component/ui/AppButton";

interface AddressDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (address: any) => void;
    isEditing: boolean;
    address?: any;
}

const AddressDialog: React.FC<AddressDialogProps> = ({
    open,
    onClose,
    onSave,
    isEditing,
    address,
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
                pincode: '',
                locality: '',
                address: address.address || '',
                city: '',
                state: '',
                gstNumber: '',
                companyName: '',
                alternativePhone: '',
                isDefault: address.isDefault || false,
                type: address.type || 'HOME'
            });
        } else {
            setFormData({
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
        }
    }, [isEditing, address]);

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleCheckboxChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.checked
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            <DialogTitle sx={{ fontWeight: 600 }}>
                {isEditing ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {/* Basic Information */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange('name')}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange('mobile')}
                            required
                        />
                    </Grid>

                    {/* Address Information */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            value={formData.pincode}
                            onChange={handleInputChange('pincode')}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Locality"
                            value={formData.locality}
                            onChange={handleInputChange('locality')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, }}>
                        <TextField
                            fullWidth
                            label="Address (Area and Street)"
                            multiline
                            rows={3}
                            value={formData.address}
                            onChange={handleInputChange('address')}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="City/District/Town"
                            value={formData.city}
                            onChange={handleInputChange('city')}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="State"
                            value={formData.state}
                            onChange={handleInputChange('state')}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12,}}>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Additional Information (Optional)
                        </Typography>
                    </Grid>

                    {/* Optional Fields */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="GST Number"
                            value={formData.gstNumber}
                            onChange={handleInputChange('gstNumber')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            value={formData.companyName}
                            onChange={handleInputChange('companyName')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 ,md:6}}>
                        <TextField
                            fullWidth
                            label="Alternative Phone"
                            value={formData.alternativePhone}
                            onChange={handleInputChange('alternativePhone')}
                        />
                    </Grid>

                    {/* Address Type and Default */}
                    <Grid size={{xs:12}}>
                        <Box sx={{ display: 'flex', gap: 4 }}>
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
                                    onChange={handleCheckboxChange('isDefault')}
                                />
                            }
                            label="Set as Default Address"
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 2 }}>
                <AppButton
                    label="Cancel"
                    appVariant="ghost"
                    onClick={onClose}
                    sx={{ borderRadius: 2 }}
                />
                
                <AppButton
                    label={isEditing ? 'Update Address' : 'Save and Deliver Here'}
                    appVariant="ghost"
                    onClick={handleSave}
                    sx={{
                        borderRadius: 2,
                        background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                    }}
                />
                   
              
            </DialogActions>
        </Dialog>
    );
};

export default AddressDialog;