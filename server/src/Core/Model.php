<?php

namespace Source\Core;

use CoffeeCode\DataLayer\Connect;
use CoffeeCode\DataLayer\DataLayer;
use Exception;

abstract class Model extends DataLayer
{
    public function __construct(string $entity, array $required, string $primary = 'id', bool $timestamps = true) {
        parent::__construct($entity, $required, $primary, $timestamps);
    }

    

    /**
     * @param bool $all
     * @return array|mixed|null
     */
    public function fetch(bool $all = false, string $mode = null)
    {
        try {
            $stmt = Connect::getInstance()->prepare($this->statement . $this->group . $this->order . $this->limit . $this->offset);
            $stmt->execute($this->params);

            if (!$stmt->rowCount()) {
                return null;
            }

            if ($all) {
                if(!$mode){
                    return $stmt->fetchAll(\PDO::FETCH_CLASS, static::class);
                }
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
            if(!$mode){
                return $stmt->fetchObject(static::class);
            }
            return $stmt->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            $this->fail = $exception;
            return null;
        }
    }

    /**
     * fetchJson
     *
     * @param bool $all 
     * @return void
     */
    public function fetchJson(bool $all)
    {
        return $this->fetch($all, 'json');
    }

    /**
     * @return bool
     */
    public function save(): bool
    {
        $primary = $this->primary;
        $id = null;

        try {
            if (!$this->required()) {
                throw new Exception("Preencha os campos necessários");
            }

            /** Update */
            if (!empty($this->data->$primary)) {
                $id = $this->data->$primary;
                $this->update($this->safe(), "{$this->primary} = :id", "id={$id}");
            }

            /** Create */
            if (empty($this->data->$primary)) {
                
                $this->data->$primary = "sd3f5asd3f541as3d";
                // $this->data->$primary = '23421';
                $id = $this->create((array)$this->data);
                echo $this->data->$primary;
            }

            if (!$id) {
                return false;
            }

            $this->data = $this->find("{$this->primary} = :id", "id={$id}")->data();
            return true;
        } catch (Exception $exception) {
            $this->fail = $exception;
            return false;
        }
    }
}