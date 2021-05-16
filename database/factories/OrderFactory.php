<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title" => $this->faker->sentence,
            "type_of_paper" => $this->faker->userName,
            "subject_area" => $this->faker->streetAddress,
            "paper_details" => $this->faker->sentence(50),
            "addition_materials" => $this->faker->randomLetter,
            "paper_format" => $this->faker->currencyCode,
            "prefered_english" => $this->faker->languageCode,
            "number_of_sources" => $this->faker->randomDigit,
            "spacing" => "Double Spacing",
            "academic_level" => $this->faker->jobTitle,
            "urgency" => "2 Weeks",
        ];
    }
}
