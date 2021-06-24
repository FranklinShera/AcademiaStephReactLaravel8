<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderMaterial;
use App\Rules\AdditionMaterialTypeValidation;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{

    public function clientOrders()
    {

        $orders = Order::where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }

    public function adminOrders()
    {

        $orders = Order::orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function clientOrder(Request $request, Order $order)
    {
        if($order->client_id != currentClient()->id){

            return response()->json(['error' => "You Are Not The Owner Of The Order Requested!"] , Response::HTTP_FORBIDDEN);

        }

        return new OrderResource($order);

    }

    public function clientOrderAddMaterial(Request $request, Order $order)
    {
        if($order->client_id != currentClient()->id){

            return response()->json(['error' => "You Are Not Authorised To This Function!"] , Response::HTTP_FORBIDDEN);

        }


        $request->validate([
            "additional_materials" => ['required' , 'file' , new AdditionMaterialTypeValidation()]
        ]);

        $newOrderMaterial = [];

        $materialFile =  $request->file('additional_materials');
        $materialFileName = "ORDER_".time()."_".strtolower(str_replace(' ', '_',$materialFile->getClientOriginalName()));


        if( $materialFile->storeAs('public/order/materials/', $materialFileName )){

            $newOrderMaterial['material_name'] = $materialFileName;
            $newOrderMaterial['type'] = $materialFile->getClientOriginalExtension();
            $newOrderMaterial['order_id'] = $order->id;

            OrderMaterial::create($newOrderMaterial);

            return response()->json(['message' => "Material Added!"] , Response::HTTP_CREATED);

        }else{

            return response()->json(['message' => "Can't Save Material!"] , Response::HTTP_BAD_REQUEST);

        }

    }


    public function adminOrder(Request $request, Order $order)
    {
        if(!$order){

            return response()->json(['error' => "The Order Requested was Not Found!"] , Response::HTTP_FORBIDDEN);

        }

        return new OrderResource($order);

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



    public function clientActiveOrders()
    {

        $orders = Order::active()->where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(5);

        return OrderResource::collection($orders);

    }

    public function clientCompletedOrders()
    {

        $orders = Order::completed()->where('client_id' , currentClient()->id)->orderBy('created_at' , 'DESC')->paginate(5);

        return OrderResource::collection($orders);

    }


    public function adminPendingOrders()
    {

        $orders = Order::pending()->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function adminCancelledOrders()
    {

        $orders = Order::cancelled()->orderBy('created_at' , 'DESC')->paginate(10);

        return OrderResource::collection($orders);

    }



    public function adminActiveOrders()
    {

        $orders = Order::active()->orderBy('created_at' , 'DESC')->paginate(5);

        return OrderResource::collection($orders);

    }



    public function adminCompletedOrders()
    {

        $orders = Order::completed()->orderBy('created_at' , 'DESC')->paginate(5);

        return OrderResource::collection($orders);

    }




    public function create(Request $request)
    {
        $newOrder = $request->validate([
                       "topic" => 'required|string|min:8',
                       "type_of_paper" => 'required|string',
                       "subject_area" => 'required|string',
                       "paper_details" => 'required|string',
                       "paper_format" => 'required|string',
                       "prefered_english" => 'required|string',
                       "number_of_sources" => 'required|string',
                       "spacing" => 'required|string',
                       "academic_level" => 'required|string',
                       "number_of_pages" => 'required|string',
                       "urgency" => 'required|string'
                    ]);


            $newOrder['client_id'] = currentClient()->id;

            $createdOrder = Order::create($newOrder);



        if($request->has("additional_materials") && $createdOrder){

            $request->validate([
                "additional_materials" => ['required' , 'file' , new AdditionMaterialTypeValidation()]
            ]);


            $materialFile =  $request->file('additional_materials');
            $materialFileName = "ORDER_".time()."_".strtolower(str_replace(' ', '_',$materialFile->getClientOriginalName()));


            if( $materialFile->storeAs('public/order/materials/', $materialFileName )){

                $newOrderMaterial['material_name'] = $materialFileName;
                $newOrderMaterial['type'] = $materialFile->getClientOriginalExtension();
                $newOrderMaterial['order_id'] = $createdOrder->id;

                OrderMaterial::create($newOrderMaterial);

            }

        }


        return response()->json(['message' => 'Order Created!'] , Response::HTTP_CREATED);

    }






    public function update(Request $request, Order $order)
    {
        //
    }



    public function destroy(Order $order)
    {
        //
    }
}
