import React from "react";
import Swal from "sweetalert2";

// Hooks
import { useNavigate, useParams } from "react-router-dom";
import { useGetData, usePutData } from "@hooks/useFetchData";

// Components
import ContentLoading from "@components/contentLoading.jsx";
import { GoogleMapsIcon, WazeIcon, CircleCheckIcon } from "@components/icons.jsx";
import { DeliveryRouteMap } from "@components/map";

// Contexts
import { useAuthContext } from "@contexts/authContext.jsx";

export default function Delivery() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { userSession } = useAuthContext();
    const { data: order, loading: orderLoading } = useGetData(`/orders/${id}`);

    const handleSubmit = () => {
        Swal.fire({
            icon: "info",
            title: "Marcar como terminado",
            text: "Dale a continuar si quieres marcar el pedido como terminado, no se te guardará el dinero hasta que el usuario lo marque como recibido",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Continuar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await usePutData(`/orders/${id}`, {
                    order: {
                        order_status: "entregado",
                    },
                });
                if (response.success) {
                    navigate(`/worker/stats/${userSession.user_id}`);
                }
            }
        });
    };

    if (orderLoading) return <ContentLoading />;

    const { orderProducts, shippingDetails, paymentDetails } = order;

    const totalAmount = orderProducts.reduce(
        (total, item) => total + item.product_price * item.product_quantity,
        0
    );

    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="card bg-white border gap-5">
                    <div className="card-body flex flex-col gap-7">
                        <div className="flex flex-col md:flex-row gap-10">
                            <article className="space-y-4">
                                <h1 className="text-4xl font-extrabold tracking-tight">
                                    Detalles del Pedido:
                                </h1>

                                {/* Información del Comprador */}
                                <div className="text-lg">
                                    <p>
                                        <strong>Nombre:</strong> {order.user.user_name}{" "}
                                        {order.user.user_lastname}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {paymentDetails.buyer_email}
                                    </p>
                                    <p>
                                        <strong>Teléfono:</strong>{" "}
                                        {paymentDetails.buyer_phone}
                                    </p>
                                    <p>
                                        <strong>Dirección:</strong>{" "}
                                        {shippingDetails.shipping_address}
                                    </p>
                                    <p>
                                        <strong>Mensaje:</strong> {shippingDetails.shipping_message}
                                    </p>
                                </div>
                            </article>

                            <article className="space-y-4">
                                <h1 className="text-4xl font-extrabold tracking-tight">
                                    Tiendas / Vendedores:
                                </h1>
                                <div className="text-lg">
                                    {orderProducts.map((item, index) => (
                                        <div key={item.product_id}>
                                            <p>
                                                {index + 1}. {item.product.user.user_name}{" "}
                                                {item.product.user.user_lastname}{" "}
                                                <span className="text-sm text-gray-600">
                                                    (
                                                    {item.product.user.user_address ||
                                                        "Dirección desconocida"}
                                                    )
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                    <div>
                                        <p>
                                            {orderProducts.length + 1}. Destino{" "}
                                            <span className="text-sm text-gray-600">
                                                ({shippingDetails.shipping_address})
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <hr />
                        {/* Mapa */}
                        <DeliveryRouteMap
                            addresses={orderProducts.map(
                                (item) => item.product.user.user_address
                            )}
                            destination={shippingDetails.shipping_coordinates}
                        />
                        <hr />
                        <div className="flex items-center justify-center">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-sm btn-success text-white w-full max-w-lg"
                            >
                                <CircleCheckIcon />
                                Marcar como terminado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
