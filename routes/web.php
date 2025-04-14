<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\ContactController;

// Rota da Landing Page
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

// Rota de teste de boas-vindas
Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

// API de contatos (opcional, caso queira buscar via React com fetch)
Route::get('/api/contacts', [ContactController::class, 'apiIndex'])->name('api.contacts');

// Rota para envio de formulário de contato
Route::post('/contact', [ContactFormController::class, 'store'])->name('contact.store');

// Rotas protegidas por autenticação
 Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Importa outras configurações de rotas
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
