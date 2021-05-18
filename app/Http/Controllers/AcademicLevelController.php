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



    public function store(Request $request)
    {
        //
    }


    public function show(AcademicLevel $academicLevel)
    {
        //
    }


    public function update(Request $request, AcademicLevel $academicLevel)
    {
        //
    }


    public function destroy(AcademicLevel $academicLevel)
    {
        //
    }
}
