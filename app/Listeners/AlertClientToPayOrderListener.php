<?php

namespace App\Listeners;

use App\Events\OrderHasBeenCreatedEvent;
use App\Mail\OrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class AlertClientToPayOrderListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderHasBeenCreatedEvent  $event
     * @return void
     */
    public function handle(OrderHasBeenCreatedEvent $event)
    {
        Mail::to($event->order->client->email)->send(new OrderCreated($event->order->client ,$event->order));
    }
}
