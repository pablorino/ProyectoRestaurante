<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reserves';
    protected $fillable = [
        'email',
        'name',
        'numpersonas',
        'menu',
        'idUser',
        'idEvent',
    ];
    
    public function user(){
        return $this->belongsTo(User::class,'idUser');
    }

    public function horario(){
        return $this->belongsTo(Event::class,'idEvent');
    }

}
