<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    private function validationRuleForRegister($request): array
    {
        $rules = [
            'first_name'                  => ['required', 'max:50', 'regex:/^[A-Za-z\s]+$/'],
            'last_name'                   => ['nullable', 'max:50', 'regex:/^[A-Za-z\s]+$/'],
            'email'                       => ['required', 'max:255','regex:/(.+)@(.+)\.(.+)/i', 'email' , Rule::unique('users')],
            'contact_number'              => ['nullable', 'min:10', 'max:15', 'regex:/^[0-9\s\-\(\)]*$/', Rule::unique('users')],
            'password'                    => ['required', 'string', RulesPassword::min(8)->mixedCase()->numbers()->symbols()],
            'confirm_password'            => ['required', 'string', 'same:password']
        ];

        $messages = [
            'first_name.required'         => 'Name is required.',
            'first_name.max'              => 'Name cannot exceed 50 characters.',
            'first_name.regex'            => 'Name can only contain letters and spaces.',
            'last_name.max'               => 'last_name cannot exceed 50 characters.',
            'last_name.regex'             => 'last_name can only contain letters and spaces.',
            'email.required'              => 'Email address is required.',
            'email.email'                 => 'Please provide a valid email address.',
            'email.regex'                 => 'Invalid email address format.',
            'email.unique'                => 'This email is already in use.',
            'contact_number.required'     => 'Contact number is required.',
            'contact_number.min'          => 'Contact Number must be at least 10 digits.',
            'contact_number.max'          => 'Contact Number cannot exceed 15 characters',
            'contact_number.unique'       => 'This Contact Number is already in use.',
            'password.required'           => 'Password is required.',
            'confirm_password.required'   => 'Please confirm your password.',
            'confirm_password.same'       => 'Password confirmation does not match.'
        ];

        return ['rules' => $rules, 'messages' => $messages];
    }

    public function register(Request $request)
    {
        $validation = $this->validationRuleForRegister($request);
        $validator  = Validator::make($request->all(), $validation['rules'],$validation['messages']);
        
        if ($validator->fails()){
            return response()->json([
                'message' => $validator->errors()->first()
            ], 422);
        }

         try {

                DB::beginTransaction();
                
                $validatedData          = $validator->validated();
                $user                   = new User();
                $user->first_name       = $validatedData['first_name']       ?? null;
                $user->last_name        = $validatedData['last_name']        ?? null;
                $user->email            = $validatedData['email']            ?? null;
                $user->contact_number   = $validatedData['contact_number']   ?? null;
                $user->password         = $validatedData['password']         ?? null;
                $user->save();

                DB::commit();
                return response()->json([
                    "status"  => true,
                    'message' => 'User registered successfully.',
                    'user'    => $user,
                ], 201);

           }catch (Exception $e){

                DB::rollBack();
                return response()->json([
                    "status"     => false,
                    'message'    => 'Internal server error!',
                    'error'      => $e->getMessage(),
                    'error_code' => $e->getCode()
                ], 500);
            }
    }

    private function validationRuleForLogin(): array
    {
        return [
            'rules' => [
                'email'    => 'required|email|exists:users,email',
                'password' => 'required|min:8'
            ],
            'messages' => [
                'email.required'    => 'Email address is required.',
                'email.email'       => 'Please enter a valid email address.',
                'email.exists'      => 'This email address is not registered.',
                'password.required' => 'Password is required.',
                'password.min'      => 'Password must be at least 8 characters.'
            ]
        ];
    }

    public function login(Request $request)
    {
        $validation = $this->validationRuleForLogin($request);
        $validator  = Validator::make($request->all(), $validation['rules'], $validation['messages']);

         if ($validator->fails()){
            return response()->json([
                "status"  => false,
                'message' => $validator->errors()->first()
            ], 422);
        }

        try {

            DB::beginTransaction();
            $credentials = $validator->validated();
            $user        = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)){
                return response()->json([
                    'status'  => false,
                    'message' => 'Invalid credentials!'
                ], 422);
            }

            if (!$token = auth()->attempt($credentials)){
                return response()->json([
                    'status' => false,
                    'error'  => 'Unauthorized'
                ], 401);
            }

            DB::commit();
            return response()->json([
                    'status'  => true,
                    'message' => 'You have successfully logged in.',
                    'user'    => $user,
                    'token'   => $this->respondWithToken($token)
              ], 200);

        }catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => 'Internal server error!',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        auth()->logout();
         return response()->json([
            'status'  => true,
            'message' => 'You have successfully logged out.',
        ], 200);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}