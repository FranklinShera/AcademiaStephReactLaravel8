<?php

namespace App\Providers;

use App\Events\OrderHasBeenCreatedEvent;
use App\Events\OrderHasBeenPaidEvent;
use App\Listeners\AlertClientToPayOrderListener;
use App\Listeners\NewUnassignedOrderListener;
use App\Models\OrderAssign;
use App\Observers\OrderAssignedObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        OrderHasBeenPaidEvent::class =>[
            NewUnassignedOrderListener::class
        ],
        OrderHasBeenCreatedEvent::class => [
            AlertClientToPayOrderListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        OrderAssign::observe(OrderAssignedObserver::class);
    }
}
