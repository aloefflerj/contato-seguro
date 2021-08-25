<?php

namespace Source\App\Models;

use CoffeeCode\DataLayer\DataLayer;
use Source\Core\Model;

class Teste extends Model
{
    public function __construct() {
        parent::__construct('teste', ['title']);
    }

    public function register(string $title)
    {
        $this->title = $title;
        $this->save();

        return $this;
    }
}