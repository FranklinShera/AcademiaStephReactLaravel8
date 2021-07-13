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

        $createOrderRquest = new OrdersCreateRequest();
        $createOrderRquest->headers["prefer"] = "return=representation";

        $createOrderRquest->body = $this->simpleCheckoutData($orderId);

        return $this->client->execute($createOrderRquest);
    }



    public function captureOrder($paypalOrderId)
    {

        $captureOrderRequest = new OrdersCaptureRequest($paypalOrderId);

        return $this->client->execute($captureOrderRequest);

    }


    private function simpleCheckoutData($orderId)
    {
        $order = Order::findOrfail($orderId);

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
