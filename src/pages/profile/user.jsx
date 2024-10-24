import { useParams, Link } from "react-router-dom";

import {
    PencilIcon,
    UserIcon,
    StarIcon,
    EmailIcon,
    PhoneIcon,
    BoxesStackedIcon,
} from "@components/icons.jsx";
import { UserEditModal } from "@components/profile/userEditModal.jsx";
import ContentLoading from "@components/contentLoading.jsx";

import { useAuthContext } from "@contexts/authContext.jsx";

import { useGetData } from "@hooks/useFetchData.js";
export default function UserProfile() {
    const { id } = useParams();
    const { userSession, loading } = useAuthContext();

    const {
        loading: loadingUser,
        data: user,
        reload: reloadUser,
    } = !loading && useGetData(`/users/${id || userSession.usuario_id}`);
    const {
        loading: loadingRatings,
        data: ratings,
        reload: reloadRatings,
    } = useGetData(`/users/${id || userSession.usuario_id}/ratings`);
    const {
        loading: loadingOrders,
        data: orders,
        reload: reloadOrders,
    } = useGetData(`/users/${id || userSession.usuario_id}/orders`);

    if ((loadingUser, loadingRatings, loadingOrders)) return <ContentLoading />;

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-5 space-y-5">
                    <h3 className="text-4xl font-extrabold">
                        {user.usuario_id == userSession.usuario_id
                            ? "Mi perfil"
                            : "Perfil de usuario"}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="avatar relative mx-auto md:m-0">
                            <div
                                onClick={() =>
                                    document
                                        .getElementById("user-edit-modal")
                                        .show()
                                }
                                className="bg-white absolute bottom-[7%] right-[7%] p-[2px] border-0 w-8 rounded-full aspect-square cursor-pointer hover:scale-110 duration-300"
                            >
                                <div className="w-full h-full bg-purple-700 rounded-full [&_svg]:fill-white flex items-center justify-center">
                                    <PencilIcon size={20} />
                                </div>
                            </div>

                            <div className="w-[170px] rounded-full">
                                <img src={user.usuario_imagen_url} />
                            </div>
                        </div>
                        <article className="flex flex-col justify-between gap-1 h-[initial]">
                            <div>
                                <h3 className="text-3xl font-bold">
                                    {user.usuario_nombre}{" "}
                                    {user.usuario_apellido}
                                </h3>
                                <p className="text-lg italic text-gray-600">
                                    @{user.usuario_alias} (
                                    {user.role ? user.role.rol_nombre : ""})
                                </p>
                            </div>
                            <p className="text-lg grow">
                                {user.worker
                                    ? user.worker.trabajador_descripcion
                                    : ""}
                            </p>
                            <span className="flex flex-wrap items-center gap-4 [&_svg]:fill-gray-600 text-gray-600 w-full overflow-hidden">
                                {user.worker && (
                                    <>
                                        <Link to={`/worker/${user.usuario_id}`}>
                                            <div
                                                data-tip={`Perfil de ${user.role.rol_nombre}`}
                                                className="tooltip tooltip-bottom flex badge badge-sm gap-1 h-auto py-1 px-5 duration-300 hover:scale-[1.06]"
                                            >
                                                <UserIcon size={11} />
                                                Ver perfil
                                            </div>
                                        </Link>
                                        <div
                                            data-tip={`Calificaciones recibidas como ${user.role.rol_nombre}`}
                                            className="tooltip tooltip-bottom flex badge badge-sm gap-1 h-auto py-1 px-5 duration-300 hover:scale-[1.06]"
                                        >
                                            <StarIcon size={12} />
                                            {ratings.length} Calificaciones
                                        </div>
                                    </>
                                )}

                                <Link
                                    to={`mailto:${user.usuario_correo}`}
                                    target="_blank"
                                >
                                    <div
                                        data-tip="Correo electronico de contacto"
                                        className="tooltip tooltip-bottom flex badge badge-sm gap-1 h-auto py-1 px-5 duration-300 hover:scale-[1.06]"
                                    >
                                        <EmailIcon size={14} />
                                        {user.usuario_correo}
                                    </div>
                                </Link>
                                {user.usuario_telefono && (
                                    <div
                                        data-tip="Numero de contacto"
                                        className="tooltip tooltip-bottom flex badge badge-sm gap-1 h-auto py-1 px-5 duration-300 hover:scale-[1.06]"
                                    >
                                        <PhoneIcon size={14} />
                                        {user.usuario_telefono}
                                    </div>
                                )}
                                <div
                                    data-tip="Cantidad total de compras hechas"
                                    className="tooltip tooltip-bottom flex badge badge-sm gap-1 h-auto py-1 px-5 duration-300 hover:scale-[1.06]"
                                >
                                    <BoxesStackedIcon size={14} />
                                    {orders && orders.length} compras hechas
                                </div>
                            </span>
                        </article>
                    </div>
                </div>
            </section>
            <UserEditModal user={user} reload={reloadUser} />
        </>
    );
}
