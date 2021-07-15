<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'topic' => $this->topic,
            'payment' => new PaymentRecordResource($this->payment),
        ];
    }
}
