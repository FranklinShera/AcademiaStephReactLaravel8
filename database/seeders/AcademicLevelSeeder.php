<?php

namespace Database\Seeders;

use App\Models\AcademicLevel;
use Illuminate\Database\Seeder;

class AcademicLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AcademicLevel::factory(10)->create();
    }
}
