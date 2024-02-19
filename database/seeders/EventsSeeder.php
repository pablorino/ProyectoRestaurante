<?php

namespace Database\Seeders;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                // Crea 10 eventos disponibles en los próximos 10 días
                for ($i = 0; $i < 10; $i++) {
                    $start = Carbon::now()->addDays($i)->format('Y-m-d H:i:s');
                    $end = Carbon::now()->addDays($i)->addHours(1)->format('Y-m-d H:i:s');
        
                    Event::factory()->create([
                        'title' => 'Evento ' . ($i + 1),
                        'start' => $start,
                        'end' => $end,
                        'available' => true,
                    ]);
                }
        
    }
}
