<?php

namespace Database\Factories;

use App\Models\PaperType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaperTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PaperType::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'type_name' => $this->faker->userName(),
            'active' => $this->faker->boolean(),
        ];
    }
}
