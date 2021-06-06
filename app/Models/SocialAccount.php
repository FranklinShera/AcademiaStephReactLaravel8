<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    use HasFactory;

    protected $fillable = ['client_id' , 'provider_client_id' , 'provider'];

    public function client(){

        return $this->belongsTo(Client::class);

    }
}
