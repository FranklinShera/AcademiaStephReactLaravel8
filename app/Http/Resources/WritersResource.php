<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WritersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'speciality' => $this->speciality,
            'created_at' => date('H:i   -  j M Y', strtotime($this->created_at))
        ];
    }
}
