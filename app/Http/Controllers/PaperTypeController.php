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

        $adminPaperTypes = PaperType::active()->orderBy('created_at', 'DESC')->paginate(10);

        return PaperTypeResource::collection($adminPaperTypes)->response()->setStatusCode(Response::HTTP_OK);

    }




    public function adminIndex()
    {

        $adminPaperTypes = PaperType::orderBy('created_at', 'DESC')->paginate(10);

        return PaperTypeResource::collection($adminPaperTypes)->response()->setStatusCode(Response::HTTP_OK);

    }



    public function create(Request $request)
    {

        $data = $request->validate([
            'level_name' => 'required|string|min:5',
            'active' => 'required'
        ]);

        $ptype = PaperType::create($data);

        return new PaperTypeResource($ptype);

    }



    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaperType  $paperType
     * @return \Illuminate\Http\Response
     */
    public function show(PaperType $paperType)
    {
        //
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
