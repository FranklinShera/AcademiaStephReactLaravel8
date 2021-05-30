<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ClientAuthController extends Controller
{
    public function __construct(){

        $this->middleware('tokencookie' , ['except' => ['login','register'] ]);

    }





    public function login(Request $request){

        $validClient = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if($validClient->fails()){
            return response()->json($validClient->errors() , Response::HTTP_BAD_REQUEST);
        }


        if(!$token = Auth::guard('client')->attempt($validClient->validated())){
            return  response()->json(['error' => 'Invalid Credentials!'], Response::HTTP_BAD_REQUEST);
        }

        return $this->respondWithToken($token);
    }



    public function register(Request $request){

        $validClient = Validator::make($request->all(),[
            'name' => 'required|string|between:2,100',
            'email' => 'required|email|unique:clients',
            'password' => 'required|string|min:6'
        ]);


        if($validClient->fails()){
            return response()->json($validClient->errors() , Response::HTTP_UNPROCESSABLE_ENTITY);
        }

       Client::create(
            array_merge(
                $validClient->validated(),
                ['password' => bcrypt($request->password)]
            )
        );

        return response()->json(['message' => "Client Created!"] , Response::HTTP_CREATED);


    }



    public function profile(){

        return response()->json(auth('client')->user());
//        return response()->json(currentClient());

    }



    public function logout(){

        Auth::logout();

        return response()->json(['message' => "Logged Out!"] , Response::HTTP_OK);

    }


    public function refresh(Request $request){

        try{

            $newToken = Auth::refresh();

            return $this->respondWithToken($newToken);


        }catch(\Exception $e){

            return  response()->json(['error' => $e->getMessage()] , Response::HTTP_UNAUTHORIZED);

        }

    }


    protected function respondWithToken($token){

        $tokenCookie = cookie('access_token',
            $token ,
            env('JWT_TTL'),
            null,
            null,
            true,
            true,
            false,
            null);

        return response()->json(['message' => "Success!"])->withCookie($tokenCookie);

    }

}
