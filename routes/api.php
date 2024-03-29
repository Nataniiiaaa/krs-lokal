<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::apiResource('/agama',ApiAgamaController::class);
    Route::apiResource('/mahasiswa',ApiMahasiswaController::class);
    Route::apiResource('/matakuliah',ApiMatakuliahController::class);
    Route::apiResource('/krs',ApiKrsController::class);
    Route::apiResource('/detilkrs',ApiDetilkrsController::class);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');



