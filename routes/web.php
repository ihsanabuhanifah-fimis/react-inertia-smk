<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');
Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');




Route::middleware(['auth', 'verified'])->group(function(){
    Route::resource('/users', UserController::class);
    
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');
});

