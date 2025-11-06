<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Product;

class ProductVariants extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'product_id',
        'variant_name',
        'price',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
