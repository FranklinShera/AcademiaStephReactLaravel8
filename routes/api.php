<?php

use App\Http\Controllers\AcademicLevelController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\ClientFeedbackController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PaperFormatController;
use App\Http\Controllers\PaperTypeController;
use App\Http\Controllers\PrefferedEnglishController;
use App\Http\Controllers\SubjectAreaController;
use Illuminate\Support\Facades\Route;

Route::get('/reviews', [ClientFeedbackController::class, 'index']);

Route::post('/create-contact', [ContactController::class, 'store']);

Route::get('/academic-levels', [AcademicLevelController::class, 'index']);
Route::get('/paper-types', [PaperTypeController::class, 'index']);
Route::get('/subject-areas', [SubjectAreaController::class, 'index']);
Route::get('/preffered-english', [PrefferedEnglishController::class, 'index']);
Route::get('/paper-formats', [PaperFormatController::class, 'index']);

Route::prefix('/soc')->group(function () {

    Route::get('/authorize/{provider}/callback', [ClientAuthController::class, 'handleProvider']);
    Route::get('/authorize/{provider}/redirect', [ClientAuthController::class, 'redirectToProvider']);

});