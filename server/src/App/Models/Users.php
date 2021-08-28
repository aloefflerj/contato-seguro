<?php

namespace Source\App\Models;

use Source\Core\Model;

class Users extends Model
{
    public function __construct()
    {
        parent::__construct('users', ['name', 'mail']);
    }

    public function save(): bool
    {
        if(
            !$this->validateEmail() ||
            !parent::save()
        ){
            return false;
        }

        return true;
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

    protected function validateEmail(): bool
    {
        //valida entrada de dados do email
        if(empty($this->mail) || !filter_var($this->mail, FILTER_VALIDATE_EMAIL)){
            $this->fail = new \Exception ("Informe um email válido.");
            return false;
        }

        //verifica se o usuário já existe ou se o email já está cadastrado
        $userByEmail = null;
        if(!$this->id){
            $userByEmail = $this->find("mail = :mail", "mail={$this->mail}")->count();
        }else{
            $userByEmail = $this->find("mail = :mail AND id != :id", "mail={$this->mail}&id={$this->id}")->count();
        }

        if($userByEmail){
            $this->fail = new \Exception("Este e-mail já está em uso. Por favor, tente outro.");
            return false;
        }

        return true;
    }
}
