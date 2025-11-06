<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\ProductVariants;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function productLists(Request $request)
    {
        try {

            $perPage  = $request->perPage ?? 20;
            $user     = Auth::user();
            $products = $user->products()->with('variants')->paginate($perPage);

            $products->getCollection()->transform(function ($product) {
                return [
                    'id'           => $product->id,
                    'name'         => $product->name,
                    'stock_status' => $product->stock_status,
                    'status'       => $product->status,
                    'variants'     => $product->variants->map(fn($v) => [
                        'id'           => $v->id,
                        'variant_name' => $v->variant_name,
                        'price'        => $v->price,
                    ]),
                ];
            });

            return response()->json([
                'success'      => true,
                'message'      => 'Products retrieved successfully',
                'current_page' => $products->currentPage(),
                'last_page'    => $products->lastPage(),
                'per_page'     => $products->perPage(),
                'total'        => $products->total(),
                'products'     => $products->items()
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success'    => false,
                'message'    => 'Internal server error!',
                'error'      => $e->getMessage(),
                'error_code' => $e->getCode()
            ], 500);
        }
    }

    private function validationRuleForProduct($request): array
    {
        $rules = [
            'name'                        => ['required', 'max:200'],
            'quantity'                    => ['required', 'regex:/^[0-9\s\-\(\)]*$/'],
            'status'                      => ['required', Rule::in(['Active', 'Inactive'])],
            'variants'                    => ['required', 'array', 'min:1'],
            'variants.*.variant_name'     => ['required', 'string','max:255'],
            'variants.*.price'            => ['required', 'numeric','min:0']
        ];

        $messages = [
             'name.required'                   => 'Product name is required.',
             'name.max'                        => 'Product name cannot exceed 200 characters.',
             'quantity.required'               => 'Quantity is required.',
             'quantity.integer'                => 'Quantity must be an integer.',
             'quantity.min'                    => 'Quantity must be zero or greater.',
             'status.required'                 => 'Status is required.',
             'status.in'                       => 'Status must be either Active or Inactive.',
             'variants.required'               => 'At least one variant is required.',
             'variants.array'                  => 'Variants must be an array.',
             'variants.*.variant_name.required'=> 'Variant name is required for each variant.',
             'variants.*.variant_name.max'     => 'Variant name cannot exceed 255 characters.',
             'variants.*.price.required'       => 'Price is required for each variant.',
             'variants.*.price.numeric'        => 'Price must be a number.',
             'variants.*.price.min'            => 'Price must be zero or greater.'
        ];

        return ['rules' => $rules, 'messages' => $messages];
    }

    public function createProduct(Request $request)
    {   
       // dd($request->all());
       
         $validation    = $this->validationRuleForProduct($request);
         $validatedData = $request->validate($validation['rules'], $validation['messages']);

        try {

            DB::beginTransaction();

           

            $product =  Product::create([
                            'name'     => $validatedData['name']     ?? null,
                            'quantity' => $validatedData['quantity'] ?? 1,
                            'status'   => $validatedData['status']   ?? 'Active',
                            
                        ]);

                        foreach ($request->variants as $variantData){
                            $product->variants()->create([
                                'variant_name' => $variantData['variant_name'],
                                'price'        => $variantData['price'],
                                'product_id'   => $product->id
                            ]);
                        }

            DB::commit();
            return response()->json([
                'message' => 'Product created successfully.',
            ], 200);

        } catch (Exception $e){

            DB::rollBack();
            return response()->json([
                'message' => 'Internal Server Error!',
                'error'   =>  $e->getMessage()
            ], 500);
        }
    }

    public function editProduct($id)
    {
        $user    = Auth::user();
        $product = $user->products()->with('variants')->find($id);

        if (!$product){
            return response()->json([
                'message' => 'Product not found!'
            ], 404);
        }

        return response()->json([
            'message' => 'Product retrieved successfully.',
            'product' => $product
        ], 200);
    }

    public function updateProduct(Request $request, $id)
    {
        $user = Auth::user();

        $product = $user->products()->with('variants')->find($id);
        if (!$product){
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $validation = $this->validationRuleForProduct($request);
        $validator  = Validator::make($request->all(), $validation['rules'], $validation['messages']);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        try {

            DB::beginTransaction();
            $product->update([
                'name'     => $validatedData['name']     ?? null,
                'quantity' => $validatedData['quantity'] ?? 1,
                'status'   => $validatedData['status']   ?? 'Active',
                'user_id'  => $userId
            ]);

            if ($request->has('variants')){
                foreach ($request->variants as $variantData){
                    if (isset($variantData['id'])) {
                        $variant = $product->variants()->find($variantData['id']);
                        if ($variant){
                            $variant->update([
                                'variant_name' => $variantData['variant_name'],
                                'price'        => $variantData['price']
                            ]);
                        }
                    } else{
                        $product->variants()->create([
                            'variant_name' => $variantData['variant_name'],
                            'price'        => $variantData['price'],
                            'product_id'   => $product->id
                        ]);
                    }
                }
            }
            DB::commit();
            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product->load('variants'),
            ], 200);

        } catch (\Exception $e){
            DB::rollBack();
            return response()->json([
                'message' => 'Internal Server Error!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteProduct($id)
    {
        $user    = Auth::user();
        $product = $user->products()->with('variants')->find($id);

        if (!$product){
            return response()->json([
                  'message' => 'Product not found!'
                ], 404);
        }

        try {
            $product->delete();  
            return response()->json([
                'message' => 'Product deleted successfully.'
                ], 200);
        } catch (\Exception $e) {
            return response()->json([ 
                'message' => 'Internal Server Error!', 
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
