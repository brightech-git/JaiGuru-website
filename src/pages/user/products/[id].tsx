// pages/user/products/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import ProductDetails from "@/component/pages/products/ProductDetails";

const sampleProducts = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
];

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: sampleProducts.map((product) => ({ params: { id: product.id } })),
    fallback: false,
});


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const productExists = sampleProducts.some(
        (product) => product.id === params?.id
    );
    if (!productExists) {
        return { notFound: true };
    }
    return { props: { id: params?.id } };
};

export default function ProductDetailsPage({ id }: { id: string }) {
    return (  
        
    <ProductDetails params={{ id }} />  
    
);
  
}
