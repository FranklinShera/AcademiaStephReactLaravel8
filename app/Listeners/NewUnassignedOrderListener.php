<?php

namespace App\Listeners;

use App\Events\OrderHasBeenPaidEvent;
use App\Mail\AdminToAssignMail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NewUnassignedOrderListener
{
    public $admins;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //INFORM ADMIN TO ASSIGN
        $this->admins = ['academiasteph21@gmail.com' , 'stephenkimani787@gmail.com'];
//        $this->admins = User::where('role',0)->get()->pluck('email');
    }

    /**
     * Handle the event.
     *
     * @param  OrderHasBeenPaidEvent  $event
     * @return void
     */
    public function handle(OrderHasBeenPaidEvent $event)
    {

        Mail::to($this->admins)->cc(env('MAIL_FROM_ADDRESS'))->send(new AdminToAssignMail($event->order));

    }
}
