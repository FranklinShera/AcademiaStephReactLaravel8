<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class isClient
{

    public function handle(Request $request, Closure $next)
    {
        if(!Auth::guard('client')->check()){

            return response()->json([
                'msg' => 'You are not allowed to access this route... '
            ], 401);

        }


        return $next($request);
    }

}
