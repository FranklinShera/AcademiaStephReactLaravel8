<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaperFormatResource;
use App\Models\PaperFormat;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class PaperFormatController extends Controller
{
    public function index()
    {
        $paperFormats = PaperFormat::active()->orderBy('created_at', 'DESC')->get();


        return PaperFormatResource::collection($paperFormats)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function adminIndex()
    {
        $adminPaperFormats = PaperFormat::orderBy('created_at', 'DESC')->paginate(10);

        return PaperFormatResource::collection($adminPaperFormats)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function create(Request $request)
    {
        $data = $request->validate([
            'format_name' => 'required|string|min:2',
            'active' => 'required'
        ]);

        $pFormat = PaperFormat::create($data);

        return response()->json(['message' => $pFormat->format_name." Added!"] , Response::HTTP_CREATED);

    }


    public function toggleStatus(PaperFormat $paperFormat)
    {
        if($paperFormat->update([ 'active' => !$paperFormat->active])){

            return response()->json(['message' => $paperFormat->format_name." Status Updated!"] ,Response::HTTP_OK);

        }

        return response()->json(['message' =>"Unable To Update Status!"] , Response::HTTP_BAD_REQUEST);
    }





    public function destroy(PaperFormat $paperFormat)
    {
        if($paperFormat->delete()){
            return response()->json(['message' => "Deleted!"] ,Response::HTTP_OK);
        }

        return response()->json(['message' =>"Unable To Delete!"] , Response::HTTP_BAD_REQUEST);
    }


}
