// src/app/cart/page.tsx
"use client";
import CartPage from "@/component/component/cart/CartPage";
import ProtectedRoute from "@/component/auth/ProtectedRoute";

export default function Cart() {
  return (
    // <ProtectedRoute>
    <CartPage />
    //</ProtectedRoute> 
  );
}
