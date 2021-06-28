<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicLevelResource;
use App\Models\AcademicLevel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AcademicLevelController extends Controller
{

    public function index()
    {
        $academicLevels = AcademicLevel::active()->orderBy('created_at', 'DESC')->get();

        return AcademicLevelResource::collection($academicLevels)->response()->setStatusCode(Response::HTTP_OK);
    }

    public function adminIndex()
    {
        $adminAcademicLevels = AcademicLevel::orderBy('created_at', 'DESC')->paginate(10);

        return AcademicLevelResource::collection($adminAcademicLevels)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function create(Request $request)
    {
        $data = $request->validate([
                     'level_name' => 'required|string|min:5',
                     'active' => 'required'
                    ]);

        $alevel = AcademicLevel::create($data);

        return response()->json(['message' => $alevel->level_name." Added!"] , Response::HTTP_CREATED);

    }


    public function toggleStatus(AcademicLevel $academicLevel)
    {
        if($academicLevel->update([ 'active' => !$academicLevel->active])){

            return response()->json(['message' => $academicLevel->level_name." Status Updated!"] ,Response::HTTP_OK);

        }

        return response()->json(['message' =>"Unable To Update Status!"] , Response::HTTP_BAD_REQUEST);
    }


    public function update(Request $request, AcademicLevel $academicLevel)
    {

    }


    public function destroy(AcademicLevel $academicLevel)
    {
        if($academicLevel->delete()){
            return response()->json(['message' => "Deleted!"] ,Response::HTTP_OK);
        }

        return response()->json(['message' =>"Unable To Delete!"] , Response::HTTP_BAD_REQUEST);
    }
}
