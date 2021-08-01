<?php

use App\Http\Controllers\AcademicLevelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\ClientFeedbackController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaperFormatController;
use App\Http\Controllers\PaperTypeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PrefferedEnglishController;
use App\Http\Controllers\SubjectAreaController;
use App\Http\Controllers\WriterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/reviews', [ClientFeedbackController::class , 'index']);

//Route::get('/creviews', [CustomerReviewController::class , 'index']);

Route::post('/create-contact', [ContactController::class , 'store']);


Route::get('/academic-levels', [AcademicLevelController::class , 'index']);
Route::get('/paper-types' , [PaperTypeController::class , 'index']);
Route::get('/subject-areas' , [SubjectAreaController::class , 'index']);
Route::get('/preffered-english' , [PrefferedEnglishController::class , 'index']);
Route::get('/paper-formats' , [PaperFormatController::class , 'index']);


//CLIENT
Route::post('/client-login', [ClientAuthController::class , 'login']);
Route::post('/autoclient', [ClientAuthController::class , 'autoClient']);
Route::post('/client-register', [ClientAuthController::class , 'register']);



Route::post('/login', [AuthController::class , 'login']);
Route::post('/register', [AuthController::class , 'register']);





Route::prefix('/soc')->group(function (){
    //LARAVEL SOCIALITE

    Route::get('/authorize/{provider}/callback' , [ClientAuthController::class , 'handleProvider']);
    Route::get('/authorize/{provider}/redirect' , [ClientAuthController::class , 'redirectToProvider']);

});





Route::middleware(['tokencookie'])->prefix('/auth')->group(function (){

        //CLIENT
        Route::middleware(['isClient'])->prefix('/client')->group(function(){

            Route::post('/' , [ClientAuthController::class , 'profile']);
            Route::get('/analytics' , [ClientAuthController::class , 'analytics']);
            Route::post('/refresh-token' , [ClientAuthController::class , 'refresh']);
            Route::post('/client-logout' , [ClientAuthController::class , 'logout']);


            //CLIENT FEEDBACK
            Route::post('/feedback' , [ClientFeedbackController::class , 'create']);


            //PAYMENTS
            Route::get('/order-payments' , [PaymentController::class , 'index']);


            //MESSAGE
            Route::get('/messages' , [MessageController::class , 'clientIndex']);
            Route::post('/message' , [MessageController::class , 'clientCreate']);


            //ORDER MATERIAL
            Route::post('/add-material/{order}' , [OrderController::class , 'clientOrderAddMaterial']);
            Route::delete('/material/{orderMaterial}' , [OrderController::class , 'destroyMaterial']);



            //   ORDERS
            Route::post('/orders' , [OrderController::class , 'create']);
            Route::get('/orders' , [OrderController::class , 'clientOrders']);
            Route::get('/order/{order}' , [OrderController::class , 'clientOrder']);
            Route::get('/orders-pending' , [OrderController::class , 'clientPendingOrders']);

            Route::post('/cancel-order/{order}' , [OrderController::class , 'clientOrderCancel']);


            Route::get('/orders-cancelled' , [OrderController::class , 'clientCancelledOrders']);
            Route::get('/orders-active' , [OrderController::class , 'clientActiveOrders']);
            Route::get('/orders-completed' , [OrderController::class , 'clientCompletedOrders']);

        });


        //ADMIN
        Route::middleware(['isAdmin'])->prefix('/admin')->group(function(){

            Route::post('/user' , [AuthController::class , 'profile']);
            Route::get('/analytics' , [AuthController::class , 'analytics']);
            Route::post('/refresh-token' , [AuthController::class , 'refresh']);
            Route::post('/logout' , [AuthController::class , 'logout']);


            //WRITER
            Route::post('/add-writer', [WriterController::class , 'create']);
            Route::get('/writers', [WriterController::class , 'adminIndex']);


            //CONTACTS
            Route::get('/direct-contacts', [ContactController::class , 'adminIndex']);




            //PAYMENTS
            Route::get('/order-payments' , [PaymentController::class , 'adminIndex']);



            //MESSAGES
            Route::get('/conversations' , [MessageController::class ,'adminIndex']);
            Route::post('/message' , [MessageController::class , 'adminCreate']);
            Route::get('/conversation/{conversation}/messages' , [MessageController::class , 'adminMessages']);




            //   ORDERS
            Route::get('/orders' , [OrderController::class , 'adminOrders']);
            Route::get('/order/{order}' , [OrderController::class , 'adminOrder']);
            Route::get('/orders-pending' , [OrderController::class , 'adminPendingOrders']);
            Route::get('/orders-unassigned' , [OrderController::class , 'adminUnassignedOrders']);

            Route::post('/assign-order/{order}/{writer}' , [OrderController::class , 'adminAssignOrder']);
            Route::post('/complete-order/{order}' , [OrderController::class , 'adminCompleteOrder']);

            Route::get('/orders-cancelled' , [OrderController::class , 'adminCancelledOrders']);
            Route::get('/orders-active' , [OrderController::class , 'adminActiveOrders']);
            Route::get('/orders-completed' , [OrderController::class , 'adminCompletedOrders']);


            //  Subject Area Routes
            Route::get('/subject-areas' , [SubjectAreaController::class , 'adminIndex']);
            Route::post('/subject-area' , [SubjectAreaController::class , 'create']);
            Route::post('/subject-area-toggle/{subjectArea}' , [SubjectAreaController::class , 'toggleStatus']);
            Route::delete('/subject-area/{subjectArea}' , [SubjectAreaController::class , 'destroy']);



            //  Paper Type Routes
            Route::get('/paper-types' , [PaperTypeController::class , 'adminIndex']);
            Route::post('/paper-type' , [PaperTypeController::class , 'create']);
            Route::post('/paper-type-toggle/{paperType}' , [PaperTypeController::class , 'toggleStatus']);
            Route::delete('/paper-type/{paperType}' , [PaperTypeController::class , 'destroy']);



            //  Academic Level Routes
            Route::get('/academic-levels' , [AcademicLevelController::class , 'adminIndex']);
            Route::post('/academic-level' , [AcademicLevelController::class , 'create']);
            Route::post('/academic-level-toggle/{academicLevel}' , [AcademicLevelController::class , 'toggleStatus']);
            Route::delete('/academic-level/{academicLevel}' , [AcademicLevelController::class , 'destroy']);



            //  Prefered English Routes
            Route::get('/preffered-english' , [PrefferedEnglishController::class , 'adminIndex']);
            Route::post('/preffered-english' , [PrefferedEnglishController::class , 'create']);
            Route::post('/preffered-english-toggle/{prefferedEnglish}' , [PrefferedEnglishController::class , 'toggleStatus']);
            Route::delete('/preffered-english/{prefferedEnglish}' , [PrefferedEnglishController::class , 'destroy']);



            //  Paper Format Routes
            Route::get('/paper-formats' , [PaperFormatController::class , 'adminIndex']);
            Route::post('/paper-format' , [PaperFormatController::class , 'create']);
            Route::post('/paper-format-toggle/{paperFormat}' , [PaperFormatController::class , 'toggleStatus']);
            Route::delete('/paper-format/{paperFormat}' , [PaperFormatController::class , 'destroy']);



        });


});








