import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const [logged, setLogged] = useState(false); // Estado para verificar si el usuario está conectado
    const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar la visibilidad del menú desplegable
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Verificar si hay un token en el localStorage al cargar el componente
        const token = localStorage.getItem('token');
        setLogged(token ? true : false);
        setUsername(localStorage.getItem('name') || "");

        // Agregar un event listener para controlar el desplazamiento de la página
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 20);
        });

        // Remover el event listener al desmontar el componente para evitar fugas de memoria
        return () => {
            window.removeEventListener("scroll", () => { });
        };
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        setLogged(false);
    };

    return (
        <div
            className={`transition-colors duration-1000 ${scroll ? "bg-gray-50" : ""
                } fixed top-0 left-0 w-full z-20 mb-10`}
        >
            <nav className="relative container mx-auto flex items-center justify-between py-4 px-2">
                <div className="flex">
                    <Link to="/ProyectoRestaurante/public/">
                        <img src={logo} alt="" className="h-12 w-12 mr-2" />
                    </Link>

                    <div>
                        <h4 className="text-xl font-bold">RinosZone</h4>
                        <span className="text-[0.65rem] font-bold opacity-70">
                            Restaurante
                        </span>
                    </div>

                </div>
                <div className="flex gap-3">
                    <div className="cursor-pointer flex items-center justify-center w-10 h-12 bg-black rounded-t-xl rounded-br-3xl relative">
                        <AiOutlineShoppingCart className="text-xl text-white" />
                    </div>
                    <Link to={'/ProyectoRestaurante/public/calendar'}>
                        <div className="cursor-pointer flex items-center justify-center w-10 h-12 bg-black rounded-t-xl rounded-br-3xl relative">
                            <AiFillCalendar className="text-xl text-white" />
                        </div>
                    </Link>

                    {logged ? (
                        <div className="relative">
                            <div onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer flex items-center justify-center w-24 h-12 bg-black rounded-t-xl rounded-br-3xl relative">
                                <span className="text-white">{username}</span>
                            </div>
                            {showDropdown && (
                                <div className="absolute top-full right-0 bg-white shadow-md py-2 rounded-md">
                                    <Link to="/ProyectoRestaurante/public/tarjetas" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mis Tarjetas</Link>
                                    <Link to="/ProyectoRestaurante/public/reservas" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mis Reservas</Link>
                                    <Link to='/ProyectoRestaurante/public/'><button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button></Link>
                                    
                                </div>
                            )}
                        </div>
                    ) : (
                        // Mostrar el enlace al login si no está autenticado
                        <Link to="/ProyectoRestaurante/public/login">
                            <div className="cursor-pointer flex items-center justify-center w-10 h-12 bg-black rounded-t-xl rounded-br-3xl relative">
                                <FaUserTie className="text-xl text-white" />
                            </div>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
