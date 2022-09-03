<?php

function respondWithToken($token)
{

    $tokenLife = env('JWT_TTL') ?? 10;

    $tokenCookie = cookie('access_token',
        $token,
        $tokenLife,
        null,
        null,
        false,
        false,
        false,
        null);

    $issue_time = time();

    return response()->json(['message' => "Success!", "tst" => $issue_time, "overtime" => (int) $tokenLife])->withCookie($tokenCookie);

}