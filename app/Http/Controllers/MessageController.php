<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function clientIndex()
    {
        $messages = Message::where('client_id',currentClient()->id)->orderBy('created_at', 'ASC')->get();

        return MessageResource::collection($messages);
    }


    public function clientCreate(Request $request)
    {
        $data = $request->validate(['message' => 'required']);

        Message::create([
            'client_id' => currentClient()->id,
            'content' => $data['message'],
            'direction' => 1
        ]);

        return response("Message Sent!" , 201);
    }

    public function destroy(Message $message)
    {
        //
    }


}
