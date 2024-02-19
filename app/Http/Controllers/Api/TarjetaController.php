<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarjeta;

class TarjetaController extends Controller
{
    public function index(Request $request)
    {
        // Verificar si el usuario está autenticado
        $idUser = $request['idUser'];

        // Busca las tarjetas del usuario en la base de datos
        $tarjetas = Tarjeta::where('idUser', $idUser)->get();

        $tarjetasJSON = $tarjetas->map(function ($tarjeta) {
            return [
                'num' => $tarjeta->num,
                'date' => $tarjeta->date,
                'cvv' => $tarjeta->cvv,
                'idUser' => $tarjeta->idUser,
                'id'=>$tarjeta->id
            ];
        });
    
        return response()->json($tarjetasJSON);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();
        // Crear una nueva instancia de Tarjeta con los datos recibidos
        $tarjeta = new Tarjeta();
        $tarjeta->num = $data['num'];
        $tarjeta->date= $data['date'];
        $tarjeta->cvv= $data['cvv'];
        $tarjeta->idUser= $data['idUser'];

        $tarjeta->save();

        // Devolver una respuesta JSON indicando que la tarjeta se ha guardado correctamente
        return response()->json(['message' => 'Tarjeta guardada correctamente']);
    }

    public function delete(Request $request)
    {
        $id = $request['id'];

        $tarjeta=Tarjeta::find($id);


        $tarjeta->delete();

        // Devolver una respuesta JSON indicando que la tarjeta se ha guardado correctamente
        return response()->json(['message' => 'Tarjeta borrada correctamente']);
    }
}
