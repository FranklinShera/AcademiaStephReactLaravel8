<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubjectAreaResource;
use App\Models\SubjectArea;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubjectAreaController extends Controller
{



    public function index()
    {

        $subjectAreas = SubjectArea::active()->orderBy('created_at', 'DESC')->paginate(10);

        return SubjectAreaResource::collection($subjectAreas)->response()->setStatusCode(Response::HTTP_OK);

    }




    public function adminIndex()
    {

        $adminSubjectAreas = SubjectArea::orderBy('created_at', 'DESC')->paginate(10);

        return SubjectAreaResource::collection($adminSubjectAreas)->response()->setStatusCode(Response::HTTP_OK);

    }



    public function create(Request $request)
    {

        $data = $request->validate([
            'area_name' => 'required|string|min:5',
            'active' => 'required'
        ]);

        $sarea = SubjectArea::create($data);

        return new SubjectAreaResource($sarea);

    }


    public function store(Request $request)
    {
        //
    }



    public function toggleStatus(SubjectArea $subjectArea)
    {
        if($subjectArea->update([ 'active' => !$subjectArea->active])){

            return response()->json(['message' => $subjectArea->area_name." Status Updated!"] ,Response::HTTP_OK);

        }

        return response()->json(['message' =>"Unable To Update Status!"] , Response::HTTP_BAD_REQUEST);
    }



    public function edit(SubjectArea $subjectArea)
    {
        //
    }



    public function update(Request $request, SubjectArea $subjectArea)
    {
        //
    }



    public function destroy(SubjectArea $subjectArea)
    {
        if($subjectArea->delete()){
            return response()->json(['message' => "Deleted!"] ,Response::HTTP_OK);
        }

        return response()->json(['message' =>"Unable To Delete!"] , Response::HTTP_BAD_REQUEST);

    }
}
