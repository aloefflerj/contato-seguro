<?php

namespace Source\Core;

use PDO;
use Source\Core\Connection;
use stdClass;

class Model
{
    protected static $table;
    protected static $columns;
    protected $values = [];

    public function __construct($table, $arr, $primary = '_id')
    {
        $this->table = $table;
        $this->primary = $primary;
    }

    public function __get($name)
    {
        $method = $this->toCamelCase($name);
        if (method_exists($this, $method)) {
            return $this->$method();
        }

        if (method_exists($this, $name)) {
            return $this->$name();
        }

        return ($this->data->$name ?? null);
    }

    public function __set($name, $value)
    {
        if (empty($this->data)) {
            $this->data = new stdClass();
        }

        $this->data->$name = $value;
    }

    

    public function fail()
    {
        return $this->fail();
    }

    public function find(?string $terms = null, ?string $params = null, string $columns = '*'): Model
    {
        if ($terms) {
            $this->statement = "SELECT {$columns} FROM {$this->table} WHERE {$terms}";
            parse_str($params, $this->params);
            return $this;
        }
        $this->statement = "SELECT {$columns} FROM {$this->table}";
        return $this;
    }

    public function findById(int $id, string $columns = '*'): ?Model
    {
        return $this->statement = $this->find("{$this->primary} = :id", "id={$id}", $columns)->fetch();
    }

    public function group(string $column): ?Model
    {
        $this->group = " GROUP BY {$column}";
        return $this;
    }

    public function order(string $columnOrder): ?Model
    {
        $this->order = " ORDER BY {$columnOrder}";
        return $this;
    }

    public function limit(int $limit): ?Model
    {
        $this->limit = " LIMIT {$limit}";
        return $this;
    }

    public function offset(int $offset): ?Model
    {
        $this->offset = " OFFSET {$offset}";
        return $this;
    }

    public function fetch(bool $all = false)
    {
        try {
            $stmt = Connection::conn()->prepare(
                $this->statement );
                $stmt->execute($this->params);
            // $stmt = Connection::conn()->prepare(
            //     'SELECT * FROM teste WHERE title LIKE :title'
            // );
            // $stmt->execute([':title' => 'valor1']);

            if (!$stmt->rowCount()) {
                return null;
            }

            if ($all) {
                return $stmt->fetchAll(PDO::FETCH_CLASS, static::class);
            }

            // return $this->statement;
            return $stmt->fetchObject(static::class);
        } catch (\PDOException $exception) {
            $this->fail = $exception;
            return null;
        }
    }

    protected function toCamelCase(string $string): string
    {
        $camelCase = str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));
        $camelCase[0] = strtolower($camelCase[0]);
        return $camelCase;
    }
}
