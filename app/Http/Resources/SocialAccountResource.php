<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SocialAccountResource extends JsonResource
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
            'id' => $this->id,
            'client_id' => $this->client_id,
            'provider_client_id' => $this->provider_client_id,
            'provider' => $this->provider,
            'created_at' => date('l jS F Y \@ h:i A',strtotime($this->created_at)),
        ];
    }
}
