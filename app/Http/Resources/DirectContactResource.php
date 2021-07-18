<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DirectContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'message'  => $this->message,
            'email' => $this->email,
            'whatsappnumber' => $this->whatsappnumber,
            'mailback' => $this->mailback,
            'addonwhatsapp' => $this->addonwhatsapp,
            'created_at' => date('H:i   -  j M Y', strtotime($this->created_at))
        ];
    }
}
