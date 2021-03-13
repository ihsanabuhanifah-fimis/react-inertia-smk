<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Inertia\inertia;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Users = User::all();
        return Inertia::render('Users', [
            'users' => $Users ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'image' => $user->image,
                ];
            }),
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('CreateUsers');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    //  dd($request->all());
        $post = $this->validate($request, [
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed'],
            'password_confirmation' => ['required'],
            'image'=> ['image', 'mimes:png,jpg,jpeg']
        ]);
        $extFile = $request->image->getClientOriginalExtension();
        $namaFile = 'spa'.time().".".$extFile;
        $image  = $request->image->move('images', $namaFile);

        $post["image"] = $image;
        $post["password"] = Hash::make($request->password);
        User::create($post);
        return Redirect::route('users.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Users = User::find($id);
        return Inertia::render('CreateUsers', [
            'editUsers' => $Users
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    
        $put = $this->validate($request, [
            'name' => ['required'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            
            'image'=> ['image', 'mimes:png,jpg,jpeg']
        ]);
        $extFile = $request->image->getClientOriginalExtension();
        $namaFile = 'spa'.time().".".$extFile;
        $image  = $request->image->move('images', $namaFile);

        $put["image"] = $image;
       
        User::where('id', $id)->update($put);
        return Redirect::route('users.index');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = User::find($id);
        $delete->delete();
        return Redirect::route('users.index');
    }
}
