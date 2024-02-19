<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservaMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $start;
    public $numpersonas;
    public $title;


    public function __construct($start,$numpersonas,$title)
    {
        $this->start = $start;
        $this->numpersonas = $numpersonas;
        $this->title = $title;
    }


    public function build(){
        return $this->view('reservamail');
    }
}
