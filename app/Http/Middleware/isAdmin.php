<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class isAdmin
{

    public function handle(Request $request, Closure $next)
    {

        if(!Auth::check()){

            return response()->json([
                'msg' => 'You are not allowed to access this route... '
            ], 403);

        }

        return $next($request);
    }
}
