<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ReservaMail;
use App\Models\Event;
use App\Models\Reserva;
use App\Models\Tarjeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ReservaController extends Controller
{
    /**
     * Obtiene todas las reservas y las devuelve como respuesta JSON.
     */
    public function getReservas(Request $request)
    {
        // Verificar si el usuario está autenticado
        $idUser = $request['idUser'];

        // Busca las tarjetas del usuario en la base de datos
        $reservas = Reserva::where('idUser', $idUser)->get();

        $reservasJSON = $reservas->map(function ($reserva) {
            $evento = Event::where('id', $reserva->idEvent)->first();

            return [
                'numPersonas' => $reserva->numPersonas,
                'menu' => $reserva->menu,
                'idUser' => $reserva->idUser,
                'id'=>$reserva->id,
                'start'=>$evento->start,
                'title'=>$evento->title

            ];
        });
    
        return response()->json($reservasJSON);
    }

    public function postReserva(Request $request)
    {
        // Decodificar el JSON recibido en el cuerpo de la solicitud
        $data = $request->json()->all();

        if (isset($data['tarjeta'])) {
            $tarjeta = Tarjeta::find($data['tarjeta']);
        } else {
            $tarjeta = new Tarjeta();
            $tarjeta->num = $data['num'];
            $tarjeta->date = $data['date'];
            $tarjeta->cvv = $data['cvv'];

            $tarjeta->save();

            
        }


        // Crear una nueva reserva utilizando los datos del JSON
        $reserva = new Reserva();
        $reserva->numPersonas = intval($data['numPersonas']);
        $reserva->menu = intval($data['menu']);
        $reserva->name = $data['name'];
        $reserva->email = $data['email'];


        $reserva->idUser = $data['idUser'];

        $reserva->idEvent= $data['idEvent'];

        $reserva->idTarjeta= $tarjeta->id;

        

        $event=Event::where('id', $reserva->idEvent)->first();

        $event->available = false;
        $event->save();
        $reserva->save();

        $email=$reserva->email;
        $numpersonas=$reserva->numPersonas;
        $title=$event->title;
        $start=$event->start;

        if (!isset($reserva->idUser)) {
            Mail::to($email)->send(new ReservaMail( $start, $numpersonas, $title));
        }

        return response()->json(['message' => 'Reserva creada exitosamente']);
    }

    public function putReserva(Request $request)
    {
        // Decodifica el contenido de la solicitud JSON para poder usarlo con objeto en php
        $reserva = json_decode($request->getContent());
        $id = $reserva->id;

        // Busca la reserva por su ID
        $modificar = Reserva::find($id);

        // Verifica si la reserva con el ID proporcionado existe
        if (!$modificar) {
            return response()->json('No se encontró la reserva con el ID proporcionado.');
        }

        // Actualiza los campos de la reserva con los datos
        $modificar->update([
            'personas' => $reserva->personas,
            'menu' => $reserva->menu,
            'dia' => $reserva->dia,
            'hora' => $reserva->hora
        ]);

        // Devuelve un mensaje indicando que la reserva se ha modificado correctamente
        return response()->json('Se ha modificado correctamente');
    }

    public function delete(Request $request)
    {
        $id = $request['id'];

        $reserva=Reserva::find($id);


        $reserva->delete();

        // Devolver una respuesta JSON indicando que la reserva se ha guardado correctamente
        return response()->json(['message' => 'reserva borrada correctamente']);
    }

    public function crearReserva(Request $request)
    {
        // Decodifica el contenido de la solicitud JSON
        $reserva = json_decode($request->getContent());
        $idUser = Auth::id();

        // Crea una nueva reserva en la base de datos
        $crear = Reserva::create([
            'numpersonas' => $reserva->numpersonas,
            'menu' => $reserva->menu,
            'estado' => $reserva->estado,
            'idUser' => $idUser,

        ]);

        // Verifica si se crea correctamente y manda un mensaje
        if ($crear) {
            return response()->json('Se ha creado correctamente');
        } else {
            return response()->json('No se ha creado correctamente');
        }
    }

    public function borrarReserva(Request $request)
    {

        // Decodifica el contenido de la solicitud JSON para poder usarlo con objeto en php
        $reserva = json_decode($request->getContent());
        $id = $reserva->id;
        $idUser = Auth::id();

        $borrar = Reserva::where("id", $id)->where("idUser", $idUser);
        if (!$borrar) {
            return response()->json(/* 'No se encontró la reserva con el ID proporcionado.'+ */$idUser);
        }

        if ($borrar) {
            $borrar->delete();
            // Devuelve un mensaje indicando que la reserva se ha eliminado correctamente
            return response()->json("Se ha borrado correctamente");
        }



        // Verifica si la reserva con el ID existe


    }


    public function obtenerMisReservas()
    {
        $idUser = Auth::id();
        $reservas = Reserva::where("idUser", $idUser)->get();

        return response()->json($reservas);
    }
}
