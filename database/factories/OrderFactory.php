<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
            "topic" => $this->faker->sentence,
            "type_of_paper" => $this->faker->userName,
            "subject_area" => $this->faker->streetAddress,
            "paper_details" => $this->faker->sentence(50),
            "additional_materials" => "/orders/materials/".Str::random(12).".zip",
            "paper_format" => $this->faker->currencyCode,
            "prefered_english" => $this->faker->languageCode,
            "number_of_sources" => $this->faker->randomDigit,
            "number_of_pages" => $this->faker->randomDigit,
            "spacing" => "Double Spacing",
            "academic_level" => $this->faker->jobTitle,
            "urgency" => "2 Weeks",
            "stage" => 0,
            "service_type" => 1,
            "client_id" => 1,
        ];
    }
}