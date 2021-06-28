<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrefferedEnglishResource;
use App\Models\PrefferedEnglish;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PrefferedEnglishController extends Controller
{

    public function index()
    {
        $prefferedLangs = PrefferedEnglish::active()->orderBy('created_at', 'DESC')->get();


        return PrefferedEnglishResource::collection($prefferedLangs)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function adminIndex()
    {
        $adminPrefferedLangs = PrefferedEnglish::orderBy('created_at', 'DESC')->paginate(10);

        return PrefferedEnglishResource::collection($adminPrefferedLangs)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function create(Request $request)
    {
        $data = $request->validate([
            'lang_name' => 'required|string|min:2',
            'active' => 'required'
        ]);

        $pEng = PrefferedEnglish::create($data);

        return response()->json(['message' => $pEng->lang_name." Added!"] , Response::HTTP_CREATED);

    }


    public function toggleStatus(PrefferedEnglish $prefferedEnglish)
    {
        if($prefferedEnglish->update([ 'active' => !$prefferedEnglish->active])){

            return response()->json(['message' => $prefferedEnglish->lang_name." Status Updated!"] ,Response::HTTP_OK);

        }

        return response()->json(['message' =>"Unable To Update Status!"] , Response::HTTP_BAD_REQUEST);
    }





    public function destroy(PrefferedEnglish $prefferedEnglish)
    {
        if($prefferedEnglish->delete()){
            return response()->json(['message' => "Deleted!"] ,Response::HTTP_OK);
        }

        return response()->json(['message' =>"Unable To Delete!"] , Response::HTTP_BAD_REQUEST);
    }

}
