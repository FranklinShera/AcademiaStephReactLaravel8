<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{

    public function clientIndex()
    {
        $messages = Message::where('conversation_id',currentClient()->conversation->id)->orderBy('created_at', 'ASC')->get();

        return MessageResource::collection($messages)->response()->setStatusCode(Response::HTTP_OK);
    }

    public function adminMessages(Conversation $conversation)
    {

        return MessageResource::collection($conversation->messages)->response()->setStatusCode(Response::HTTP_OK);

    }



    public function adminIndex()
    {

        $conversations = Conversation::with('latestMessage')->paginate(10)->sortByDesc('latestMessage.created_at');

        return ConversationResource::collection($conversations)->response()->setStatusCode(Response::HTTP_OK);

    }


    public function clientCreate(Request $request)
    {
        $data = $request->validate(['message' => 'required']);

        $conv = Conversation::firstOrCreate(['client_id' => currentClient()->id]);

        Message::create([
            'conversation_id' => $conv->id,
            'content' => $data['message'],
            'direction' => 1
        ]);

        return response("Message Sent!" , 201);

    }


    public function adminCreate(Request $request)
    {
        $data = $request->validate(['message' => 'required']);



        Message::create([
            'conversation_id' => $request->conv_id,
            'content' => $data['message'],
            'direction' => 0
        ]);

        return response("Message Sent!" , 201);

    }



    public function destroy(Message $message)
    {
        //
    }


}
