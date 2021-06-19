<?php

use App\Http\Controllers\AcademicLevelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\CustomerReviewController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaperTypeController;
use App\Http\Controllers\SubjectAreaController;
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



Route::get('/reviews', [CustomerReviewController::class , 'index']);
Route::get('/academic-levels', [AcademicLevelController::class , 'index']);
Route::get('/paper-types' , [PaperTypeController::class , 'index']);
Route::get('/subject-areas' , [SubjectAreaController::class , 'index']);


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
            Route::post('/refresh-token' , [ClientAuthController::class , 'refresh']);
            Route::post('/client-logout' , [ClientAuthController::class , 'logout']);

            //   ORDERS
            Route::post('/orders' , [OrderController::class , 'create']);
            Route::get('/orders' , [OrderController::class , 'clientOrders']);
            Route::get('/orders-pending' , [OrderController::class , 'clientPendingOrders']);
            Route::get('/orders-cancelled' , [OrderController::class , 'clientCancelledOrders']);
            Route::get('/orders-completed' , [OrderController::class , 'clientCompletedOrders']);

        });


        //ADMIN
        Route::middleware(['isAdmin'])->prefix('/admin')->group(function(){

            Route::post('/user' , [AuthController::class , 'profile']);
            Route::post('/refresh-token' , [AuthController::class , 'refresh']);
            Route::post('/logout' , [AuthController::class , 'logout']);



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



        });


});








