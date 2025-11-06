<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="keywords" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="{{asset('assets/bootstrap/css/bootstrap.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/fonts/fontawesome-all.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/Nunito.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
        
        <style></style>
            @routes
            @viteReactRefresh
            @vite('resources/js/app.jsx')
            @inertiaHead
    </head>

    <body>
        @inertia
    </body>
    <script src="{{asset('assets/bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('assets/js/bs-init.js')}}"></script>
    <script src="{{asset('assets/js/chart.min.js')}}"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="{{asset('assets/js/Select2-JS-Plugin-style.js')}}"></script>
    <script src="{{asset('assets/js/Select2-JS-Plugin-run.js')}}"></script>
    <script src="{{asset('assets/js/theme.js')}}"></script>
</html>
