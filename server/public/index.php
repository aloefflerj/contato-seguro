<?php

use DI\Container;
use Slim\Factory\AppFactory;
use Source\App\Middlewares\JsonMiddleware;
use Source\App\Controllers\Chars;
use Slim\Routing\RouteCollectorProxy;
use Source\App\Controllers\Web;
use Source\App\Middlewares\AllowCrossOrigin;

require __DIR__ . '/../vendor/autoload.php';

$container = new Container();
AppFactory::setContainer($container);

$app = AppFactory::create();

$app->addRoutingMiddleware();
$errorMiddleWare = $app->addErrorMiddleware(true, true, true);
// $app->add(new JsonMiddleware());

$app->get('/', Web::class . ':home')->add(new AllowCrossOrigin)->add(new JsonMiddleware());

$app->group('/chars', function (RouteCollectorProxy $group) {

    $group->get('', Chars::class . ':getAll')->setName('getAll');
    // $routeParser = $group->getRouteCollector()->getRouteParser();
    // $group->redirect('/',  '/chars/json');

    $group->get('/{id}', Chars::class . ':getChar')->setName('getChar');

})->add(new AllowCrossOrigin())->add(new JsonMiddleware());


$app->run();
