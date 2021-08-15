<?php

use App\Http\Controllers\PayPalController;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('paypal/checkout/{order}', [PayPalController::class ,'getExpressCheckout'])->name('paypal.checkout');
Route::get('paypal/checkout-success/{order}', [PayPalController::class ,'getExpressCheckoutSuccess'])->name('paypal.success');
Route::get('paypal/checkout-cancel', [PayPalController::class ,'cancelPage'])->name('paypal.cancel');




//Route::get('/mailtest', function () {
//    $order = Order::latest()->first();
//    $client = $order->client;
//    $writer = $order->orderAssign->writer;
//
////    event(new \App\Events\OrderHasBeenPaidEvent($order));
////    event(new \App\Events\OrderHasBeenCreatedEvent($order));
//
//    //SEND EMAIL TO ASSIGNED WRITER
//    Mail::to($writer->email)->cc(env('MAIL_FROM_ADDRESS'))->send(new \App\Mail\WriterAssigned($writer ,$order));
//
//    //SEND EMAIL TO  NOTIFY CLIENT
////    Mail::to($order->client->email)->cc(env('MAIL_FROM_ADDRESS'))->send(new \App\Mail\OrderReceived($order->client ,$order));
//
////    Mail::to($writer->email)->send(new \App\Mail\WriterAssigned($writer ,$order));
////    Mail::to($client->email)->send(new \App\Mail\OrderCreated($client ,$order));
////    Mail::to($client->email)->send(new \App\Mail\OrderReceived($client ,$order));
//
//    return 'Mail Sent!';
//});



Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
