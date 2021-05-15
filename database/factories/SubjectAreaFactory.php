<?php

namespace Database\Factories;

use App\Models\SubjectArea;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubjectAreaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SubjectArea::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'area_name' => $this->faker->streetAddress(),
            'active' => $this->faker->boolean(),
        ];
    }
}
