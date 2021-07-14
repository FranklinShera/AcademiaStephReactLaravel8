<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Services\PayPalService;


class PayPalController extends Controller
{
    private $paypalService;

    function __construct(PaypalService $paypalService){

        $this->paypalService = $paypalService;

    }


    public function getExpressCheckout($orderId)
    {

        $response = $this->paypalService->createOrder($orderId);

        if($response->statusCode !== 201) {
            abort(500);
        }

        $order = Order::findOrfail($orderId);

        $order->paypal_order_id = $response->result->id;
        $order->save();


        foreach ($response->result->links as $link) {
            if($link->rel == 'approve') {
                return redirect($link->href);
            }
        }

    }


    public function cancelPage()
    {
        return redirect('/client/dashboard/payment-failed');
    }


    public function getExpressCheckoutSuccess(Request $request, $orderId)
    {

        $order = Order::findOrfail($orderId);



        $response = $this->paypalService->captureOrder($order->paypal_order_id);



        if ($response->result->status == 'COMPLETED') {

             Payment::create([
                'order_id' => $order->id,
                'paypal_order_id' => $order->paypal_order_id,
                'payment_no' => 'acs21_'. uniqid(),
                'amount' => $order->cost
            ]);

            $order->stage = 2;
            $order->save();


            return redirect('/client/dashboard/payment-successful');

        }

        return redirect('/client/dashboard/orders/sent');


    }


}
