<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function client(){
        return $this->belongsTo(Client::class);
    }


    public function scopePending($query){
        return $query->where('stage' , 0);
    }


    public function scopeCompleted($query){
        return $query->where('stage' , 1);
    }


}
