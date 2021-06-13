<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{


    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => date('l jS F Y \@ h:i A',strtotime($this->created_at)),
            'social_accounts' => SocialAccountResource::collection($this->socialAccounts)
        ];
    }
}
