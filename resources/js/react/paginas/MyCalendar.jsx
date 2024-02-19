import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ModalReserva from '../components/ModalReserva'

export default function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para almacenar el evento seleccionado

    const getEvents=()=>{
        fetch('/ProyectoRestaurante/public/api/getEvents')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => {
                console.error('Error al obtener los eventos:', error);
            });
    }
    useEffect(() => {
        getEvents()
    }, []); 

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    const handleEventMouseEnter = (info) => {
        info.el.style.cursor = 'pointer';
    }

    return (
        <div className=' mt-32'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventMouseEnter={handleEventMouseEnter}
                eventClick={handleEventClick} // Asigna la función de clic de evento
            />
            {selectedEvent && <ModalReserva event={selectedEvent} getEvents={getEvents} onClose={() => setSelectedEvent(null)} />} 
            
        </div>
    );
}
