<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function register()
    {
        return Inertia::render('Auth/Register');
    }
    
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function products()
    {
        return Inertia::render('Products/List');
    }

    public function addProduct()
    {
        return Inertia::render('Products/Create');
    }

    public function editProduct()
    {
        return Inertia::render('Products/Edit');
    }
}
