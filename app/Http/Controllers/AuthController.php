<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\Client;
use App\Models\Message;
use App\Models\Order;
use App\Models\PaperFormat;
use App\Models\PaperType;
use App\Models\Payment;
use App\Models\SubjectArea;
use App\Models\User;
use App\Models\Writer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Claims\Subject;


class AuthController extends Controller
{
   public function __construct(){

       $this->middleware('tokencookie' , ['except' => ['login','register'] ]);

   }


    public function analytics()
    {

        $receivedOrders = Order::all()->count();
        $pendingOrders = Order::pending()->count();
        $unassignedOrders = Order::unassigned()->count();
        $activeOrders = Order::active()->count();
        $completedOrders = Order::completed()->count();
        $cancelledOrders = Order::cancelled()->count();


        $levelsCount = AcademicLevel::all()->count();
        $subjectsCount = SubjectArea::all()->count();
        $typesCount = PaperType::all()->count();
        $formatsCount = PaperFormat::all()->count();

        $messagesCount = Message::all()->count();
        $writersCount = Writer::all()->count();
        $clientsCount = Client::all()->count();
        $adminsCount = User::all()->count();
        $paymentsCount = Payment::sum('amount');
        $transactionsCount = Payment::all()->count();


        $adminAnalytics = [
            'order' => [
                'received' => $receivedOrders,
                'pending' => $pendingOrders,
                'unassigned' => $unassignedOrders,
                'active' => $activeOrders,
                'completed' => $completedOrders,
                'cancelled' => $cancelledOrders
            ],
            'control' => [
                'academic_levels' => $levelsCount,
                'subject_areas' => $subjectsCount,
                'paper_types' => $typesCount,
                'paper_formats' => $formatsCount
            ],
            'misc' => [
                'messages' => $messagesCount,
                'payments' => $paymentsCount,
                'transactions' => $transactionsCount,
                'writers' => $writersCount,
                'clients' => $clientsCount,
                'admins' => $adminsCount,
            ],
        ];

        return response()->json($adminAnalytics , 200);
    }

    public function login(Request $request){

       $userValidation = Validator::make($request->all(),[
           'email' => 'required|email',
           'password' => 'required|string|min:6'
       ]);

       if($userValidation->fails()){
           return response()->json($userValidation->errors() , Response::HTTP_BAD_REQUEST);
       }


        if(!$token = Auth::attempt($userValidation->validated())){
            return  response()->json(['error' => 'Unauthorised!'], Response::HTTP_BAD_REQUEST);
        }

        return respondWithToken($token);

    }



    public function register(Request $request){

        $userValidation = Validator::make($request->all(),[
            'name' => 'required|string|between:2,100',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);


        if($userValidation->fails()){
            return response()->json($userValidation->errors() , Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        User::create(
            array_merge(
                $userValidation->validated(),
                ['password' => bcrypt($request->password)]
            )
        );

        return response()->json(['message' => "User Created!"] , Response::HTTP_CREATED);


    }



    public function profile(){

        return response()->json(['admin' => Auth::user(), 'notifications' => []]);

    }



    public function logout(){

        Auth::logout();

       return response()->json(['message' => "Logged Out!"] , Response::HTTP_OK);

    }


    public function refresh(Request $request){

       try{

           $newToken = Auth::refresh();

           return respondWithToken($newToken);


       }catch(\Exception $e){

          return  response()->json(['error' => $e->getMessage()] , Response::HTTP_UNAUTHORIZED);

       }

    }




}
