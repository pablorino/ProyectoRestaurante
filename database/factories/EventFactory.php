<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'start' => $this->faker->dateTime,
            'end' => $this->faker->dateTime,
            'available' => true,
        ];
    }
}
