<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientFeedbackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $clientName = $this->order->client->name;
        $clientFirstName = explode(' ' ,$clientName)[0];

        return [
//            'id' => $this->id,
            'customer_name' => $clientFirstName,
            'rating' => $this->rating,
            'remarks' => $this->remarks,
            'created_at' => Date('jS M Y', strtotime($this->created_at)),
        ];
    }
}
