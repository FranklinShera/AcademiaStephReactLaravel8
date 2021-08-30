<?php

namespace App\Mail;

use App\Models\Client;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $order;
    public $client;

    /**
     * Create a new message instance.
     *
     * @return void
     */


    public function __construct(Client $client , Order $order)
    {
        $this->order = $order;
        $this->client = $client;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.orders.received')
            ->subject('Order Received Notification - '.env('APP_NAME'));
    }
}
