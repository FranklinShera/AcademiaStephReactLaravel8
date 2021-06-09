<?php

 function respondWithToken($token){
    $tokenCookie = cookie('access_token',
        $token ,
        env('JWT_TTL'),
        null,
        null,
        true,
        true,
        false,
        null);

    return response()->json(['message' => "Success!"])->withCookie($tokenCookie);


}
