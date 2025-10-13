"use client";

import React, { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { footerData } from "@/data/footerData";
import Image from "next/image";
import Link from "next/link";
import { useCompanyName } from "@/context/name/companyNameContext";

const Footer: React.FC = () => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [email, setEmail] = useState("");
    const companyName = useCompanyName();
    console.log(companyName, "companyName");

    const companyname= companyName?.company?.name || 'VRA jewels';
    const companylogo = companyName?.company?.logo || "/images/2.webp";

    const ourcompanyname = companyName?.ourCompany?.name || 'VRA jewels';
    const ourcompanylogo = companyName?.ourCompany?.logo || "/images/2.webp";



    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter subscription:", email);
        setEmail("");
    };

    const paymentIcons = [
        { name: "Visa", icon: "/icons/visa.svg" },
        { name: "Mastercard", icon: "/icons/mastercard.svg" },
        { name: "PayPal", icon: "/icons/paypal.svg" },
        { name: "Apple Pay", icon: "/icons/apple-pay.svg" },
    ];

    return (
        <footer className="bg-[#021136] text-white">
            {/* Desktop Footer */}
            <div className="hidden md:block ">
                <div className=" max-w-7xl mx-auto  py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Column 1 - Company Info */}
                        <div className="ml-2">
                            <div className="mb-4">
                                {/* Logo placeholder - uncomment when ready */}
                                {/* <Image
                                    src={footerData.company.logo}
                                    alt="Logo"
                                    width={140}
                                    height={45}
                                    className="brightness-110"
                                /> */}
                                <h3 className="text-2xl font-bold text-white">{companyname}</h3>
                            </div>
                            <p className="text-sm text-gray-200 mb-3 leading-relaxed">
                                © {new Date().getFullYear()} {companyname}. All rights reserved.
                            </p>
                            

                            {/* Social Icons */}
                            <div className="flex gap-3">
                                {footerData.company.social.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        aria-label={social.name}
                                    >
                                        {/* Icon placeholder */}
                                        <div className="w-5 h-5 bg-white/50 rounded-full" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2 - Useful Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-white">Useful Links</h3>
                            <div className="space-y-3">
                                {footerData.links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.link}
                                        className="block text-sm text-gray-200 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3 - Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
                            {/* <div className="space-y-4">
                                <div className="flex gap-3">
                                    <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-200 font-medium mb-1">Tiruvallur Showroom</p>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            712, TNHB, Kakkalur Bypass Road, Tiruvallur - 602001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-200 font-medium mb-1">Tiruttani Showroom</p>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            321/322 MaPoSi Salai, Tiruttani
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            +91-9600972227<br />
                                            +91-9884808428<br />
                                            +91-9169161469
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                                    <a
                                        href="mailto:info@jaigurujewellers.in"
                                        className="text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                                    >
                                        info@jaigurujewellers.in
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-300">
                            © {new Date().getFullYear()} {companyname}. All rights reserved.
                        </p>
                        <div className="flex gap-2">
                            <p className="text-md text-center align-center justify-center">
                                Crafted by
                            </p>
                            <Image
                                src={ourcompanylogo}
                                alt={ourcompanyname}
                                height={30}
                                width={30}
                                priority
                                style={{ objectFit: "cover" }}
                            />        
                            <p className="text-md">
                             {ourcompanyname}
                            </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden">
                <div className="px-2 py-2">
                    {/* Company Accordion */}
                    <div className="mb-1">
                        <button
                            onClick={() => toggleSection("company")}
                            className="w-full flex justify-between items-center py-4 text-left"
                        >
                            <h3 className="text-base font-semibold text-white">Company</h3>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${openSections.company ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSections.company ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="pb-4 pt-2">
                                <div className="mb-4">
                                    <h4 className="text-xl font-bold text-white mb-2">{companyname}</h4>
                                </div>
                                <p className="text-xs text-gray-200 mb-3 leading-relaxed">
                                    © {new Date().getFullYear()} {companyname}. All rights reserved.
                                </p>
                                
                                <div className="flex gap-3">
                                    {footerData.company.social.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                                        >
                                            <div className="w-4 h-4 bg-white/50 rounded-full" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Useful Links Accordion */}
                    <div className="mb-1">
                        <button
                            onClick={() => toggleSection("links")}
                            className="w-full flex justify-between items-center py-4 text-left border-t border-white/10"
                        >
                            <h3 className="text-base font-semibold text-white">Useful Links</h3>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${openSections.links ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${openSections.links ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="pb-4 pt-2 space-y-3">
                                {footerData.links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.link}
                                        className="block text-sm text-gray-200 hover:text-yellow-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Accordion */}
                    <div className="mb-1">
                        <button
                            onClick={() => toggleSection("contact")}
                            className="w-full flex justify-between items-center py-4 text-left border-t border-white/10"
                        >
                            <h3 className="text-base font-semibold text-white">Contact</h3>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${openSections.contact ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {/* <div
                            className={`overflow-hidden transition-all duration-300 ${openSections.contact ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="pb-4 pt-2 space-y-4">
                                <div className="flex gap-3">
                                    <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-200 font-medium mb-1">Tiruvallur Showroom</p>
                                        <p className="text-xs text-gray-300 leading-relaxed">
                                            712, TNHB, Kakkalur Bypass Road, Tiruvallur - 602001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-200 font-medium mb-1">Tiruttani Showroom</p>
                                        <p className="text-xs text-gray-300 leading-relaxed">
                                            321/322 MaPoSi Salai, Tiruttani
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-300 leading-relaxed">
                                            +91-9600972227<br />
                                            +91-9884808428<br />
                                            +91-9169161469
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                                    <a
                                        href="mailto:info@jaigurujewellers.in"
                                        className="text-xs text-gray-300 hover:text-yellow-400"
                                    >
                                        info@jaigurujewellers.in
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Mobile Footer Bottom */}
                <div className="border-t border-white/10 px-4 py-6">
                    <div className="flex justify-center gap-3 mb-4">
                        {paymentIcons.map((method) => (
                            <div
                                key={method.name}
                                className="w-12 h-8 bg-white/10 rounded flex items-center justify-center"
                            >
                                <div className="w-8 h-5 bg-white/30 rounded" />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-center">
                        <p className="text-xs">
                            Crafted by
                        </p>
                        <Image
                            src={ourcompanylogo}
                            alt={ourcompanyname}
                            height={30}
                            width={30}
                            priority
                            style={{ objectFit: "cover" }}
                        />
                        <p className="text-xs">
                            {ourcompanyname}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;