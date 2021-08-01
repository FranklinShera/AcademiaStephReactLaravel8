<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Models\AcademicLevel;
use App\Models\Client;
use App\Models\Message;
use App\Models\Order;
use App\Models\PaperFormat;
use App\Models\PaperType;
use App\Models\SocialAccount;
use App\Models\SubjectArea;
use App\Models\User;
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


    public function analytics()
    {

        $sentOrders = Order::all()->count();
        $pendingOrders = Order::pending()->where('client_id',currentClient()->id)->count();
        $activeOrders = Order::active()->where('client_id',currentClient()->id)->count();
        $completedOrders = Order::completed()->where('client_id',currentClient()->id)->count();
        $cancelledOrders = Order::cancelled()->where('client_id',currentClient()->id)->count();

        $messagesCount = Message::where('conversation_id',currentClient()->conversation->id)->count();
        $transactionsCount = currentClient()->orders->count();
        $paymentsCount = "$0";

        $clientAnalytics = [
            'order' => [
                'sent' => $sentOrders,
                'pending' => $pendingOrders,
                'active' => $activeOrders,
                'completed' => $completedOrders,
                'cancelled' => $cancelledOrders
            ],

            'misc' => [
                'messages' => $messagesCount,
                'payments' => $paymentsCount,
                'transactions' => $transactionsCount,
            ],
        ];

        return response()->json($clientAnalytics , 200);
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



    public function autoClient(Request $request){

        $client = Client::whereEmail('testclient@academiasteph21.com')->first();

        if(!$client){
            return  response()->json(['error' => 'DEFAULT CLIENT NOT FOUND!'], Response::HTTP_BAD_REQUEST);
        }

        $token = auth('client')->login($client , $remember = true);

        if(!$token){
            return  response()->json(['error' => 'AutoLogin Failed!'], Response::HTTP_BAD_REQUEST);
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

        return new ClientResource(currentClient());

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
