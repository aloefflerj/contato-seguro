<?php

namespace Source\App\Models;

use Source\Core\Model;

class Users extends Model
{
    public function __construct()
    {
        parent::__construct('users', ['name', 'mail']);
    }

    public function register(string $name, string $mail, ?string $phone = null, ?string $birth = null, ?string $city = null): Users
    {
        $this->name     = $name;
        $this->mail     = $mail;
        $this->phone    = $phone ?? null;
        $this->birth    = $birth ?? null;
        $this->city     = $city ?? null;
        $this->save();
        
        return $this;
    }
}
