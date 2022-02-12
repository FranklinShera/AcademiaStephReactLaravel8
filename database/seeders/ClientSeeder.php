<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::create([
            'name' => 'First Client',
            'email' => 'client@as21.com',
            'password' => Hash::make('123456789'),
            'country' => 'Kenya',
            'mobile' => '0712345678'
        ]);
    }
}