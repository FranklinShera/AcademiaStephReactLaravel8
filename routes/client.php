<?php

use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::post('/client-login', [ClientAuthController::class, 'login']);
Route::post('/autoclient', [ClientAuthController::class, 'autoClient']);
Route::post('/client-register', [ClientAuthController::class, 'register']);

Route::middleware(['tokencookie', 'isClient'])->prefix('/auth/client')->group(function () {

    Route::post('/', [ClientAuthController::class, 'profile']);
    Route::get('/analytics', [ClientAuthController::class, 'analytics']);
    Route::post('/refresh-token', [ClientAuthController::class, 'refresh']);
    Route::post('/client-logout', [ClientAuthController::class, 'logout']);

    //CLIENT FEEDBACK
    Route::post('/feedback', [ClientFeedbackController::class, 'create']);

    //PAYMENTS
    Route::get('/order-payments', [PaymentController::class, 'index']);

    //MESSAGE
    Route::get('/messages', [MessageController::class, 'clientIndex']);
    Route::post('/message', [MessageController::class, 'clientCreate']);

    //ORDER MATERIAL
    Route::post('/add-material/{order}', [OrderController::class, 'clientOrderAddMaterial']);
    Route::delete('/material/{orderMaterial}', [OrderController::class, 'destroyMaterial']);

    //   ORDERS
    Route::post('/orders', [OrderController::class, 'create']);
    Route::get('/orders', [OrderController::class, 'clientOrders']);
    Route::get('/order/{order}', [OrderController::class, 'clientOrder']);
    Route::get('/orders-pending', [OrderController::class, 'clientPendingOrders']);

    Route::post('/cancel-order/{order}', [OrderController::class, 'clientOrderCancel']);

    Route::get('/orders-cancelled', [OrderController::class, 'clientCancelledOrders']);
    Route::get('/orders-active', [OrderController::class, 'clientActiveOrders']);
    Route::get('/orders-completed', [OrderController::class, 'clientCompletedOrders']);

});