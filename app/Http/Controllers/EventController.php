<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getEvents(){
        $events = Event::where('available', true)->get();

        $eventsJSON = $events->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'start' => $event->start,
                'end' => $event->end,
            ];
        });
    
        return response()->json($eventsJSON);

    }
}
