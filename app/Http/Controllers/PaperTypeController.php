<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaperTypeResource;
use App\Models\PaperType;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaperTypeController extends Controller
{


    public function index()
    {

        $paperTypes = PaperType::active()->orderBy('created_at', 'DESC')->paginate(10);

        return PaperTypeResource::collection($paperTypes)->response()->setStatusCode(Response::HTTP_OK);

    }




    public function adminIndex()
    {

        $adminPaperTypes = PaperType::orderBy('created_at', 'DESC')->paginate(10);

        return PaperTypeResource::collection($adminPaperTypes)->response()->setStatusCode(Response::HTTP_OK);

    }



    public function create(Request $request)
    {

        $data = $request->validate([
            'type_name' => 'required|string|min:5',
            'active' => 'required'
        ]);

        $ptype = PaperType::create($data);

        return new PaperTypeResource($ptype);

    }



    public function store(Request $request)
    {
        //
    }





    public function toggleStatus(PaperType $paperType)
    {
        if($paperType->update([ 'active' => !$paperType->active])){

            return response()->json(['message' => $paperType->type_name." Status Updated!"] ,Response::HTTP_OK);

        }

        return response()->json(['message' =>"Unable To Update Status!"] , Response::HTTP_BAD_REQUEST);
    }



    public function edit(PaperType $paperType)
    {
        //
    }



    public function update(Request $request, PaperType $paperType)
    {
        //
    }



    public function destroy(PaperType $paperType)
    {
        if($paperType->delete()){
            return response()->json(['message' => "Deleted!"] ,Response::HTTP_OK);
        }

        return response()->json(['message' =>"Unable To Delete!"] , Response::HTTP_BAD_REQUEST);

    }
}
