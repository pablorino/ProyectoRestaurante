import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MisReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/ProyectoRestaurante/public/login';
        } else {
            obtenerReservas(localStorage.getItem('id'));
        }
    }, []);

    const obtenerReservas = () => {
        const url = 'api/reservas';
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
                throw new Error('Error al obtener las reservas');
            })
            .then(result => {
                console.log(result);
                setReservas(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const eliminarReserva = (id) => {
        const url = 'api/borrarreserva';
        const data = { id: id };

        const options = {
            method: 'DELETE',
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
                throw new Error('Error al borrar la reserva');
            })
            .then(result => {
                console.log(result);
                obtenerReservas();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




return (
    <div className='mt-24'>
        <div className="p-4">
            <Link to="/ProyectoRestaurante/public/calendar">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded absolute top-24 right-4">
                    Añadir Reserva
                </button>
            </Link>

            <h2 className="text-xl font-bold mb-4">Mis Reservas</h2>
            <ul>
                {reservas.map((reserva) => (
                    <li className="mb-4">
                        <div className="relative bg-white p-4 rounded-lg shadow-md">
                            <p className="text-lg mb-2"><span className="font-semibold">Título del evento:</span> {reserva.title}</p>
                            <p className="text-lg mb-2"><span className="font-semibold">Número de personas:</span> {reserva.numPersonas}</p>
                            <p className="text-lg mb-2"><span className="font-semibold">Menú:</span> {reserva.menu}</p>
                            <p className="text-lg mb-2"><span className="font-semibold">Fecha de inicio:</span> {reserva.start}</p>
                            <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    </div>
);

};
export default MisReservas;
