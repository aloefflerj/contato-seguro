<?php

namespace Source\App\Middlewares;

use Slim\Psr7\Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;


class RestApi
{
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $response = $handler->handle($request);
        return $response->withHeader("Access-Control-Allow-Origin", "*")
                    ->withHeader("Access-Control-Allow-Headers", "Authorization,Origin,X-Requested-With,Content-Type,Range")
                    ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    }
}
