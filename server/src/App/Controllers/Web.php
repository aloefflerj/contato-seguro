<?php

namespace Source\App\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Source\Core\Connection;
use Source\App\Models\Teste;

class Web
{
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function home(Request $req, Response $res)
    {

        $teste = new Teste();
        $result = $teste->find()->fetch(true);
        // $result = Connection::callSql('', '');
        $result;

        $res->getBody()->write(json_encode($result), JSON_PRETTY_PRINT);
        return $res;
    }
}
