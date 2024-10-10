// Icons
import { RegisterIcon } from "../icons";

// Hooks
import { useValidateform } from "../../hooks/useValidateForm";
import { usePutData } from "../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../context/authContext";

export default function UserEditModal({ user }) {
    const handleUpdateUserSubmit = (event) => {
        event.preventDefault();
        const { getData } = useAuthContext();

        const data = Object.fromEntries(new FormData(event.target));
        const validation = useValidateform(data, "user-edit-modal-form");

        if (validation.success) {
            // const response = usePutData("/api/user", data);
            // if (response.success) {
            //     getData();
            //     event.target.reset();
            //     document.getElementById("user-edit-modal").close();
            // }
        }
    };

    return (
        <dialog id="user-edit-modal" className="modal">
            <div className="modal-box w-full max-w-[800px]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="text-lg font-bold">Editar perfil:</h3>
                <p className="py-4">Cambia la información de tu perfil.</p>
                <form
                    onSubmit={handleUpdateUserSubmit}
                    className="space-y-3 [&_input:focus]:input-primary [&_input:focus]:outline-0"
                >
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                Imagen:
                            </span>
                        </div>
                        <input
                            type="file"
                            className="file-input file-input-primary file-input-bordered w-full"
                            name="usuario_imagen"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                Nombres:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa tus nombre"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_nombre}
                            name="usuario_nombre"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                Apellidos:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa tus apellidos"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_apellido}
                            name="usuario_apellido"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                Correo electrónico:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa tu correo principal de contacto"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_correo}
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                Usuario:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa tu usuario, debe ser unico"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_alias}
                            name="usuario_alias"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">
                                Telefono:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa tu telefono principal de contacto"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_telefono}
                            name="usuario_telefono"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">
                                Dirección:
                            </span>
                        </div>
                        <input
                            placeholder="Ingresa la dirección precisa de tu vivienda/oficina"
                            className="input input-bordered w-full"
                            defaultValue={user.usuario_direccion}
                            name="usuario_direccion"
                        />
                    </label>
                    {user.worker && (
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Descripción:
                                </span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered resize-none h-24 w-full"
                                placeholder="Bio"
                                defaultValue={
                                    user.worker.trabajador_descripcion
                                }
                                name="trabajador_descripcion"
                            ></textarea>
                        </label>
                    )}
                    <div className="form-control pt-4">
                        <button className="btn btn-primary group relative text-purple-300 hover:bg-purple-800 hover:text-purple-100">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 group-hover:text-purple-100">
                                <RegisterIcon />
                            </span>
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
