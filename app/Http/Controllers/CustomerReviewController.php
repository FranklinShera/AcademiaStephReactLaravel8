<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerReviewResource;
use App\Models\CustomerReview;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class CustomerReviewController extends Controller
{

    public function index()
    {
        $reviews = CustomerReview::orderBy('created_at', 'DESC')->get();

       return response(CustomerReviewResource::collection($reviews) , Response::HTTP_OK);

    }



    public function store(Request $request)
    {
        //
    }


    public function show(CustomerReview $customerReview)
    {

    }


    public function update(Request $request, CustomerReview $customerReview)
    {

    }


    public function destroy(CustomerReview $customerReview)
    {

    }
}
