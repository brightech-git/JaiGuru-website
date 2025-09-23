import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import TopHeader2 from "../layout/header2/TopHeader2";
export default function HeaderSection() {
    return (
        <>
            <TopHeader
                message="Free shipping on orders over $50!"
                links={[
                    { label: "Login", href: "/login" },
                    { label: "Register", href: "/register" },
                ]}
            />
            {/* <TopHeader2
                labels={[
                    { label: "Free Shipping Today!", href: "/shipping" },
                    { label: "New Arrivals Just In", href: "/new" },
                    { label: "50% Off Sale!", href: "/sale" },
                ]}
                interval={4000} // switch every 4 seconds
            /> */}

          <Header
                  userName="Aswin"
                  cartCount={3}
                  wishlistCount={2}
                  onLogin={() => console.log("Login clicked")}
                  onProfile={() => console.log("Profile clicked")}
                  onCart={() => console.log("Cart clicked")}
                  onWishlist={() => console.log("Wishlist clicked")}
                />
        </>
    );
}
