import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useGetData, usePostData } from "@hooks/useFetchData.js";
import { useValidateform } from "@hooks/useValidateForm.js";

// Components
import { CartAddIcon, StarIcon, UserIcon, ClipIcon, PaperPlaneIcon } from "@components/icons.jsx";
import ContentLoading from "@components/contentLoading.jsx";
import { Calification } from "@components/calification";


export default function Product() {
    const { id } = useParams();
    const {
        loading: loadingProduct,
        data: product,
        reload: reloadProduct,
    } = useGetData(`/products/${id}`);

    const {
        loading: loadingRatings,
        data: ratings,
        reload: reloadRatings,
    } = useGetData(`/products/${id}/ratings`);

    const handleRatingSubmit = async (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        const validation = useValidateform(data, "rate-form");

        if (validation.success) {
            const response = await usePostData(`/ratings/products/${id}`, data);
            if (response.success) {
                event.target.reset();
                reloadProduct();
                reloadRatings();
            }
        }
    };

    const handleCartAdd = async () => {
        const response = await usePostData("/carts", {
            producto_id: product.producto_id,
        })
    }

    if (loadingProduct || loadingRatings) return <ContentLoading />;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-5">
                    <div className="flex flex-col border bg-white rounded-lg divide-y shadow-xl">
                        <span className="breadcrumbs text-sm capitalize px-5">
                            <ul>
                                <li>
                                    <Link to="/products">Productos</Link>
                                </li>
                                <li>
                                    <Link to={`/products?category=${product.categoria_id}`}>
                                        {product.category.categoria_nombre}
                                    </Link>
                                </li>
                                <li>
                                    <a className="text-purple-700 ">{product.producto_nombre}</a>
                                </li>
                            </ul>
                        </span>
                        <div className="flex flex-col md:flex-row gap-10 p-8 py-7 w-full">
                            <div className="flex flex-col md:flex-row flex-none">
                                <figure className="w-full max-w-[320px] flex-none aspect-square border">
                                    <img
                                        src={product.producto_imagen_url}
                                        alt={`Imagen del producto ${product.producto_nombre}`}
                                        className="object-contain h-full w-full"
                                    />
                                </figure>
                                <div className="h-[initial] max-h-[100px] md:max-h-none p-1 border w-full md:max-w-[100px] flex-none">
                                    <img
                                        src={product.producto_imagen_url}
                                        alt={`Imagen del producto ${product.producto_nombre}`}
                                        className="border border-purple-700"
                                    />
                                    {product.media.forEach((media) => {
                                        if (media.multimedia_tipo === "imagen") {
                                            return (
                                                <img
                                                    key={media.multimedia_id}
                                                    src={media.multimedia_url}
                                                    alt={`Imagen del producto ${product.producto_nombre}`}
                                                    className="object-contain h-full w-full"
                                                />
                                            );
                                        } else {
                                            return (
                                                <video
                                                    src={media.multimedia_url}
                                                    alt={`Video del producto ${product.producto_nombre}`}
                                                    className="object-contain h-full w-full"
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            <article className="w-full flex flex-col h-[initial]">
                                <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <h2 className="text-2xl md:text-4xl font-bold leading-none">
                                            {product.producto_nombre}
                                        </h2>
                                        <p
                                            className="text-gray-600/90 font-medium hover:underline cursor-pointer tooltip tooltip-left"
                                            data-tip="Ver calificaciones"
                                        >
                                            {product.calificacion_cantidad} comentarios
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
                                        <p className="flex items-center">
                                            {product.calificacion_promedio}
                                            <StarIcon />
                                        </p>
                                    </span>

                                    <button onClick={handleCartAdd} className="btn btn-sm min-h-none h-auto py-3 btn-primary group relative text-purple-300 hover:bg-purple-800 hover:text-purple-100 w-full">
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
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-5">
                    <article className="card bg-white shadow-xl border">
                        <div className="card-body">
                            <h2 className="text-3xl font-extrabold tracking-tight">Comentarios:</h2>
                            <div className="flex flex-col md:flex-row gap-10">
                                <section className="w-full md:w-1/2 space-y-5">
                                    <article className="w-full flex gap-10">
                                        <div className="flex flex-col items-center justify-center w-fit text-gray-600 gap-1">
                                            <h2 className="font-semibold text-4xl text-center">
                                                {product.calificacion_promedio}
                                            </h2>
                                            <span className="flex gap-1">
                                                <StarIcon size={15} />
                                                <StarIcon size={15} />
                                                <StarIcon size={15} />
                                                <StarIcon size={15} />
                                                <StarIcon size={15} />
                                            </span>
                                            <p className="text-sm flex gap-1 items-center grow-0">
                                                {ratings.length}
                                                <UserIcon size={12} />
                                            </p>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center gap-2">
                                                5
                                                <progress
                                                    className="progress progress-primary w-full"
                                                    value={
                                                        (ratings.filter(
                                                            (rating) => rating.calificacion == 5
                                                        ).length /
                                                            ratings.length) *
                                                        100
                                                    }
                                                    max="100"
                                                ></progress>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                4
                                                <progress
                                                    className="progress progress-primary w-full"
                                                    value={
                                                        (ratings.filter(
                                                            (rating) => rating.calificacion == 4
                                                        ).length /
                                                            ratings.length) *
                                                        100
                                                    }
                                                    max="100"
                                                ></progress>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                3
                                                <progress
                                                    className="progress progress-primary w-full"
                                                    value={
                                                        (ratings.filter(
                                                            (rating) => rating.calificacion == 3
                                                        ).length /
                                                            ratings.length) *
                                                        100
                                                    }
                                                    max="100"
                                                ></progress>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                2
                                                <progress
                                                    className="progress progress-primary w-full"
                                                    value={
                                                        (ratings.filter(
                                                            (rating) => rating.calificacion == 2
                                                        ).length /
                                                            ratings.length) *
                                                        100
                                                    }
                                                    max="100"
                                                ></progress>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                1
                                                <progress
                                                    className="progress progress-primary w-full"
                                                    value={
                                                        (ratings.filter(
                                                            (rating) => rating.calificacion == 1
                                                        ).length /
                                                            ratings.length) *
                                                        100
                                                    }
                                                    max="100"
                                                ></progress>
                                            </div>
                                        </div>
                                    </article>
                                    <div className="space-y-2">
                                        <div>
                                            <h2 className="text-xl font-medium tracking-tight">
                                                Agrega tu calificacion:
                                            </h2>
                                            <p>
                                                Ten en cuenta la calidad del producto y su fidelidad
                                                a la imagen de referencia
                                            </p>
                                        </div>
                                        <form onSubmit={handleRatingSubmit}>
                                            <div className="rating flex justify-center gap-2 py-3">
                                                <input
                                                    type="radio"
                                                    name="calificacion"
                                                    value="1"
                                                    className="mask mask-star-2 bg-violet-600"
                                                    defaultChecked
                                                />
                                                <input
                                                    type="radio"
                                                    name="calificacion"
                                                    value="2"
                                                    className="mask mask-star-2 bg-violet-600"
                                                />
                                                <input
                                                    type="radio"
                                                    name="calificacion"
                                                    value="3"
                                                    className="mask mask-star-2 bg-violet-600"
                                                />
                                                <input
                                                    type="radio"
                                                    name="calificacion"
                                                    value="4"
                                                    className="mask mask-star-2 bg-violet-600"
                                                />
                                                <input
                                                    type="radio"
                                                    name="calificacion"
                                                    value="5"
                                                    className="mask mask-star-2 bg-violet-600"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label
                                                    htmlFor="rating"
                                                    className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-gray-200"
                                                >
                                                    <label className="cursor-pointer hover:bg-gray-400 p-2 rounded-full">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            name="calificacion_imagen"
                                                        />
                                                        <ClipIcon
                                                            size={20}
                                                            className="rotate-[-45deg]"
                                                        />
                                                    </label>
                                                    <input
                                                        name="calificacion_comentario"
                                                        id="rating"
                                                        placeholder="Agrega el comentario sobre el producto"
                                                        className="grow bg-transparent border-0 focus:outline-0"
                                                    />
                                                    <button className="btn btn-sm btn-primary rounded-full">
                                                        <PaperPlaneIcon />
                                                    </button>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                                <section className="w-full md:w-1/2 space-y-4">
                                    {ratings.length === 0 && (
                                        <h2 className="text-xl font-medium tracking-tight">
                                            No hay comentarios...
                                        </h2>
                                    )}
                                    {ratings.map((rating) => {
                                        return (
                                            <Calification
                                                key={rating.calificacion_id}
                                                rating={rating}
                                                reload={() => {
                                                    reloadProduct();
                                                    reloadRatings();
                                                }}
                                            />
                                        );
                                    })}
                                </section>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}
