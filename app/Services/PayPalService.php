<?php

namespace App\Services;

use App\Models\Order;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

class PayPalService
{

    private $client;

    function __construct()
    {
        $environment = new SandboxEnvironment(env('PAYPAL_CLIENT_ID'), env('PAYPAL_SECRET'));
        $this->client = new PayPalHttpClient($environment);
    }

    public function createOrder($orderId)
    {

        $request = new OrdersCreateRequest();
        $request->headers["prefer"] = "return=representation";

         $request->body = $this->simpleCheckoutData($orderId);

        return $this->client->execute($request);
    }

    public function captureOrder($paypalOrderId)
    {
        $request = new OrdersCaptureRequest($paypalOrderId);

        return $this->client->execute($request);
    }


    private function simpleCheckoutData($orderId)
    {
        $order = Order::find($orderId);

        return [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "reference_id" => 'acs21_'. uniqid(),
                "amount" => [
                    "value" => $order->cost,
                    "currency_code" => "USD"
                ]
            ]],
            "application_context" => [
                "cancel_url" => route('paypal.cancel'),
                "return_url" => route('paypal.success', $orderId)
            ]
        ];
    }


}
