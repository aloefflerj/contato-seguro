<?php

namespace Source\Core;

trait JsonTraits 
{
    public function modelToJson(Model $model)
    {
        return json_encode($model->data(), JSON_PRETTY_PRINT);
    }
}