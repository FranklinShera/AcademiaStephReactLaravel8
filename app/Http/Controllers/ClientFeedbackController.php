<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerReviewResource;
use App\Models\ClientFeedback;
use App\Models\CustomerReview;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientFeedbackController extends Controller
{

    public function index()
    {

        $reviews = CustomerReview::orderBy('created_at', 'DESC')->get();

        // $reviews = ClientFeedback::where('rating','>=',3)->orderBy('created_at', 'DESC')->get();

        // return response(ClientFeedbackResource::collection($reviews), Response::HTTP_OK);
        return response(CustomerReviewResource::collection($reviews), Response::HTTP_OK);

    }

    public function create(Request $request)
    {
        $feedback = $request->validate([
            'rating' => 'required',
            'remarks' => 'required',
            'order_id' => 'required|unique:client_feedback',
        ]);

        ClientFeedback::create($feedback);

        return response()->json(['message' => 'Feedback Submitted Successfully!'], Response::HTTP_CREATED);
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