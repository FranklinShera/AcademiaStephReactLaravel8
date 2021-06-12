<?php

use App\Http\Controllers\AcademicLevelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\CustomerReviewController;
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

        });


        //ADMIN
        Route::middleware(['isAdmin'])->prefix('/admin')->group(function(){

            Route::post('/user' , [AuthController::class , 'profile']);
            Route::post('/refresh-token' , [AuthController::class , 'refresh']);
            Route::post('/logout' , [AuthController::class , 'logout']);

            Route::get('/academic-levels' , [AcademicLevelController::class , 'adminIndex']);
            Route::post('/academic-level' , [AcademicLevelController::class , 'create']);
            Route::delete('/academic-level/{academicLevel}' , [AcademicLevelController::class , 'destroy']);

        });


});








