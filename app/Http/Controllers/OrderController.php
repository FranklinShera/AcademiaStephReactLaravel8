<?php

namespace App\Http\Controllers;

use App\Events\OrderHasBeenCreatedEvent;
use App\Http\Resources\OrderResource;
use App\Models\AcademicLevel;
use App\Models\Order;
use App\Models\OrderAssign;
use App\Models\OrderMaterial;
use App\Models\PaperType;
use App\Models\SubjectArea;
use App\Models\Writer;
use App\Rules\AdditionMaterialTypeValidation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    

    public function clientOrderCancel(Request $request, Order $order)
    {
        if($order->stage == 4){
            $order->stage = 3;

            $order->save();

            return response()->json(['message' =>"Order Has Been Canceled!"] , Response::HTTP_OK);

        }


        return response()->json(['message' =>"Failed To Cancel Order!"] , Response::HTTP_FORBIDDEN);

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
        $materialFileName = "ORDER_".$order->id."_".time()."_".strtolower(str_replace(' ', '_',$materialFile->getClientOriginalName()));


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




    public function adminAssignOrder(Order $order, Writer $writer)
    {


        if($order->stage == 4){
            //CONSTRAIN TO BE UNIQUE ASSIGN

                 if( OrderAssign::create([
                     'order_id' => $order->id,
                     'writer_id' => $writer->id
                 ])){

                     $order->stage = 2;
                     $order->save();
                 }


            return response()->json(['message' =>"Order Has Been Assigned To $writer->name"] , Response::HTTP_OK);

        }


        return response()->json(['message' =>"Failed To Assign Order!"] , Response::HTTP_FORBIDDEN);

    }






    public function adminCompleteOrder(Order $order)
    {

        if($order->stage == 2){

                     $order->stage = 1;
                     $order->save();

            return response()->json(['message' =>"Order Has Been Marked Complete"] , Response::HTTP_OK);

        }


        return response()->json(['message' =>"Failed To Complete Order!"] , Response::HTTP_FORBIDDEN);

    }







    public function adminOrder(Request $request, Order $order)
    {
        if(!$order){
            return response()->json(['error' => "The Order Requested was Not Found!"] , Response::HTTP_FORBIDDEN);
        }

        if($order->viewed == 0){

                $order->viewed = 1;
                $order->save();
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


    public function adminUnassignedOrders()
    {

        $orders = Order::unassigned()->orderBy('created_at' , 'DESC')->paginate(10);

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



    private function orderPrice($paperRate , $subjectRate ,$levelRate , $pages , $spacing , $urgency ,$serviceDed){

        $multi =  $pages * $spacing;

            $rates = $paperRate + $subjectRate + $levelRate;

            $orderSubTotal = $multi * $rates;

            $deduction = $urgency * 0.2;


            $totalDeduction =  ($deduction > 0.6) ?  0.6  : $deduction ;


            $orderTotal =  ($urgency > 1 || $urgency == 1) ? $orderSubTotal - $totalDeduction : $orderSubTotal + $totalDeduction;



        return  ($orderTotal - $serviceDed);
    }


    

    private function fixUrgency($urgency) {

        $orderUrgency = "";

        if($urgency > 60){
            $orderUrgency = ($urgency / 30)." Month(s)";
        }else  if($urgency == 14){
            $orderUrgency = "2 Weeks";
        }else  if($urgency < 1){
            $orderUrgency =  ($urgency * 24)." Hours";
        }else  if($urgency < 14 ){
            $orderUrgency = $urgency." Day(s)";
        }


        return $orderUrgency;

    }




    public function create(Request $request)
    {


        $newOrder = $request->validate([
                       "topic" => 'required|string|min:8',
                       "type_of_paper" => 'required',
                       "subject_area" => 'required',
                       "paper_details" => 'required|string',
                       "paper_format" => 'required|string',
                       "prefered_english" => 'required|string',
                       "number_of_sources" => 'required|string',
                       "spacing" => 'required',
                       "academic_level" => 'required',
                       "number_of_pages" => 'required|string',
                       "urgency" => 'required',
                       "service_type" => 'required'
                    ]);


            $paperType = PaperType::findOrfail($newOrder['type_of_paper']);
            $subjectArea = SubjectArea::findOrfail($newOrder['subject_area']);
            $academicLevel = AcademicLevel::findOrfail($newOrder['academic_level']);

            $serviceDeduction =  [  1 => 2,  2 => 4 ][$newOrder['service_type']] ?? 0;




            $orderPrice = $this->orderPrice($paperType->rate ,$subjectArea->rate ,$academicLevel->rate ,$newOrder['number_of_pages'] , $newOrder['spacing'] , $newOrder['urgency'] , $serviceDeduction);

            $newOrder['urgency'] = $this->fixUrgency($newOrder['urgency']);


            $newOrder['spacing'] = ($newOrder['spacing'] == 1) ? "Single Spacing" : "Double Spacing";

            $newOrder['service_type'] = [0 =>  "Writing" , 1 => "Rewriting" , 2 => "Editing"][$newOrder['service_type']] ?? "";


            $newOrder['type_of_paper'] = $paperType->type_name;
            $newOrder['subject_area'] = $subjectArea->area_name;
            $newOrder['academic_level'] = $academicLevel->level_name;

            $newOrder['client_id'] = currentClient()->id;
            $newOrder['cost'] = $orderPrice;

            $createdOrder = Order::create($newOrder);



        if($request->has("additional_materials")  && $createdOrder != null){

            $request->validate([
                "additional_materials" => ['required' , 'file' , new AdditionMaterialTypeValidation()]
            ]);


            $materialFile =  $request->file('additional_materials');
            $materialFileName = "ORDER_".$createdOrder->id."_".time()."_".strtolower(str_replace(' ', '_',$materialFile->getClientOriginalName()));


            if( $materialFile->storeAs('public/order/materials/', $materialFileName )){

                $newOrderMaterial['material_name'] = $materialFileName;
                $newOrderMaterial['type'] = $materialFile->getClientOriginalExtension();
                $newOrderMaterial['order_id'] = $createdOrder->id;

                OrderMaterial::create($newOrderMaterial);

            }

        }

        event(new OrderHasBeenCreatedEvent($createdOrder));

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


    public function destroyMaterial(OrderMaterial $orderMaterial)
    {

        $materialLink = "public/order/materials/".$orderMaterial->material_name;



        if(Storage::delete($materialLink)){

            if($orderMaterial->delete()){

                return response()->json(['message' => 'Order Material Deleted!'], Response::HTTP_OK);

            }else{

                return response()->json(['message' => 'Unable To Delete Material!'], Response::HTTP_FORBIDDEN);

            }

        }else{

            return response()->json(['message' => 'Unable To Delete File!'], Response::HTTP_FORBIDDEN);

        }

    }
}
