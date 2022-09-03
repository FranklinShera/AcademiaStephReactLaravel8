<?php

namespace Database\Factories;

use App\Models\CustomerReview;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CustomerReview::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'customer_name' => $this->faker->name(),
            'rating' => $this->faker->randomFloat(1, 0, 5),
            'remarks' => $this->faker->realText(170),

        ];
    }
}