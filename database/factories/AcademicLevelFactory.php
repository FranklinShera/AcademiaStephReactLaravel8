<?php

namespace Database\Factories;

use App\Models\AcademicLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicLevelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AcademicLevel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'level_name' => $this->faker->jobTitle(),
            'active' => $this->faker->boolean(),
        ];
    }
}
