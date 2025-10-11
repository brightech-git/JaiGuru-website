// src/components/DynamicBreadcrumbs.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import { useTheme } from "@mui/material/styles";

interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface DynamicBreadcrumbsProps {
    items?: BreadcrumbItem[]; // Optional override, otherwise use pathname
}

export default function DynamicBreadcrumbs({ items }: DynamicBreadcrumbsProps) {
    const theme = useTheme();
    const pathname = usePathname();

    // Generate breadcrumb items from pathname if not provided
    const pathSegments = pathname?.split("/").filter(Boolean) || [];
    const breadcrumbs: BreadcrumbItem[] =
        items ||
        [
            {
                label: "Home",
                href: "/",
                icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            ...pathSegments.map((segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/");
                const label = segment.charAt(0).toUpperCase() + segment.slice(1);
                const isLast = index === pathSegments.length - 1;
                return {
                    label,
                    href: isLast ? undefined : href,
                    icon: isLast ? <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> : undefined,
                };
            }),
        ];

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            {breadcrumbs.map((item, idx) =>
                item.href ? (
                    <Link
                        key={idx}
                        underline="hover"
                        color="inherit"
                        href={item.href}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: theme.custom.fontSize?.medium,
                            color: theme.custom.colors.mainHeader,
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ) : (
                    <Typography
                        key={idx}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: theme.custom.fontSize?.medium,
                            color: theme.custom.colors.highlight,
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}
