<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientFeedbackResource;
use App\Models\ClientFeedback;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class ClientFeedbackController extends Controller
{


    public function index()
    {

        $reviews = ClientFeedback::orderBy('created_at', 'DESC')->get();

        return response(ClientFeedbackResource::collection($reviews) , Response::HTTP_OK);
    }


    public function create(Request $request)
    {
        $feedback = $request->validate([
                    'rating' => 'required',
                    'remarks' => 'required',
                    'order_id' => 'required|unique:client_feedback'
                ]);

        ClientFeedback::create($feedback);

        return response()->json(['message' => 'Feedback Submitted Successfully!'] , Response::HTTP_OK);
    }



    public function update(Request $request, ClientFeedback $clientFeedback)
    {
        //
    }


    public function destroy(ClientFeedback $clientFeedback)
    {
        //
    }


}
