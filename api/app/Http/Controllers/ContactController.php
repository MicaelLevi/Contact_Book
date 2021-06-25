<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
class ContactController extends Controller
{
    public function index() {
        return Contact::all();
    }

    public function show($id) {
        return Contact::find($id);
    }

    public function store(Request $request) {
        try {
            $contact = Contact::create($request->all());
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Não foi possivel salvar contato'], 500);
        }
        return response()->json($contact, 201);
    }

    public function update(Request $request, Contact $contact) {
        
        $contact->update($request->all());

        return response()->json($contact, 200);
    }

    public function delete(Contact $contact) {
        $contact->delete();

        return response()->json(null, 204);
    }
}