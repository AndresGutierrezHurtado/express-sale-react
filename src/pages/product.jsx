import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useGetData } from "@hooks/useFetchData";

export default function Product() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    console.log(product);

    const getProduct = async () => {
        const product = await useGetData(`/api/products/${id}`);
        if (product) {
            setProduct(product.data);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    if (!product) return <div>Cargando...</div>;
    return(
        <></>
    );
}