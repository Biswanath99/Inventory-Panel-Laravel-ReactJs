<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;


    Route::post('/register'             ,   [AuthController::class, 'register']);
    Route::post('/login'                ,   [AuthController::class, 'login']);
    Route::post('/refresh'              ,   [AuthController::class   , 'refresh']);
    Route::get('/products'              ,   [ProductController::class, 'productLists']);
    Route::post('/create-product'       ,   [ProductController::class, 'createProduct']);
    Route::get('/edit-product/{id}'     ,   [ProductController::class, 'editProduct']);
    Route::put('/update-product/{id}'   ,   [ProductController::class, 'updateProduct']);
    Route::delete('/delete-product/{id}',   [ProductController::class, 'deleteProduct']);
    Route::post('/logout'               ,   [AuthController::class   , 'logout']);

