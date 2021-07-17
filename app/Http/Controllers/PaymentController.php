<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{


    public function index()
    {
        $payments = currentClient()->orders()->with('payment')->get();

        return response()->json($payments , 200);

    }





    public function adminIndex()
    {
        $adminPayments = Order::with('payment')->paginate(10)->sortByDesc( function($query){
            return $query->orderBy('payment.created_at');
        });

        return PaymentResource::collection($adminPayments);

    }



}
