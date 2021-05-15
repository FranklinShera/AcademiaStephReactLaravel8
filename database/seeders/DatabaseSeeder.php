<?php

namespace Database\Seeders;

use App\Models\CustomerReview;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
            $this->call([
                AcademicLevelSeeder::class,
                PaperTypeSeeder::class,
                CustomerReviewSeeder::class,
                SubjectAreaSeeder::class
            ]);
    }
}
