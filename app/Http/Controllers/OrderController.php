<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
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


        if($request->has("additional_materials")){

            $newOrderMaterial = $request->validate([
                    "additional_materials" => ['required' , 'file' , new AdditionMaterialTypeValidation()],
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


            $materialFile =  $request->file('additional_materials');
            $materialFileName = time()."ORDER".strtolower(str_replace(' ', '_',$materialFile->getClientOriginalName()));


            if( $materialFile->storeAs('public/order/materials/', $materialFileName )){


                $newOrderMaterial['additional_materials'] = $materialFileName;

                $newOrderMaterial['client_id'] = currentClient()->id;

                Order::create($newOrderMaterial);

                return response('Order Created!', Response::HTTP_CREATED);

            }else{

                return response('Can not Create Order!', Response::HTTP_FORBIDDEN);

            }

        }else{

            $newOrder['client_id'] = currentClient()->id;

            Order::create($newOrder);

            return response('Order Created!', Response::HTTP_CREATED);

        }

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
