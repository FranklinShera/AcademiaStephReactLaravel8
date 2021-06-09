<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\SocialAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response;

class ClientAuthController extends Controller
{
    public function __construct(){

        $this->middleware('tokencookie' , ['except' => ['login','register'] ]);

    }




    public function redirectToProvider($provider){

        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json(["url" => $url]);

    }



    public function handleProvider($provider){


            $user = Socialite::driver($provider)->stateless()->user();

            if(!$user->token){
                return response()->json([ "message" => "User Not Found!"]);
            }


            $existingClient = Client::whereEmail($user->email)->first();




            if(!$existingClient){

               // create client and add provider

                $newClient = Client::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => bcrypt(Str::random(16)),

                ]);

                SocialAccount::create([
                    'provider' => $provider,
                    'provider_client_id' => $user->id,
                    'client_id' => $newClient->id
                ]);


                //LOGIN OUR CLIENT AND SEND TOKEN
               return $this->socialLogin($newClient);


            }else{

                //  we have a client if this runs

                $existingProvider = SocialAccount::where('provider' , $provider)->first();


                if(!$existingProvider){

                    SocialAccount::create([
                        'provider' => $provider,
                        'provider_client_id' => $user->id,
                        'client_id' => $existingClient->id
                    ]);

                }


               return $this->socialLogin($existingClient);

            }

    }




    public function socialLogin(Client $client){


        $token = auth('client')->login($client , $remember = true);



        if(!$token){

            return  response()->json(['error' => 'Social Login Failed!'], Response::HTTP_BAD_REQUEST);
        }


        return respondWithToken($token);

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

        return respondWithToken($token);
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

        return response()->json(currentClient());

    }



    public function logout(){

        Auth::guard('client')->logout();

        return response()->json(['message' => "Logged Out!"] , Response::HTTP_OK);

    }



    public function refresh(Request $request){

        try{

            $newToken = Auth::guard('client')->refresh();

            return respondWithToken($newToken);



        }catch(\Exception $e){

            return  response()->json(['error' => $e->getMessage()] , Response::HTTP_UNAUTHORIZED);

        }

    }



}
