<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminToAssignMail extends Mailable
{
    use Queueable, SerializesModels;

    public $adminName;

    public $order;

    public $btnAssignLink;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($adminName, Order $order)
    {
        $this->order = $order;
        $this->adminName = $adminName;
        $this->btnAssignLink = $this->order->id .'/'.str_replace(' ','-', $this->order->topic);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.orders.admin_to_assign');
    }
}
