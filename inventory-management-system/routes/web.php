<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;

Route::get('/', [FrontendController::class, 'index']);

Route::get('/manage-products' , [FrontendController::class, 'products']);
Route::get('/add-product'     , [FrontendController::class, 'addProduct']);
Route::get('/edit-product'    , [FrontendController::class, 'editProduct']);