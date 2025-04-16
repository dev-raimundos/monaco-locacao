<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\CarouselImageController;

Route::get('/carousel-images', [CarouselImageController::class, 'index']);

Route::post('/carousel-images', [CarouselImageController::class, 'store']);

Route::delete('/carousel-images/{id}', [CarouselImageController::class, 'destroy']);

Route::apiResource('vehicles', VehicleController::class);

Route::post('/contact', [ContactFormController::class, 'store']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

