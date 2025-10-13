import { Company } from "@/types/companyName";
import PublicUrl from "@/api/publicUrl";

// Hardcoded fallback data
const HARDCODED_COMPANY: Company = {
    name: "VRA jewels",
    logo: "/images/11.webp", // put the image in public/images/
};

export const getCompanyName = async (): Promise<Company> => {
    try {
        // Example API call (currently no API)
        // const response = await PublicUrl.get("/company");
        // return response.data;

        // For now, return hardcoded data
        return HARDCODED_COMPANY;
    } catch (error) {
        console.error("Error fetching company:", error);
        return HARDCODED_COMPANY; // fallback
    }
};
