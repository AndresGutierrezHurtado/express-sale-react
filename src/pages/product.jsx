import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useGetData } from "@hooks/useFetchData";
import { CartAddIcon } from "../components/icons";

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
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col border bg-white rounded-lg divide-y">
                        <span className="w-full rounded-t-lg bg-gray-100 py-1 px-5 flex gap-5 underline">
                            <Link to="/products">
                                Productos
                            </Link>
                            <Link to={`/products?category=${product.categoria_id}`} >
                                {product.category.categoria_nombre}
                            </Link>
                            <a className="text-purple-700 ">
                                {product.producto_nombre}
                            </a>
                        </span>
                        <div className="flex gap-4 w-full">

                            <div>
                                <figure>
                                    <img src={product.producto_imagen_url} alt={`Imagen del producto ${product.producto_nombre}`} />
                                </figure>
                            </div>
                            <article className="w-full flex flex-col h-[initial] p-5">
                                <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <h2 className="text-4xl md:text-3xl font-bold leading-none">
                                            {product.producto_nombre}
                                        </h2>
                                        <p className="text-gray-600/90 font-medium">
                                            {new Intl.DateTimeFormat("es-CO").format(
                                                new Date(product.producto_fecha)
                                            )}
                                        </p>
                                    </div>
                                    {product.user && (
                                        <Link
                                            to={`/worker/${product.user.usuario_id}`}
                                            className="text-gray-500/80 font-semibold italic text-sm hover:underline tooltip tooltip-bottom"
                                            data-tip="Ir al perfil del vendedor"
                                        >
                                            @publicado por {product.user.usuario_alias}
                                        </Link>
                                    )}
                                </div>
                                <p className="grow">{product.producto_descripcion}</p>
                                <div className="space-y-3">
                                    <span className="flex justify-between items-center">
                                    <p>{product.producto_cantidad} Disponibles</p>
                                    <p>{product.calificacion_promedio}</p>
                                    </span>

                                    <button className="btn btn-sm min-h-none h-auto py-3 btn-primary group relative text-purple-300 hover:bg-purple-800 hover:text-purple-100 w-full">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 group-hover:text-purple-100">
                                            <CartAddIcon size={17} />
                                        </span>
                                        Añadir al carrito
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}