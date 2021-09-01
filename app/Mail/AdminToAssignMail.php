<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminToAssignMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    

    public $order;

    public $btnAssignLink;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct( Order $order)
    {
        $this->order = $order;
        $this->btnAssignLink = $this->order->id .'/'.str_replace(' ','-', $this->order->topic);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.orders.admin_to_assign')
            ->subject('Order Assignment Notification - '.env('APP_NAME'));
    }
}
