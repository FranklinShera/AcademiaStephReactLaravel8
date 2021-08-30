<?php

namespace App\Providers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
//use Laravel\Sanctum\PersonalAccessToken;
//use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Queue;
use Illuminate\Queue\Events\JobFailed;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {


        //Event If Queue is failing
        Queue::failing(function (JobFailed $event) {

            Log::channel('slack')->error("Queue Failing Job",[
                'Connection Name' =>$event->connectionName,
                'Job' => $event->job,
                'Exception' => $event->exception,
            ]);

        });


//        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
