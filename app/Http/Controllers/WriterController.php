<?php

namespace App\Http\Controllers;

use App\Http\Resources\WritersResource;
use App\Models\Writer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WriterController extends Controller
{

    public function adminIndex()
    {
        $writers = Writer::orderBy('created_at', 'DESC')->paginate(10);

        return WritersResource::collection($writers)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function create(Request $request)
    {
        $newWriter =  $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:writers' ,
            'phone'=> '',
            'speciality' => 'required'
        ]);

        if(Writer::create($newWriter)){
            return response()->json(['message' => 'Writer Added!'] , Response::HTTP_CREATED);
        }

        return response()->json(['message' => 'Failed To Add Writer!'] , Response::HTTP_FORBIDDEN);

    }





    public function destroy(Writer $writer)
    {
        //
    }
}
