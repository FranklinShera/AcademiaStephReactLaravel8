<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAssign extends Model
{
    use HasFactory;

    protected $fillable = ['order_id' , 'writer_id'];


    public function order(){
        return $this->hasOne(Order::class , 'id' , 'order_id');
    }

    public function writer(){
        return $this->hasOne(Writer::class , 'id','writer_id');
    }

}
