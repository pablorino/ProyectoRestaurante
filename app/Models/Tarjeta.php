<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarjeta extends Model
{
    use HasFactory;

    protected $table='tarjetas';

    protected $primaryKey= 'id';

    protected $fillable=['cvv','date','num','idUser'];

    public function user(){
        return $this->belongsTo(User::class,'idUser');
    }

}
