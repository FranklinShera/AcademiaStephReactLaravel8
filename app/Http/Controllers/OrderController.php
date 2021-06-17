<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function clientOrders()
    {

        $orders = Order::where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function clientPendingOrders()
    {

        $orders = Order::pending()->where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function clientCancelledOrders()
    {

        $orders = Order::cancelled()->where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function clientCompletedOrders()
    {

        $orders = Order::completed()->where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(5);

        return OrderResource::collection($orders);

    }




    public function store(Request $request)
    {
        //
    }

    public function show(Order $order)
    {
        //
    }


    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
