import React from "react";
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Contexts
import { useAuthContext } from "@contexts/authContext.jsx";

// Components
import { SearchIcon, SortIcon } from "@components/icons";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userSession, handleLogout } = useAuthContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const updateParam = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, value);
        setSearchParams(newSearchParams);
    };

    if (userSession.rol_id !== 4) navigate("/");
    return (
        <>
            <main className="drawer-content flex flex-col h-screen">
                <header
                    className="p-3 bg-slate-900 flex flex-col items-center gap-5 p-6 "
                    data-theme="dark"
                >
                    <nav className="flex justify-between items-center w-full">
                        <div className="flex gap-4">
                            <div className="dropdown">
                                <button
                                    tabIndex="0"
                                    role="button"
                                    className="btn btn-circle btn-sm btn-ghost"
                                >
                                    <SortIcon />
                                </button>
                                <ul
                                    tabIndex="0"
                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    data-theme="light"
                                >
                                    {location.pathname.endsWith("users") ? (
                                        <>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "usuario_creacion:asc");
                                                    }}
                                                >
                                                    Fecha
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "usuario_id:asc");
                                                    }}
                                                >
                                                    Id
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "usuario_nombre:asc");
                                                    }}
                                                >
                                                    Nombre
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "usuario_alias:asc");
                                                    }}
                                                >
                                                    Usuario
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "rol_id:asc");
                                                    }}
                                                >
                                                    Rol
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "producto_id:asc");
                                                    }}
                                                >
                                                    Id
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "producto_nombre:asc");
                                                    }}
                                                >
                                                    Nombre
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "producto_nombre:asc");
                                                    }}
                                                >
                                                    Categoria
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "producto_precio:asc");
                                                    }}
                                                >
                                                    Precio: menor a mayor
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => {
                                                        updateParam("sort", "producto_precio:desc");
                                                    }}
                                                >
                                                    Precio: mayor a menor
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <form className="flex gap-2">
                                <input
                                    name="search"
                                    className="input input-bordered input-sm rounded-full"
                                    data-theme="light"
                                    placeholder={`Buscar ${
                                        location.pathname.endsWith("users")
                                            ? "usuarios"
                                            : "productos"
                                    }...`}
                                />
                                <button className="btn btn-circle btn-sm btn-ghost">
                                    <SearchIcon />
                                </button>
                            </form>
                        </div>
                        <div>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex="0"
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-8 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={
                                                userSession
                                                    ? userSession.usuario_imagen_url
                                                    : "/images/users/default.jpg"
                                            }
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                    data-theme="light"
                                >
                                    {userSession ? (
                                        <>
                                            <li>
                                                <Link to="/profile/user/">Perfil</Link>
                                            </li>
                                            <li onClick={handleLogout}>
                                                <a>Cerrar sesión</a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">Iniciar sesión</Link>
                                            </li>
                                            <li>
                                                <Link to="/register">Registrarse</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Link to="/" className="tooltip tooltip-bottom" data-tip="Ir al inicio">
                        <figure className="w-[150px] aspect-square rounded-full overflow-hidden ">
                            <img
                                src="/images/logo.jpg"
                                alt="Logo de Express Sale"
                                className="object-cover h-full w-full"
                            />
                        </figure>
                    </Link>
                    <div className="flex items-center">
                        <h2 className="text-4xl font-extrabold tracking-tight">Tabla de</h2>
                        <select
                            onClick={(event) => {
                                navigate(`/admin${event.target.value}`);
                            }}
                            defaultValue={
                                location.pathname.endsWith("users") ? "/users" : "/products"
                            }
                            className="select select-ghost text-4xl font-extrabold tracking-tight focus:border-0 focus:outline-none focus:bg-transparent"
                        >
                            <option className="text-base text-black" value="/users">
                                Usuarios
                            </option>
                            <option className="text-base text-black" value="/products">
                                Productos
                            </option>
                        </select>
                    </div>
                </header>
                <div className="grow">
                    <Outlet />
                </div>
                <footer
                    className="p-3 bg-slate-900 flex flex-col items-center gap-5 p-3 "
                    data-theme="dark"
                >
                    <h1 className="text-2xl font-extrabold">&copy; Express Sale, 2024</h1>
                </footer>
            </main>
        </>
    );
}