<?php

namespace Source\App\Models;

use Source\Core\Model;

class Teste extends Model
{
    public function __construct() {
        parent::__construct('teste', ['title']);
    }
}