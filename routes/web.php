<?php

use App\Http\Controllers\PayPalController;
use App\Models\Order;
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




Route::get('/mailtest', function () {
    $order = Order::latest()->first();

    dd($order);
    return view('mails.orders.writer_assigned');
});



Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
