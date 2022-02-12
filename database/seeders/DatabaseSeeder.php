<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
            User::create([
                'name' => 'Admin One',
                'email' => 'admin@as21.com',
                'password' =>  Hash::make('123456789'),
                'email_verified_at'=> now(),
                'role' =>  1
            ]);


            $this->call([
                AcademicLevelSeeder::class,
                PaperTypeSeeder::class,
                CustomerReviewSeeder::class,
                SubjectAreaSeeder::class,
                OrderSeeder::class,
                ClientSeeder::class
            ]);
    }
}