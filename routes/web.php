<?php

use App\Http\Controllers\SoapController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

// Route::get('/simple', function () {
//     return view('simple.index');
// });

Route::post('/simple',[SoapController::class, 'simple']);