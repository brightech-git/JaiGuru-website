export interface CategoryItem {
    name: string;
    image: string;
    link: string;
}

export interface SubMenu {
    title: string;
    items: CategoryItem[];
}

export interface Category {
    label: string;
    link?: string;
    subMenus?: SubMenu[];
}

const allJewellerySubMenus: SubMenu[] = [
    {
        title: "Shop by Category",
        items: [
            { name: "Rings", image: "/images/ring.jpg", link: "/all-jewellery/rings" },
            { name: "Necklaces", image: "/images/necklace.jpg", link: "/all-jewellery/necklaces" },
            { name: "Earrings", image: "/images/earrings.jpg", link: "/all-jewellery/earrings" },
        ],
    },
    {
        title: "Shop by Price",
        items: [
            { name: "Under 15,000", image: "/images/price1.jpg", link: "/all-jewellery/under-15000" },
            { name: "Under 30,000", image: "/images/price2.jpg", link: "/all-jewellery/under-30000" },
            { name: "Under 50,000", image: "/images/price3.jpg", link: "/all-jewellery/under-50000" },
            { name: "Above 50,000", image: "/images/price4.jpg", link: "/all-jewellery/above-50000" },
        ],
    },
    {
        title: "Shop by Gender",
        items: [
            { name: "Women", image: "/images/women.jpg", link: "/all-jewellery/women" },
            { name: "Men", image: "/images/men.jpg", link: "/all-jewellery/men" },
            { name: "Kids & Teens", image: "/images/kids.jpg", link: "/all-jewellery/kids-teens" },
        ],
    },
    {
        title: "Shop by Occasion",
        items: [
            { name: "Daily Wear", image: "/images/2.webp", link: "/all-jewellery/daily-wear" },
            { name: "Office Wear", image: "/images/office.jpg", link: "/all-jewellery/office-wear" },
            { name: "Party Wear", image: "/images/party.jpg", link: "/all-jewellery/party-wear" },
            { name: "Function Wear", image: "/images/function.jpg", link: "/all-jewellery/function-wear" },
        ],
    },
];

export const categories: Category[] = [
    { label: "Home", link: "/" },
    { label: "All Jewellery", subMenus: allJewellerySubMenus },
    { label: "Gold", subMenus: allJewellerySubMenus },
    { label: "Silver", subMenus: allJewellerySubMenus },
    { label: "Diamond", subMenus: allJewellerySubMenus },
    { label: "Shop", link: "/user/products" },
];
