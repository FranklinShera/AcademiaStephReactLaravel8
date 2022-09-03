<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientFeedback extends Model
{
    use HasFactory;

    protected $fillable = ['rating', 'remarks', 'order_id'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

}