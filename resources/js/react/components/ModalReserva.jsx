import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Modal({ event, onClose }) {
    const [reserva, setReserva] = useState({
        email: "",
        name: "",
        idEvent: "",
        idUser: "",
        numPersonas: "",
        menu: "",
        num: "",
        date: "",
        cvv: ""
    });

    const [tarjetas, setTarjetas] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            setReserva(prevReserva => ({
                ...prevReserva,
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                idUser: localStorage.getItem('id')
            }));
            obtenerTarjetas();
        }
    }, []);

    useEffect(() => {
        if (event.id) {
            setReserva(prevReserva => ({
                ...prevReserva,
                idEvent: event.id
            }));
        }
    }, [event.id]);

    const obtenerTarjetas = () => {
        const url = 'api/tarjetas';
        const data = { idUser: localStorage.getItem('id') };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al obtener las tarjetas');
            })
            .then(result => {
                console.log(result);
                setTarjetas(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva({
            ...reserva,
            [name]: value
        });
    }

    const handleSubmit = () => {
        
        onClose()

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reserva)
        };

        const url = "api/createR";
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result.token);
            })
            .catch(error => console.log(error));

        // Limpia los campos después de enviar la reserva
        setReserva({
            email: "",
            name: "",
            idEvent: "",
            idUser: "",
            numPersonas: "",
            menu: "",
            num: "",
            date: "",
            cvv: ""
        });

        window.location.href = '/ProyectoRestaurante/public/';
        
    }

    const token = localStorage.getItem('token');

    return (
        token ? (
            <div className="fixed z-10 inset-0 overflow-y-auto position-absolute">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{event.title}</h3>
                                    <div className="mt-2">
                                        <input type="number" hidden onChange={handleChange} value={event.id} name='idEvent' id='idEvent' />
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                            <input type="text" readOnly={localStorage.getItem('token') ? true : false} value={reserva.name} onChange={handleChange} name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="numPersonas" className="block text-sm font-medium text-gray-700">Num personas</label>
                                            <input type="number" onChange={handleChange} value={reserva.numPersonas} name="numPersonas" id="numPersonas" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="menu" className="block text-sm font-medium text-gray-700">Menú</label>
                                            <select onChange={handleChange} value={reserva.menu} id="menu" type='number' name="menu" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Menu 1</option>
                                                <option value="2">Menu 2</option>
                                                <option value="3">Menu 3</option>
                                                <option value="4">Menu 4</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" readOnly={localStorage.getItem('token') ? true : false} value={reserva.email} onChange={handleChange} name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        {localStorage.getItem('token') && (
                                            <>
                                                <h2>Tarjetas Bancarias</h2>
                                                <select onChange={handleChange} name="tarjeta" id="tarjeta" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="">Selecciona una tarjeta</option>
                                                    {tarjetas.map((tarjeta, index) => (
                                                        <option value={tarjeta.id}>{tarjeta.num}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                        <div className="mb-4">
                                            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start</label>
                                            <input type="text" readOnly value={event.startStr} name="start" id="start" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="end" className="block text-sm font-medium text-gray-700">End</label>
                                            <input type="text" readOnly value={event.endStr} name="end" id="end" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Cerrar
                            </button>
                            <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Reservar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="fixed z-10 inset-0 overflow-y-auto position-absolute">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{event.title}</h3>
                                    <div className="mt-2">
                                        <input type="number" hidden onChange={handleChange} value={event.id} name='idEvent' id='idEvent' />
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                            <input type="text" onChange={handleChange} value={reserva.name} name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="numPersonas" className="block text-sm font-medium text-gray-700">Num personas</label>
                                            <input type="number" onChange={handleChange} value={reserva.numPersonas} name="numPersonas" id="numPersonas" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="menu" className="block text-sm font-medium text-gray-700">Menú</label>
                                            <select onChange={handleChange} value={reserva.menu} id="menu" type='number' name="menu" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Menu 1</option>
                                                <option value="2">Menu 2</option>
                                                <option value="3">Menu 3</option>
                                                <option value="4">Menu 4</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" onChange={handleChange} value={reserva.email} name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start</label>
                                            <input type="text" readOnly value={event.startStr} name="start" id="start" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="end" className="block text-sm font-medium text-gray-700">End</label>
                                            <input type="text" readOnly value={event.endStr} name="end" id="end" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <h2>Datos Bancarios</h2>
                                        <div className="mb-4">
                                            <label htmlFor="num" className="block text-sm font-medium text-gray-700">Número</label>
                                            <input type="number" onChange={handleChange} value={reserva.num} name="num" id="num" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha Cad</label>
                                            <input type="text" onChange={handleChange} value={reserva.date} placeholder='YY/MM' name="date" id="date" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                            <input type="number" onChange={handleChange} value={reserva.cvv} name="cvv" id="cvv" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Cerrar
                            </button>
                            <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Reservar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

}

export default Modal;
