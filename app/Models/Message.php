<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id','direction' , 'content'];


    public function client(){
        return $this->belongsTo(Client::class);
    }


    public function conversation(){
        return $this->belongsTo(Conversation::class,'conversation_id');
    }

}
