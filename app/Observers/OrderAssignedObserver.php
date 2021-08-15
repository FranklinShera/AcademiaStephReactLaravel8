<?php

namespace App\Observers;

use App\Mail\OrderReceived;
use App\Mail\WriterAssigned;
use App\Models\OrderAssign;
use Illuminate\Support\Facades\Mail;

class OrderAssignedObserver
{

    public $afterCommit = true;
    /**
     * Handle the OrderAssign "created" event.
     *
     * @param  \App\Models\OrderAssign  $orderAssign
     * @return void
     */

    public function created(OrderAssign $orderAssign)
    {
        //SEND EMAIL TO ASSIGNED WRITER
        Mail::to($orderAssign->writer->email)->cc(env('MAIL_FROM_ADDRESS'))->send(new WriterAssigned($orderAssign->writer ,$orderAssign->order));

        //SEND EMAIL TO  NOTIFY CLIENT
        Mail::to($orderAssign->order->client->email)->cc(env('MAIL_FROM_ADDRESS'))->send(new OrderReceived($orderAssign->order->client ,$orderAssign->order));

    }

    /**
     * Handle the OrderAssign "updated" event.
     *
     * @param  \App\Models\OrderAssign  $orderAssign
     * @return void
     */
    public function updated(OrderAssign $orderAssign)
    {
        //
    }

    /**
     * Handle the OrderAssign "deleted" event.
     *
     * @param  \App\Models\OrderAssign  $orderAssign
     * @return void
     */
    public function deleted(OrderAssign $orderAssign)
    {
        //
    }

    /**
     * Handle the OrderAssign "restored" event.
     *
     * @param  \App\Models\OrderAssign  $orderAssign
     * @return void
     */
    public function restored(OrderAssign $orderAssign)
    {
        //
    }

    /**
     * Handle the OrderAssign "force deleted" event.
     *
     * @param  \App\Models\OrderAssign  $orderAssign
     * @return void
     */
    public function forceDeleted(OrderAssign $orderAssign)
    {
        //
    }
}
