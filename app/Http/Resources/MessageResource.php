<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'conversation_id' => $this->conversation_id,
            'content' => $this->content,
            'direction' => $this->direction,
            'created_at' => date('H:i   ,  j M Y', strtotime($this->created_at))
        ];
    }
}
