<?php

namespace Database\Seeders;

use App\Models\SubjectArea;
use Illuminate\Database\Seeder;

class SubjectAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubjectArea::factory(10)->create();
    }
}
