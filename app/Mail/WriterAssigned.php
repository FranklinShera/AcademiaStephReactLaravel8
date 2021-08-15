<?php

namespace App\Mail;

use App\Models\Order;
use App\Models\Writer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WriterAssigned extends Mailable
{
    use Queueable, SerializesModels;

    public $writer;
    public $order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Writer $writer , Order $order)
    {

        $this->order = $order;
        $this->writer = $writer;
        foreach ($order->orderMaterials as $material) {

            $this->attach(public_path('/storage/order/materials/' . $material->material_name));
        }
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.orders.writer_assigned')
            ->subject('Order Assignment Notification - '.env('APP_NAME'));
    }
}
