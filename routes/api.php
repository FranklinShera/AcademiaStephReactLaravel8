<?php

use App\Http\Controllers\AcademicLevelController;
use App\Http\Controllers\AuthController;
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



Route::post('/login', [AuthController::class , 'login']);
Route::post('/register', [AuthController::class , 'register']);



Route::middleware(['tokencookie'])->prefix('/auth')->group(function (){


        Route::post('/user' , [AuthController::class , 'profile']);
        Route::post('/refresh-token' , [AuthController::class , 'refresh']);
        Route::post('/logout' , [AuthController::class , 'logout']);



        Route::prefix('/admin')->group(function(){

            Route::get('/academic-levels' , [AcademicLevelController::class , 'adminIndex']);
            Route::post('/academic-level' , [AcademicLevelController::class , 'create']);
            Route::delete('/academic-level/{academicLevel}' , [AcademicLevelController::class , 'destroy']);

        });


});








