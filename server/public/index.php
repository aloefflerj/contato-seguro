<?php

use DI\Container;
use Slim\Factory\AppFactory;
use Source\App\Controllers\Users;
use Slim\Routing\RouteCollectorProxy;
use Source\App\Controllers\Web;
use Source\App\Middlewares\JsonMiddleware;
use Source\App\Middlewares\RestApi;

require __DIR__ . '/../vendor/autoload.php';


//Container adicionado para invocar as funcionalidades das rotas em uma classe separada ------------>
$container = new Container();
AppFactory::setContainer($container);

//Create
$app = AppFactory::create();

//Middlewares -------------------------------------------------------------------------------------->
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$errorMiddleWare = $app->addErrorMiddleware(true, true, true);
$app->add(new JsonMiddleware());
$app->add(new RestApi());

//Rotas controlador Source\App\Controllers\Web()  -------------------------------------------------->
$app->get('/', Web::class . ':home')->add(new RestApi);
$app->post('/', Web::class . ':create')->add(new RestApi);


//Rotas controlador Source\App\Controllers\Users()  ------------------------------------------------>
$app->group('/v1/users', function (RouteCollectorProxy $group) {

    $group->get('', Users::class . ':get')->setName('get');
    $group->post('', Users::class . ':newUser')->setName('newUser');

    $group->get('/{id}', Users::class . ':getUser')->setName('getUser');
    $group->delete('/{id}', Users::class . ':deleteUser')->setName('deleteUser');
    $group->put('/{id}', Users::class . ':updateUser')->setName('updateUser');

});

//Dispatch ----------------------------------------------------------------------------------------->
$app->run();
