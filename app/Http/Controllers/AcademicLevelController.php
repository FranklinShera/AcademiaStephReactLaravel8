<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicLevelResource;
use App\Models\AcademicLevel;
use Illuminate\Http\Request;

class AcademicLevelController extends Controller
{

    public function index()
    {
        $academicLevels = AcademicLevel::orderBy('created_at', 'DESC')->get();

        return response(AcademicLevelResource::collection($academicLevels),200);
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
