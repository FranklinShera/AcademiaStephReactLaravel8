<?php

namespace App\Http\Controllers;

use App\Http\Resources\DirectContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{


    public function adminIndex()
    {
        $contacts = Contact::orderBy('created_at', 'DESC')->paginate(10);

        return DirectContactResource::collection($contacts)->response()->setStatusCode(Response::HTTP_OK);

    }





    public function store(Request $request)
    {
        $contact = $request->validate([
                    'name' => 'required',
                    'message'  => 'required',
                    'email' => 'required',
                    'whatsappnumber' => 'required',
                    'mailback' => 'required',
                    'addonwhatsapp' => 'required'
                ]);

        if(Contact::create($contact)){

            return response()->json(['message' => "Contact Created!"], Response::HTTP_CREATED);

        }

        return response()->json(['message' => "Unable To Create Contact!"] ,Response::HTTP_BAD_REQUEST);

    }



    public function destroy(Contact $contact)
    {
        //
    }
}
