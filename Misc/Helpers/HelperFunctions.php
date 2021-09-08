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

        $issue_time =  time();

    return response()->json(['message' => "Success!" , "tst" => $issue_time , "overtime" =>  env('JWT_TTL') ])->withCookie($tokenCookie);


}
