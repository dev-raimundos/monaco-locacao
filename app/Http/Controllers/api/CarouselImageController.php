<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CarouselImage;
use Illuminate\Support\Facades\Storage;

class CarouselImageController extends Controller
{
    public function index()
    {
        return CarouselImage::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048'
        ]);

        $path = $request->file('image')->store('carousel', 'public');

        $image = CarouselImage::create([
            'image_path' => "/storage/{$path}"
        ]);

        return response()->json($image, 201);
    }

    public function destroy($id)
    {
        $image = CarouselImage::findOrFail($id);

        $path = str_replace('/storage/', '', $image->image_path);
        Storage::disk('public')->delete($path);

        $image->delete();

        return response()->noContent();
    }
}
