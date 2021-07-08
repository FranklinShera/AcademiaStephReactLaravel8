<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function index()
    {

    }


    public function clientCreate(Request $request)
    {
        dd($request->all());
    }

    public function destroy(Message $message)
    {
        //
    }


}
