<?php

namespace Source\Core;

use PDO;
use PDOException;

class Connection
{

    private static $conn;
    private static $error;

    public static function conn()
    {

        try {
            self::$conn = new PDO('mysql:host=127.0.0.1;dbname=rpg_todo_app;port=3306', 'root', '', [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                PDO::ATTR_CASE => PDO::CASE_NATURAL
            ]);
        } catch (PDOException $exception) {
            self::$error = $exception;
        }
        return self::$conn;
    }

    public static function fail()
    {
        return self::$error ?? null;
    }

    public static function callSql($sql, $stmts)
    {
        $stmt = self::conn()->prepare('SELECT * FROM teste WHERE title LIKE :title');
        $stmt->execute([':title' => 'valor1']);
        return $stmt->fetchAll();
    }
}
