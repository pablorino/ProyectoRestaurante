import React, { useState, useEffect } from 'react';

const MisTarjetas = () => {
    const [tarjetas, setTarjetas] = useState([]);
    const [num, setNum] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/ProyectoRestaurante/public/login';
        } else {
            obtenerTarjetas(localStorage.getItem('id'));
        }
    }, []);

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

    const eliminarTarjeta = (id) => {
        const url = 'api/borrartarjeta';
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
                throw new Error('Error al borrar la tarjeta');
            })
            .then(result => {
                console.log(result);
                obtenerTarjetas();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleAgregarTarjeta = () => {
        const nuevaTarjeta = {
            num: num,
            date: date,
            cvv: cvv,
            idUser: localStorage.getItem('id')
        };
        const url = 'api/creartarjeta';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaTarjeta)
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    obtenerTarjetas();
                    setNum('');
                    setDate('');
                    setCvv('');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setErrorMessage(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='mt-24'>
            <div className="p-4">
                <button onClick={() => setModalOpen(true)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded absolute top-24 right-4">
                    Añadir Tarjeta
                </button>
                <h2 className="text-xl font-bold mb-4">Mis Tarjetas</h2>
                <ul>
                    {tarjetas.map((tarjeta, index) => (
                        <li className="mb-4" key={index}>
                            <div className="relative bg-white p-4 rounded-lg shadow-md">
                                <p className="text-lg mb-2"><span className="font-semibold">Número de tarjeta:</span> {tarjeta.num}</p>
                                <p className="text-lg mb-2"><span className="font-semibold">Fecha de caducidad:</span> {tarjeta.date}</p>
                                <p className="text-lg mb-2"><span className="font-semibold">CVV:</span> {tarjeta.cvv}</p>
                                <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => eliminarTarjeta(tarjeta.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {modalOpen &&
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Agregar Nueva Tarjeta</h3>
                        <div className="mb-4">
                            <label htmlFor="num" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                            <input type="text" id="num" value={num} onChange={(e) => setNum(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Número" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha de caducidad</label>
                            <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Fecha" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="CVV" required />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => { handleAgregarTarjeta(); setModalOpen(false); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Agregar Tarjeta
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MisTarjetas;
