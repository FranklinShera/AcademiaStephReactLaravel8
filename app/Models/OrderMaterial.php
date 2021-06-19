<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderMaterial extends Model
{
    use HasFactory;

    protected $fillable = ['material_name','type','order_id'];

    public function order(){
        return $this->belongsTo(Order::class);
    }

}
