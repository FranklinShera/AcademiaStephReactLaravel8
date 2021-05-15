<?php

namespace Database\Seeders;

use App\Models\PaperType;
use Illuminate\Database\Seeder;

class PaperTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PaperType::factory(10)->create();
    }
}
