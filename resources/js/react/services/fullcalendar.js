import { Calendar } from 'fullcalendar'

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        events: "getEvents", // Carga los eventos desde el controlador en formato JSON
        eventMouseEnter: function (info) {
            info.el.style.cursor = 'pointer'; // Cambia el cursor cuando pasa por un evento
        },
    })
    calendar.render()
})