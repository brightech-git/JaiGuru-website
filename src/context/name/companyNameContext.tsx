"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Company } from "@/types/companyName";
import { getCompanyName } from "@/service/companyNameService";
import { getOurCompanyName } from "@/service/ourcompanyNameService";
interface CompanyContextType {
    company: Company | null;
    ourCompany: Company | null;
    reloadCompany: () => void;
}

const CompanyNameContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyNameProvider = ({ children }: { children: ReactNode }) => {
    const [company, setCompany] = useState<Company | null>(null);
    const [ourCompany, setOurCompany] = useState<Company | null>(null);

    const loadCompany = async () => {
        const data = await getCompanyName();
        const ourData = await getOurCompanyName();
        console.log(ourData, 'our company');
        setCompany(data);
        setOurCompany(ourData);
    };

    useEffect(() => {
        loadCompany();
    }, []);

    return (
        <CompanyNameContext.Provider value={{ company, ourCompany, reloadCompany: loadCompany }}>
            {children}
        </CompanyNameContext.Provider>
    );
};

// Custom hook for consuming context
export const useCompanyName = (): CompanyContextType => {
    const context = useContext(CompanyNameContext);
    if (!context) {
        throw new Error("useCompany must be used within a CompanyProvider");
    }
    return context;
};
