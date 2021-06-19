<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AdditionMaterialTypeValidation implements Rule
{

    public function __construct()
    {
        //
    }


    public function passes($attribute, $value)
    {
        $supportedTypes = ['pdf','doc','docx','ppt','pptx','xls','rar','zip','txt','jpg','png'];

        if(!empty($value->getClientOriginalExtension()) && in_array( $value->getClientOriginalExtension() , $supportedTypes)) {

            return true;

        }else{

            return false;

        }
    }


    public function message()
    {
        return 'The :attribute mime type is not supported!';
    }
}
