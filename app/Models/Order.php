<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "topic",
        "type_of_paper",
        "subject_area",
        "paper_details",
        "paper_format",
        "prefered_english",
        "number_of_sources",
        "spacing",
        "academic_level",
        "number_of_pages",
        "urgency",
        "stage",
        "client_id",
        "cost"
    ];


    public function payment()
    {
        return $this->hasOne(Payment::class);
    }


    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function orderMaterials(){
        return $this->hasMany(OrderMaterial::class);
    }

    public function scopePending($query){
        return $query->where('stage' , 0);
    }

    public function scopeUnassigned($query){
        return $query->where('stage' , 4);
    }


    public function scopeActive($query){
        return $query->where('stage' , 2);
    }


    public function scopeCancelled($query){
        return $query->where('stage' , 3);
    }


    public function scopeCompleted($query){
        return $query->where('stage' , 1);
    }


}
