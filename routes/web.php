<?php

use App\Http\Controllers\PayPalController;
use Illuminate\Support\Facades\Route;


Route::get('paypal/checkout/{order}', [PayPalController::class ,'getExpressCheckout'])->name('paypal.checkout');
Route::get('paypal/checkout-success/{order}', [PayPalController::class ,'getExpressCheckoutSuccess'])->name('paypal.success');
Route::get('paypal/checkout-cancel', [PayPalController::class ,'cancelPage'])->name('paypal.cancel');



Route::get('/{any}', function () {

    return view('welcome');

})->where('any', '.*');
