<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentRecordResource extends JsonResource
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
            'order_id' => $this->order_id,
            'paypal_order_id' => $this->paypal_order_id,
            'payment_no' => $this->payment_no,
            'amount' => $this->amount,
            'created_at' => date('H:i   -  j M Y', strtotime($this->created_at))
        ];
    }
}
