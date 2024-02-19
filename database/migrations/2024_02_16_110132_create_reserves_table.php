<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reserves', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->integer('numPersonas');
            $table->integer('menu');
            $table->unsignedBigInteger('idUser')->nullable();
            $table->unsignedBigInteger('idEvent');
            $table->unsignedBigInteger('idTarjeta');
            $table->timestamps();

            $table->foreign('idTarjeta')->references('id')->on('tarjetas');
            $table->foreign('idEvent')->references('id')->on('events');
            $table->foreign('idUser')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reserves');
    }
};
