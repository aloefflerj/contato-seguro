<?php

namespace Source\App\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as ServerRequest;
use Source\App\Models\Teste;

class Web
{
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function home(Request $req, Response $res)
    {
        // $teste = new Teste();
        // $result = $teste->register("outro teste");
        // // $result = $teste->find("id=:id", "id=edfgsdg")->fetch(true, 'json');
        // if(!$teste->save()){
        //     echo $teste->fail()->getMessage();
        // }
        // // $result = $teste->find()->fetch(true);
        // $form = '<form method="post" action="http://localhost:8000">' .
        // '<input type="text" name="title" id="title">' .
        // '<button>send</button></form>';
        $res->getBody()->write('welcome');
        return $res;
    }

    public function create(ServerRequest $req, Response $res,  array $args)
    {
        $res->getBody()->write(json_encode([
            "teste" => [
                "oi" => "olá",
            ]
        ]), JSON_PRETTY_PRINT);
        return $res;
    }
}
