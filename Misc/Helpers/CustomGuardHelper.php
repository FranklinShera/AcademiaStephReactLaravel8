<?php

use Illuminate\Support\Facades\Auth;

function currentClient(){
    return Auth::guard('client')->user();
}
