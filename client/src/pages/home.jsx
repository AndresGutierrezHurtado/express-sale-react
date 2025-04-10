import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import VanillaTilt from "vanilla-tilt";

// Components
import { CategoryCard } from "@components/categoryCard.jsx";
import { ArrowRightIcon, RegisterIcon } from "@components/icons.jsx";
import { VerticalProductCard } from "@components/verticalProductcard";
import ContentLoading from "@components/contentLoading.jsx";

// Hooks
import { usePaginateData, usePostData } from "@hooks/useFetchData.js";
import { useValidateform } from "@hooks/useValidateForm.js";
import { useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
    const {
        loading: loadingProducts,
        data: products,
        reload: reloadProducts,
    } = usePaginateData("/products");

    const handleContactFormSubmit = async (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        const validation = useValidateform(data, "contact-form");

        if (validation.success) {
            const response = await usePostData("/feedback", data);

            if (response.success) {
                event.target.reset();
            }
        }
    };

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 10,
            scale: 1.04,
            speed: 400,
            transition: true,
            glare: true,
            "max-glare": 0.3,
            reverse: true,
        });
    }, [products]);

    if (loadingProducts) return <ContentLoading />;

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col md:flex-row items-center gap-5[&>*]:w-full  md:[&>*]:w-1/2">
                        <figure>
                            <img
                                src="/images/hero-image.png"
                                alt="Imagen presentación Express Sale"
                            />
                        </figure>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-6xl font-extrabold">
                                    ¡Bienvenidos a Express Sale!
                                </h1>
                                <p className="text-xl text-pretty">
                                    Acá podrás comprar los{" "}
                                    <span className="text-purple-700 font-bold">
                                        Mejores productos
                                    </span>{" "}
                                    de las tiendas de barrio de bogotá.
                                </p>
                            </div>
                            <Link
                                to="/products"
                                className="btn btn-sm btn-primary rounded-full h-auto min-h-auto py-3 px-10"
                            >
                                Ver productos
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold capitalize">
                            Buscar por <span className="text-purple-700">categoría</span>
                        </h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
                            <CategoryCard
                                name="Moda"
                                image="/images/categories/moda.jpg"
                                link="/products?category_id=1"
                            />
                            <CategoryCard
                                name="Comida"
                                image="/images/categories/comida.jpg"
                                link="/products?category_id=2"
                            />
                            <CategoryCard
                                name="Tecnología"
                                image="/images/categories/tecnologia.jpg"
                                link="/products?category_id=3"
                            />
                            <CategoryCard
                                name="Otros"
                                image="/images/categories/otros.jpg"
                                link="/products?category_id=4"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold capitalize">
                            Los productos <span className="text-purple-700">más Destacados</span>
                        </h2>
                        <Swiper
                            effect={"coverflow"}
                            modules={[Navigation, EffectCoverflow, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={{
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return `<span class="${className}"></span>`;
                                },
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            }}
                            className="py-10"
                        >
                            {products.map((product) => (
                                <SwiperSlide
                                    key={product.product_id}
                                    className="flex items-center justify-center"
                                >
                                    <VerticalProductCard
                                        product={product}
                                        reloadProducts={reloadProducts}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="flex w-full justify-center">
                            <Link
                                to="/products"
                                className="btn btn-sm btn-primary rounded-full h-auto min-h-auto py-3 px-10"
                            >
                                Ver todos los productos
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <figure className="w-64 aspect-square drop-shadow-[0_15px_35px_rgb(126_34_206)]">
                            <img
                                src="/logo.png"
                                alt="Logo Express Sale"
                                className="object-contain h-full w-full"
                            />
                        </figure>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold capitalize">
                                ¿Quiénes <span className="text-purple-700">Somos?</span>
                            </h2>
                            <div className="text-xl max-w-4xl space-y-2">
                                <p className="text-balance">
                                    Express Sale ha sido creado por cuatro aprendices SENA:{" "}
                                    <span className="font-bold text-purple-700 italic">
                                        Andrés Gutiérrez, Juan Sebastián Bernal, Jaider Harley
                                        Rondón y David Fernando Díaz.
                                    </span>{" "}
                                    Juntos, han planeado y desarrollado esta herramienta para
                                    facilitar la gestión de inventarios, la venta de productos y la
                                    conexión entre comerciantes y clientes, ofreciendo una
                                    plataforma moderna y accesible para todos.
                                </p>
                                <p className="text-balance">
                                    En Express Sale, nuestra misión es{" "}
                                    <span className="font-bold text-purple-700">
                                        llevar las tiendas de barrio al mundo digital
                                    </span>
                                    , ayudándolas a expandir su alcance y competir en el mercado
                                    actual.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <h2 className="text-4xl font-bold capitalize">
                            ¡Queremos <span className="text-purple-700">Escucharte!</span>
                        </h2>
                        <article className="card bg-gray-300/30 shadow-xl rounded-xl border backdrop-blur-sm">
                            <div className="card-body">
                                <p className="text-xl">
                                    Si quieres contarnos tu opinión o tienes alguna queja sobre
                                    nuestro sistema de información puedes enviarnoslo por aquí:
                                </p>
                                <form onSubmit={handleContactFormSubmit}>
                                    <div className="form-group flex flex-col md:flex-row gap-5 w-full">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                                                    Correo Electrónico:
                                                </span>
                                            </label>
                                            <input
                                                placeholder="ejemplo@gmail.com"
                                                className="input focus:input-primary input-bordered focus:outline-0"
                                                name="user_email"
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                                                    Nombre Completo:
                                                </span>
                                            </label>
                                            <input
                                                placeholder="Ingresa tus nombres y apellidos acá"
                                                className="input focus:input-primary input-bordered focus:outline-0"
                                                name="user_name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                                                Asunto:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="Ingresa el tema de tu mensaje"
                                            className="input focus:input-primary input-bordered focus:outline-0"
                                            name="email_subject"
                                        />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                                                Mensaje:
                                            </span>
                                        </label>
                                        <textarea
                                            placeholder="Ingresa tu mensaje/opinión aquí"
                                            className="textarea textarea-bordered focus:textarea-primary focus:outline-0 resize-none h-32"
                                            name="email_message"
                                        ></textarea>
                                    </div>
                                    <div className="form-control w-full mt-5">
                                        <button className="btn btn-sm min-h-none h-auto py-3 btn-primary group relative text-purple-300 hover:bg-purple-800 hover:text-purple-100 w-full">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 group-hover:text-purple-100">
                                                <RegisterIcon size={17} />
                                            </span>
                                            Enviar mensaje
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
