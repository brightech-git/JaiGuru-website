import { sampleProducts } from "@/data/Home";
import ProductDetailsClient from "@/component/pages/product/ProductDetailClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return sampleProducts.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params; // Await params to get the id
    const product = sampleProducts.find((p) => p.id.toString() === id);
    if (!product) return <div>Product not found</div>;

    return <ProductDetailsClient product={product} />;
}