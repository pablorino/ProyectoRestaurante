import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Component() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const getEmail = (e) => {
        setUser({
            ...user,
            email: e.target.value
        });
    };
    const getPassword = (e) => {
        setUser({
            ...user,
            password: e.target.value
        });
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    };

    // PETICIÓN FETCH
    const obtenerDatosFecth = (e) => {
        e.preventDefault();
        const url = "api/login";
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    console.log(result.token);
                    window.location.href = "/ProyectoRestaurante/public/";
                    localStorage.setItem('token', (result.token));
                    localStorage.setItem('name', (result.name));
                    localStorage.setItem('email', (result.email));
                    localStorage.setItem('id', (result.id));
                } else {
                    console.log(result.message);
                    setErrorMessage("Datos incorrectos");
                }
            })
            .catch(error => console.log(error));

        setUser({
            email: "",
            password: ""
        });
    };

    return (
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 mt-20">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
                    <p className="mt-2 text-gray-500">Rellene los datos para acceder a su cuenta</p>
                </div>
                <div className="mt-5">
                    <form onSubmit={obtenerDatosFecth}>
                        <div className="relative mt-6">
                            <input type="email" onChange={getEmail} value={user.email} name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" />
                            <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                        </div>
                        <div className="relative mt-6">
                            <input type="password" onChange={getPassword} value={user.password} name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                            <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                        </div>
                        <div className="my-6">
                            <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Log in</button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-gray-500">Don't have an account yet?
                        <Link to="/ProyectoRestaurante/public/register" className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign up</Link>.
                    </p>
                    {errorMessage && (
                        <p className="text-red-500 text-center">{errorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}