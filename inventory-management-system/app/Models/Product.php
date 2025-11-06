<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\ProductVariants;


class Product extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'quantity',
        'status',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariants::class);
    }

    public function getStockStatusAttribute($quantity)
    {
        return $this->attributes['stock_status'] = $quantity > 0 ? 'In Stock' : 'Out of Stock';
    }
}
