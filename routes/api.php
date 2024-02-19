<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TarjetaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('reservas', [ReservaController::class, 'getReservas']);
Route::delete('borrarreserva', [ReservaController::class, 'delete']);

Route::post('tarjetas', [TarjetaController::class, 'index']);
Route::post('creartarjeta', [TarjetaController::class, 'store']);
Route::delete('borrartarjeta', [TarjetaController::class, 'delete']);

Route::post('/login', [AuthController::class, 'loginUser'])->name('login');
Route::post('/create', [AuthController::class, 'createUser'])->name('create');
Route::get('/getEvents', [EventController::class, 'getEvents'])->name('getEvents');

Route::post('/createR', [ReservaController::class, 'postReserva'])->name('createR');
