<?php

namespace App\Mail;

use App\Models\Client;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $client;
    public $btnPayLink;

    /**
     * Create a new message instance.
     *
     * @return void
     */


    public function __construct(Client $client , Order $order)
    {
        $this->order = $order;
        $this->client = $client;
        $this->btnPayLink = $this->order->id .'/'.str_replace(' ','-', $this->order->topic);

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.orders.created')
            ->subject('Order Payment Reminder - '.env('APP_NAME'));
    }
}
