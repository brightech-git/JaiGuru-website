import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import TopHeader2 from "../layout/header2/TopHeader2";
export default function HeaderSection() {
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
