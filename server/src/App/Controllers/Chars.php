<?php

namespace Source\App\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Chars
{
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function getAll(Request $request, Response $response): Response
    {
        $response->getBody()->write(json_encode([
            "chars" => [
                [
                    "id" => 1,
                    "name" => "Linus Torvalds",
                    "class" => "Wizard",
                    "lvl" => 3
                ],
                [
                    "id" => 2,
                    "name" => "Ghoron",
                    "class" => "Cleric",
                    "lvl" => 11
                ]
            ]
        ]), JSON_PRETTY_PRINT);

        return $response;
    }

    public function getChar(Request $request, Response $response, array $payload): Response
    {
        $payload = json_encode([
            "id" => 1,
            "name" => "Linus Torvalds",
            "class" => "Wizard",
            "lvl" => 3
        ], JSON_PRETTY_PRINT);
        
        $response->getBody()->write($payload);
        return $response;
    }
}
