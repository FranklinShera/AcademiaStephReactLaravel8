<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Writer extends Model
{
    use HasFactory;

    protected $fillable = ['name','email' ,'phone','speciality'];


    public function orderAssign(){
        return $this->hasMany(OrderAssign::class);
    }

}
