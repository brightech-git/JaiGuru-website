export function getProductPrice(product: any): number {
    if (!product) return 0;

    const grandTotal = Number(product.GrandTotal) || 0;
    const rate = Number(product.Rate) || 0;

    // ✅ if GrandTotal > 0, use it; else use Rate
    if (grandTotal > 0) {
        return grandTotal;
    } else {
        return rate;
    }
}

/**
 * Get formatted price (e.g. ₹112.06)
 */
export function formatPrice(price: number, currency: string = "₹"): string {
    return `${currency}${price.toFixed(2)}`;
}