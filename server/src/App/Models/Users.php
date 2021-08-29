<?php

namespace Source\App\Models;

use Exception;
use Source\Core\Model;

class Users extends Model
{
    public function __construct()
    {
        parent::__construct('users', ['name', 'mail']);
    }

    public function save(): bool
    {
        if (
            !$this->validateRequiredFields() ||
            !$this->validateEmail() ||
            !parent::save()
        ) {
            return false;
        }

        return true;
    }

    public function register(?string $name = null, ?string $mail = null, ?string $phone = null, ?string $birth = null, ?string $city = null): Users
    {
        $this->name     = $name ?? null;
        $this->mail     = $mail ?? null;
        $this->phone    = $phone ?? null;
        $this->birth    = $birth ?? null;
        $this->city     = $city ?? null;
        $this->save();

        return $this;
    }

    public function unregister($id = null): bool
    {
        if (!$this->validateId($id)) {
            return false;
        }
        $user = $this->userExists($id);

        if (!$user) {
            return false;
        }

        $user->destroy();
        return true;
    }

    public function updateRegister(
        $id,
        ?string $name = null,
        ?string $mail = null,
        ?string $phone = null,
        ?string $birth = null,
        ?string $city = null
    ) {
        if (!$this->validateId($id)) {
            return false;
        }

        $user = $this->userExists($id);

        if (!$user) {
            return false;
        }

        $user->name     = $name ?? null;
        $user->mail     = $mail ?? null;
        $user->phone    = $phone ?? null;
        $user->birth    = $birth ?? null;
        $user->city     = $city ?? null;


        $user->save();
        return $user;
    }

    public function validateId($id): bool
    {
        $id = filter_var($id, FILTER_VALIDATE_INT);
        if (!$id) {
            $this->fail = new \Exception(json_encode([
                'message' => [
                    'content' => 'Não é um valor inteiro válido',
                    'type' => 'danger',
                    'fields' => ''
                ]
            ]));
            return false;
        }
        return true;
    }

    public function userExists($id)
    {
        $user = $this->findById($id);
        if (!$user) {
            $this->fail = new \Exception(json_encode([
                'message' => [
                    'content' => 'Usuário não encontrado',
                    'type' => 'danger',
                    'fields' => ''
                ]
            ]));
            return false;
        }
        return $user;
    }

    protected function validateEmail(): bool
    {
        //valida entrada de dados do email
        if (empty($this->mail) || !filter_var($this->mail, FILTER_VALIDATE_EMAIL)) {
            $this->fail = new \Exception(json_encode([
                'message' => [
                    'content' => 'Por favor, informe um email válido',
                    'type' => 'warning',
                    'fields' => ''
                ]
            ]));
            return false;
        }

        //verifica se o usuário já existe ou se o email já está cadastrado
        $userByEmail = null;
        if (!$this->id) {
            $userByEmail = $this->find("mail = :mail", "mail={$this->mail}")->count();
        } else {
            $userByEmail = $this->find("mail = :mail AND id != :id", "mail={$this->mail}&id={$this->id}")->count();
        }

        if ($userByEmail) {
            $this->fail = new \Exception(json_encode([
                'message' => [
                    'content' => 'Este email já está em uso, por favor tente outro',
                    'type' => 'danger',
                    'fields' => ''
                ]
            ]));
            return false;
        }

        return true;
    }

    protected function validateRequiredFields(): bool
    {
        if (empty($this->name) || empty($this->mail)) {
            $fields = [
                'name' => empty($this->name) ?? false,
                'mail' => empty($this->mail) ?? false
            ];
            $this->fail = new \Exception(json_encode([
                'message' => [
                    'content' => 'Por favor, preencha este campo',
                    'type' => 'warning',
                    'fields' => $fields
                ]
            ]));
            return false;
        }

        return true;
    }
}
