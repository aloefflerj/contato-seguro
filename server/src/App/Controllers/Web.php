<?php

namespace Source\App\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
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
        $result = $teste->register("outro teste");
        // $result = $teste->find("id=:id", "id=edfgsdg")->fetch(true, 'json');
        if(!$teste->save()){
            echo $teste->fail()->getMessage();
        }
        // $result = $teste->find()->fetch(true);
        $res->getBody()->write(json_encode($result->fetchJson('')));
        return $res;
    }
}
