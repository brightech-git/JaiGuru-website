import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import TopHeader2 from "../layout/header2/TopHeader2";
import { useRouter } from "next/navigation";

interface HeaderSectionProps {
    pageType: "home" | "productDetail" | "other" | "cart" | "checkout";
    pageName?: string;
}

export default function HeaderSection({ pageType, pageName }: HeaderSectionProps) {
    console.log("HeaderSection render with pageType:", pageType, "and pageName:", pageName);
    const router = useRouter();
    const handleLogin = () => {
        router.push("/customer/login");
    };
    const handleRegister = () => {
        router.push("/register");
    };
    const handleHome = () => {
        router.push("/");
    };
    const handleCart = () => {
        router.push("/user/cart");
    }
    return (
        <>
            <TopHeader
                message="Free shipping on orders over $50!"
                links={[
                    { label: "Login", href: "/customer/login" },
                    { label: "Register", href: "/register" },
                ]}
            />

            <Header
                pageName={pageName || ""}
                pageType={pageType}
                userName="Aswin"
                cartCount={3}
                wishlistCount={2}
                onLogin={() => console.log("Login clicked")}
                onProfile={() => console.log("Profile clicked")}
                onCart={() => handleCart()}
                onWishlist={() => console.log("Wishlist clicked")}
            />
        </>
    );
}
