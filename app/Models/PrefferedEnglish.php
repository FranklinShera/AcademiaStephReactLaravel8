<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrefferedEnglish extends Model
{
    use HasFactory;

    protected $fillable = ['lang_name' , 'active'];

    public function scopeActive($query){
        return $query->where('active' , 1);
    }

}
